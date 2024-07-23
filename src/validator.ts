import {z} from 'zod'
import { UsersTable } from './drizzle/schema'
import { VehicleSpecificationsTable } from './drizzle/schema'
import { boolean } from 'drizzle-orm/mysql-core'

export const UsersTableSchema = z.object({
    user_id:z.number(),
    full_name:z.string(),
    email: z.string(),
    contact_phone: z.string(),
    address: z.string(),
    role: z.string(),
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().default(() => new Date()),
})

export const loginUserSchema = z.object({
    username: z.string(),
    password:z.string()
  })
  
  export const registerUserSchema = z. object({
    password: z.string(),
    address: z.string(),
    username:z.string(),
    role:z.string().optional()
  })
  

export const VehicleSpecificationsTableSchema = z.object({
    vehicle_id:z.number(), 
    manufacturer:z.string(),
    model:z.string(),
    year:z.number(),
    fuel_type:z.string(),
    engine_capacity:z.string(),
    transmission:z.string(),
    seating_capacity:z.number(),
    color:z.string(),
    features:z.string(),
})

export const AuthenticationTableSchema = z.object({
    auth_id:z.number(),
    user_id:z.number(), 
    password:z.number(), 
    vehicle_id:z.number(), 
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().default(() => new Date()),
 
})

export const BookingTableSchema = z.object({
    booking_id:z.number().optional(),
    user_id:z.number(),
    vehicle_id:z.number(),
    location_id:z.number(),
    booking_date: z.string(),
    total_amount:z.string(),
    booking_status:z.string(),
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().default(() => new Date()),
})

export const LocationTableSchema = z.object({
    location_id:z.number(), 
    name:z.string(),
    address:z.number(),
    contact_phone:z.number(),
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().default(() => new Date()),
 
})

export const PaymentsTableSchema = z.object({
    payment_id:z.number(), 
    booking_id:z.number(),
    amount:z.number(),
    payment_status:z.string(),
    payment_date: z.date().default(() => new Date()),
    payment_method:z.string(),
    transaction_id:z.string(),
    created_at: z.date().default(() => new Date()),
    updated_at: z.date().default(() => new Date()),
  
})
export const CustomerSupportTicketsTableSchema = z.object({

})

export const VehiclesTableSchema = z.object({
    
})

export const FleetManagementTableSchema = z.object({

})

