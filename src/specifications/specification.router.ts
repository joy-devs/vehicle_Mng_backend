import { Hono } from 'hono';
import { listspecifications, getspecifications, createspecifications, updatespecifications, deletespecifications } from './specification.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { VehicleSpecificationsTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth'; 

export const specificationsRouter = new Hono();

// Get all specifications
specificationsRouter.get('/specifications',  listspecifications);

// Get a single specification
specificationsRouter.get('/specifications/:id', getspecifications);

// Create a specification
specificationsRouter.post(
  '/specifications',
  zValidator('json', VehicleSpecificationsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
   createspecifications
);

// Update a specification
specificationsRouter.put(
  '/specifications/:id',
  zValidator('json', VehicleSpecificationsTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
   updatespecifications
);

// Delete a specification
specificationsRouter.delete('/specifications/:id', deletespecifications);

export default specificationsRouter;
