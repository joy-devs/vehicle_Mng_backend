
import { Context } from 'hono';
import {vehicleSpecificationsService, getVehicleSpecificationService, createVehicleSpecificationService, updateVehicleSpecificationService, deleteVehicleSpecificationService } from './specification.services';

// List all specifications
export const listspecifications = async (c: Context): Promise<Response> => {
  const specifications = await vehicleSpecificationsService();
  return c.json(specifications);
};

// Get a single specification by ID
export const getspecifications = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const specification = await getVehicleSpecificationService(id);
  if (specification) {
    return c.json(specification);
  }
  return c.json({ message: 'specification not found' }, 404);
};

// Create a new specification
export const createspecifications = async (c: Context): Promise<Response> => {
  const specificationData = await c.req.json();
  const specification = await createVehicleSpecificationService(specificationData);
  return c.json(specification, 201);
};

// Update a specification
export const updatespecifications = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const specificationData = await c.req.json();
  const message = await updateVehicleSpecificationService(id, specificationData);
  return c.json({ message });
};

// Delete a specification
export const deletespecifications = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deleteVehicleSpecificationService(id);
  return c.json({ message });
};
