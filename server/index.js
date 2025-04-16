const {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation,
} = require("./db");

const express = require("express");
const morgan = require("morgan");

const server = express();
client.connect();

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`listening on port ${port}`));

server.use(morgan("dev"));
server.use(express.json());

server.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
  } catch (error) {
    next(error);
  }
});

server.get("/api/restaurants", async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
  } catch (error) {
    next(error);
  }
});

server.get("/api/reservations", async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
  } catch (error) {
    next(error);
  }
});

server.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const customers = await fetchCustomers();
  } catch (error) {
    next(error);
  }
});

server.delete(
  "/api/customers/:customer_id/reservations/:id",
  async (req, res, next) => {
    try {
      const customers = await fetchCustomers();
    } catch (error) {
      next(error);
    }
  }
);

//error handling
server.use((err, req, res) => {
  res.status(err.statusCode || 500).send({ error: err.message || err });
});
