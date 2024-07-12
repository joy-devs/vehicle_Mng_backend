import { Hono } from 'hono';
import { listauthentications, getauthentications, createauthentications, updateauthentications, deleteauthentications } from './authentication.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { AuthenticationTableSchema } from '../validator'; 
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth';

export const authenticationsRouter = new Hono();

// Get all authentications
authenticationsRouter.get('/authentications', adminRoleAuth, listauthentications);

// Get a single authentication
authenticationsRouter.get('/authentications/:id',bothRoleAuth, getauthentications);

// Create a authentication
authenticationsRouter.post(
  '/authentications',
  zValidator('json', AuthenticationTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  adminRoleAuth,createauthentications
);

// Update a authentication
authenticationsRouter.put(
  '/users/:id',
  zValidator('json', AuthenticationTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  bothRoleAuth, updateauthentications
);

// Delete a authentication
authenticationsRouter.delete('/users/:id', bothRoleAuth, deleteauthentications);

export default authenticationsRouter;
