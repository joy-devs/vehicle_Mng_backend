DO $$ BEGIN
 CREATE TYPE "public"."booking_status" AS ENUM('Pending', 'Confirmed', 'Cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_status" AS ENUM('Pending', 'Completed', 'Failed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authentication" (
	"auth_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_on_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"password" varchar(100),
	"username" varchar(100),
	"role" "role" DEFAULT 'user'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"booking_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"vehicle_id" integer NOT NULL,
	"location_id" integer NOT NULL,
	"booking_date" timestamp NOT NULL,
	"return_date" timestamp NOT NULL,
	"total_amount" numeric NOT NULL,
	"booking_status" "booking_status" DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer_support_tickets" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subject" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"status" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fleet_management" (
	"fleet_id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer NOT NULL,
	"acquisition_date" timestamp DEFAULT now() NOT NULL,
	"depreciation_rate" numeric NOT NULL,
	"current_value" numeric NOT NULL,
	"maintenance_cost" numeric NOT NULL,
	"status" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"location_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"contact_phone" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"amount" numeric NOT NULL,
	"payment_status" "payment_status" DEFAULT 'Pending' NOT NULL,
	"payment_date" timestamp NOT NULL,
	"payment_method" varchar(255) NOT NULL,
	"transaction_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"contact_phone" varchar(20) NOT NULL,
	"address" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle_specifications" (
	"vehicle_id" serial PRIMARY KEY NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"fuel_type" varchar(255) NOT NULL,
	"engine_capacity" varchar(255) NOT NULL,
	"transmission" varchar(255) NOT NULL,
	"seating_capacity" integer NOT NULL,
	"color" varchar(255) NOT NULL,
	"features" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"vehicleSpec_id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer NOT NULL,
	"rental_rate" numeric NOT NULL,
	"availability" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authentication" ADD CONSTRAINT "authentication_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_on_users" ADD CONSTRAINT "auth_on_users_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicle_specifications_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle_specifications"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_location_id_location_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("location_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customer_support_tickets" ADD CONSTRAINT "customer_support_tickets_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet_management" ADD CONSTRAINT "fleet_management_vehicle_id_vehicle_specifications_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle_specifications"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicle_id_vehicle_specifications_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicle_specifications"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
