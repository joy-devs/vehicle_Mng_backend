import { Hono } from 'hono';
import { listlocations, getlocations, createlocations, updatelocations, deletelocations } from './location.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { LocationTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth'; 

export const locationsRouter = new Hono();

// Get all locations
locationsRouter.get('/locations', listlocations);

// Get a single location
locationsRouter.get('/locations/:id',  getlocations);

// Create a user
locationsRouter.post(
  '/locations',
  zValidator('json', LocationTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
   createlocations
);

// Update a location
locationsRouter.put(
  '/locations/:id',
  zValidator('json', LocationTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
   updatelocations
);

// Delete a location
locationsRouter.delete('/locations/:id',  deletelocations);

export default locationsRouter;
