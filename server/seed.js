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

async function init() {
  await client.connect();
  console.log("connected to database");

  createTables();
  console.log("tables created");

  const [Craig, Madie, Scooby, KFC, Pizza_Hut, Taco_Bell, Subway] =
    await Promise.all([
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

  const [res1, res2] = await Promise.all([
    createReservation({
      date: "4/16/2025",
      party_count: 4,
      restaurant_id: KFC.id,
      customer_id: Craig.id,
    }),
    createReservation({
      date: "4/21/2025",
      party_count: 6,
      restaurant_id: Subway.id,
      customer_id: Madie.id,
    }),
  ]);

  console.log("Reservations made");

  await destroyReservation(res1.id.res1.id);
  console.log("Deleted Reservation");
}

init();