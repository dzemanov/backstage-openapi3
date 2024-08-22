import { mockServices } from '@backstage/backend-test-utils';
import express from 'express';
import request from 'supertest';

import { createRouter } from './router';
import { pets } from '../../dev/pets';

jest.mock('../../dev/pets', () => ({
  pets: [],
}));

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const router = await createRouter({
      logger: mockServices.logger.mock(),
      config: mockServices.rootConfig(),
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    pets.length = 0;
  });

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /pets/:id', () => {
    it('returns a pet if found', async () => {
      const testPet = { id: '1', name: 'Fluffy', type: 'cat' };
      pets.push(testPet);

      const response = await request(app).get('/pets/1');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(testPet);
    });

    it('returns 404 if pet not found', async () => {
      const response = await request(app).get('/pets/1');

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({ error: 'Pet not found' });
    });
  });

  describe('GET /pets', () => {
    it('returns pets matching the name query parameter', async () => {
      const testPets = [
        { id: '1', name: 'Fluffy', type: 'cat' },
        { id: '2', name: 'Rex', type: 'dog' },
        { id: '3', name: 'Fluffy', type: 'dog' },
      ];
      pets.push(...testPets);
      const expected = [
        { id: '1', name: 'Fluffy', type: 'cat' },
        { id: '3', name: 'Fluffy', type: 'dog' },
      ];

      const response = await request(app).get('/pets?name=Fluffy');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(expected);
    });

    it('returns 404 if no pets match the name query parameter', async () => {
      const response = await request(app).get('/pets?name=Fluffy');

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        error: 'No pets found with the given name',
      });
    });

    it('returns 400 if name query parameter is missing', async () => {
      const response = await request(app).get('/pets');

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        error: 'Name query parameter is required',
      });
    });
  });

  describe('POST /pets', () => {
    it('creates a new pet', async () => {
      const newPet = { id: '1', name: 'Fluffy', type: 'cat' };

      const response = await request(app).post('/pets').send(newPet);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(newPet);
      expect(pets).toContainEqual(newPet);
    });

    it('returns 409 if pet with same ID already exists', async () => {
      const existingPet = { id: '1', name: 'Fluffy', type: 'cat' };
      pets.push(existingPet);

      const response = await request(app).post('/pets').send(existingPet);

      expect(response.status).toEqual(409);
      expect(response.body).toEqual({
        error: 'Pet with this ID already exists',
      });
    });
  });

  describe('PUT /pets/:id', () => {
    it('updates an existing pet', async () => {
      const existingPet = { id: '1', name: 'Fluffy', type: 'cat' };
      const petToUpdate = { name: 'Whiskers', type: 'cat' };
      pets.push(existingPet);

      const response = await request(app).put('/pets/1').send(petToUpdate);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ id: '1', ...petToUpdate });
      expect(pets[0]).toEqual({ id: '1', ...petToUpdate });
    });

    it('returns 404 if pet not found', async () => {
      const response = await request(app)
        .put('/pets/1')
        .send({ name: 'Whiskers' });

      expect(response.status).toEqual(404);
      expect(response.body).toEqual({ error: 'Pet not found' });
    });
  });
});
