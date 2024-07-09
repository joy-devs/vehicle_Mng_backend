import { Hono } from 'hono';
import { listauthentications, getauthentications, createauthentications, updateauthentications, deleteauthentications } from './authentication.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { AuthenticationTableSchema } from '../validator'; 

export const authenticationsRouter = new Hono();

// Get all authentications
authenticationsRouter.get('/authentications', listauthentications);

// Get a single authentication
authenticationsRouter.get('/authentications/:id', getauthentications);

// Create a authentication
authenticationsRouter.post(
  '/authentications',
  zValidator('json', AuthenticationTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createauthentications
);

// Update a authentication
authenticationsRouter.put(
  '/users/:id',
  zValidator('json', AuthenticationTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  updateauthentications
);

// Delete a authentication
authenticationsRouter.delete('/users/:id', deleteauthentications);

export default authenticationsRouter;
