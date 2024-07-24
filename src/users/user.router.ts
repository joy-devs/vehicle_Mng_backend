import { Hono } from 'hono';
import { listusers, getusers, createusers, updateusers, deleteusers } from './user.controller'; 
import { zValidator } from '@hono/zod-validator'; 
import { UsersTableSchema } from '../validator';
import { adminRoleAuth,bothRoleAuth } from '../middleware/bearAuth'; 

export const usersRouter = new Hono();

// Get all users
usersRouter.get('/users',  listusers);

// Get a single user
usersRouter.get('/users/:id', getusers);

// Create a user
usersRouter.post(
  '/users',
  
   createusers
);

// Update a user
usersRouter.put(
  '/users/:id',
  
   updateusers
);

// Delete a user
usersRouter.delete('/users/:id',  deleteusers);

export default usersRouter;
