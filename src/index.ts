import { serve } from "@hono/node-server";
import { Hono } from 'hono';
import "dotenv/config";
import { usersRouter } from "./users/user.router"; 
import {specificationsRouter} from "./specifications/specification.router"
import {authenticationsRouter} from "./authentications/authentication.router"
import {bookingsRouter}  from "./bookings/booking.router"
import {locationsRouter} from "./locations/location.router"
import {PaymentsRouter} from "./payments/payment.router"
import {TicketsRouter} from "./tickets/ticket.router"
import {VehiclesRouter} from "./vehicles/vehicle.router"
import {FleetsRouter} from "./fleets/fleet.router"
import { authRouter } from "./auth/auth.router";

import { cors } from 'hono/cors'

const app = new Hono();
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['POST', 'GET', 'PUT', 'DELETE']
  })
)

 



//custom route
app.route("/api", usersRouter)
app.route("/api", specificationsRouter)
app.route("/api", authenticationsRouter)
app.route("/api", bookingsRouter)
app.route("/api", locationsRouter)
app.route("/api", PaymentsRouter)
app.route("/api", TicketsRouter)
app.route("/api", VehiclesRouter)
app.route("/api", FleetsRouter)
app.route("/api", authRouter)

app.get("/", (c) => {
    return c.text('The server is running');
  });
  
  export default app;
  
  app.notFound((c) => {
    return c.text('route not found')
  })
  
  const PORT = process.env.PORT || 8000; 
  
  console.log(`Server is running on port ${PORT}`);
  
  serve({
    fetch: app.fetch.bind(app),
    port: Number(PORT)
  });
  