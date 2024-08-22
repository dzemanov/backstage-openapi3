import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import express from 'express';
import { createOpenApiRouter } from '../schema/openapi.generated';
import { pets } from '../../dev/pets';

export interface RouterOptions {
  logger: LoggerService;
  config: RootConfigService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;

  const router = await createOpenApiRouter();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/pets/:id', async (req, res) => {
    const petId = req.params.id;
    const { type } = req.query;

    logger.info(`Fetching pet with ID: ${petId} and type: ${type}`);
    const pet = pets.find(p => p.id === petId && (!type || p.type === type));

    if (pet) {
      logger.info(`Found pet with ID: ${petId}`);
      res.json(pet);
    } else {
      logger.info(`Pet with ID: ${petId} not found`);
      res.status(404).json({ error: 'Pet not found' });
    }
  });

  router.get('/pets', async (req, res) => {
    const { name } = req.query;

    const filteredPets = pets.filter(
      pet => pet.name.toLowerCase() === (name as string).toLowerCase(),
    );

    if (filteredPets.length > 0) {
      logger.info(`Found ${filteredPets.length} pet(s) with name: ${name}`);
      return res.json(filteredPets);
    }

    logger.info(`No pets found with name: ${name}`);
    return res.status(404).json({ error: 'No pets found with the given name' });
  });

  router.post('/pets', async (req, res) => {
    const { id, name, type } = req.body;

    if (pets.some(p => p.id === id)) {
      logger.info(`Pet with ID: ${id} already exists`);
      return res.status(409).json({ error: 'Pet with this ID already exists' });
    }

    const newPet: Pet = { id, name, type };
    pets.push(newPet);

    logger.info(`Created new pet with ID: ${id}`);
    return res.status(201).json(newPet);
  });

  router.put('/pets/:id', async (req, res) => {
    const petId = req.params.id;
    const { name, type } = req.body;

    const pet = pets.find(p => p.id === petId);

    if (pet) {
      pet.name = name || pet.name;
      pet.type = type || pet.type;

      logger.info(`Updated pet with ID: ${petId}`);
      res.json({ ...pet });
    } else {
      logger.info(`Pet with ID: ${petId} not found`);
      res.status(404).json({ error: 'Pet not found' });
    }
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
