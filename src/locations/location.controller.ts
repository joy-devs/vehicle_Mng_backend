
import { Context } from 'hono';
import {LocationTableService, getLocationTableService, createLocationTableService, updateLocationTableService, deleteLocationTableService } from './location.services';

// List all locations
export const listlocations = async (c: Context): Promise<Response> => {
  const locations = await LocationTableService();
  return c.json(locations);
};

// Get a single location by ID
export const getlocations = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const location = await getLocationTableService(id);
  if (location) {
    return c.json(location);
  }
  return c.json({ message: 'Book not found' }, 404);
};

// Create a new location
export const createlocations = async (c: Context): Promise<Response> => {
  const locationData = await c.req.json();
  const location = await createLocationTableService(locationData);
  return c.json(location, 201);
};

// Update a location
export const updatelocations = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const locationData = await c.req.json();
  const message = await updateLocationTableService(id, locationData);
  return c.json({ message });
};

// Delete a location
export const deletelocations = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deleteLocationTableService(id);
  return c.json({ message });
};
