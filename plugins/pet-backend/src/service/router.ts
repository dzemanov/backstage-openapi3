import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import express from 'express';
import { pets } from '../../dev/pets';

import { createOpenApiRouter } from '../schema/openapi.generated';
import { Pet, PetType } from '../../dev/types';

export interface RouterOptions {
  logger: LoggerService;
  config: RootConfigService;
}

let currentDummyId = 0;

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
    const petId = parseInt(req.params.id, 10);
    const pet = pets.find(p => p.id === petId);

    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  });

  router.get('/pets', async (req, res) => {
    const { name } = req.query;
    const filteredPets = pets.filter(
      pet => !name || pet.name.toLowerCase() === name.toLowerCase(),
    );
    return res.json(filteredPets);
  });

  router.get('/findPetsByType', async (req, res) => {
    const { petType } = req.query;
    const filteredPets = pets.filter(pet => pet.petType === petType);
    return res.json(filteredPets);
  });

  router.post('/pets', async (req, res) => {
    const { name, petType } = req.body;
    currentDummyId += 1;
    const newPet: Pet = {
      id: currentDummyId,
      name,
      petType: petType as PetType,
    };
    pets.push(newPet);
    return res.status(201).json(newPet);
  });

  router.put('/pets/:id', async (req, res) => {
    const petId = parseInt(req.params.id, 10);
    const { name, petType } = req.body;

    const pet = pets.find(p => p.id === petId);

    if (pet) {
      pet.name = name || pet.name;
      pet.petType = (petType as PetType) || pet.petType;

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
