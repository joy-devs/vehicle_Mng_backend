import { Hono } from 'hono';
import { listusers, getusers, createusers, updateusers, deleteusers } from './user.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { UsersTableSchema } from '../validator';
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth'; 

export const usersRouter = new Hono();

// Get all users
usersRouter.get('/users', adminRoleAuth, listusers);

// Get a single user
usersRouter.get('/users/:id', getusers);

// Create a user
usersRouter.post(
  '/users',
  zValidator('json', UsersTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  bothRoleAuth, createusers
);

// Update a user
usersRouter.put(
  '/users/:id',
  zValidator('json', UsersTableSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  bothRoleAuth, updateusers
);

// Delete a user
usersRouter.delete('/users/:id', bothRoleAuth, deleteusers);

export default usersRouter;
