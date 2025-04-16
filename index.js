const { client, createTables, createCustomer, fetchCustomers, fetchRestaurants } = require("./db");
const express = require("express");
const morgan = require("morgan");

const server = express();

async function init() {
  await client.connect();
  console.log("connected to database");

  createTables();
  console.log("tables created");

  const [Craig, Madie, Scooby, KFC, Pizza_Hut, Taco_Bell, Subway] = await Promise.all([
    createCustomer("Craig"),
    createCustomer("Madie"),
    createCustomer("Scooby"),
    createRestaurant("KFC"),
    createRestaurant("Pizza_Hut"),
    createRestaurant("Taco_Bell"),
    createRestaurant("Subway"),
  ]);
  console.log("users and restaurants created");

  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`listening on port ${port}`));
}



init();
