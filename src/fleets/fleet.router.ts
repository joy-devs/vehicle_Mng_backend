import { Hono } from 'hono';
import { listFleets, getFleets, createFleets, updateFleets, deleteFleets } from './fleet.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { FleetManagementTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';

export const FleetsRouter = new Hono();

// Get all Fleets
FleetsRouter.get('/Fleets',  listFleets);

// Get a single Fleets
FleetsRouter.get('/Fleets/:id', getFleets);

// Create a user
FleetsRouter.post(
  '/Fleets',
  
  createFleets
);

// Update a Fleet
FleetsRouter.put(
  '/Fleets/:id',
  
  updateFleets
);

// Delete a Fleet
FleetsRouter.delete('/users/:id', deleteFleets);

export default FleetsRouter;
