// const uuid = 

const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_travel_db"
);

async function createTables() {
  const SQL = `
      DROP TABLE IF EXISTS customer
      DROP TABLE IF EXISTS restaurant
      DROP TABLE IF EXISTS reservation

      CREATE TABLE customers(
        id UUID PRIMARY KEY
        name VARCHAR(255) NOT NULL
      )

      CREATE TABLE restaurants(
        id UUID PRIMARY KEY
        name VARCHAR(255) NOT NULL
      )

      CREATE TABLE reservations(
        id UUID PRIMARY KEY
        date DATE NOT NULL
        party_count INTEGER NOT NULL
        restaurant_id UUID REFERENCES restaurants(id) NOT NULL
        customer_id UUID REFERENCES customers(id) NOT NULL
      );
    `;

  await client.query(SQL);
}

async function createCustomer(name) {
  const SQL = `INSERT INTO customers(id, name) VALUES($1, $2) RETURNING *`;
  const dbResponse = await client.query(SQL, [randomUUID.v4(), name]);
  return dbResponse;
}

async function createRestaurant(name) {
  const SQL = `INSERT INTO restaurants(id, name) VALUES($1, $2) RETURNING *`;
  const dbResponse = await client.query(SQL, [randomUUID.v4(), name]);
  return dbResponse;
}

async function fetchCustomers() {
  const SQL = `SELECT * FROM customers;`;
  const dbResponse = await client.query(SQL);
  return dbResponse.rows;
}

async function fetchRestaurants() {
  const SQL = `SELECT * FROM restaurants;`;
  const dbResponse = await client.query(SQL);
  return dbResponse.rows;
}

async function createReservation() {

}

async function destroyReservation() {

}

module.exports = {
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
};
