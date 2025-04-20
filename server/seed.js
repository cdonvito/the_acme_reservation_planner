const {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  createReservation,
  destroyReservation,
} = require("./db");

async function init() {
  await client.connect();
  console.log("connected to database");

  await createTables();
  console.log("tables created");

  const [craig, madie, scooby, outback, red_Robin, cheddars, carrabbas] =
    await Promise.all([
      createCustomer("Craig"),
      createCustomer("Madie"),
      createCustomer("Scooby"),
      createRestaurant("Outback Steakhouse"),
      createRestaurant("Red Robin"),
      createRestaurant("Cheddar's"),
      createRestaurant("Carrabba's"),
    ]);
  console.log("users and restaurants created");

  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());

  const [res1] = await Promise.all([
    createReservation({
      date: "4/16/2025",
      party_count: 4,
      restaurant_id: outback.id,
      customer_id: craig.id,
    }),
    createReservation({
      date: "4/21/2025",
      party_count: 6,
      restaurant_id: red_Robin.id,
      customer_id: madie.id,
    }),
  ]);

  console.log("Reservations made");
  console.log(await fetchReservations());

  await destroyReservation({
    id: res1.id,
    customer_id: craig.id,
  });
  console.log("Deleted Reservation");
}

init();
