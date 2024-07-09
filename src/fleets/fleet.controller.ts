
import { Context } from 'hono';
import { FleetManagementTableService, getFleetManagementTableService, createFleetManagementTableService, updateFleetManagementTableService, deleteFleetManagementTableService } from './fleet.services';

// List all Fleets
export const listFleets = async (c: Context): Promise<Response> => {
  const Fleets = await FleetManagementTableService();
  return c.json(Fleets);
};

// Get a single Fleet by ID
export const getFleets = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const Fleet = await getFleetManagementTableService(id);
  if (Fleet) {
    return c.json(Fleet);
  }
  return c.json({ message: 'Fleet not found' }, 404);
};

// Create a new Fleet
export const createFleets = async (c: Context): Promise<Response> => {
  const FleetData = await c.req.json();
  const Fleet = await createFleetManagementTableService(FleetData);
  return c.json(Fleet, 201);
};

// Update a Fleet
export const updateFleets = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const FleetData = await c.req.json();
  const message = await updateFleetManagementTableService(id, FleetData);
  return c.json({ message });
};

// Delete a Fleet
export const deleteFleets = async (c: Context): Promise<Response> => {
  const id = Number(c.req.param('id'));
  const message = await deleteFleetManagementTableService(id);
  return c.json({ message });
};
