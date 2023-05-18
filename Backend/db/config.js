import pkg from "pg";
const { Client } = pkg;

const db = new Client({
  host: "localhost",
  port: 5432,
  database: "BulkBuy",
  user: "postgres",
  password: "123abc",
});

db.connect((err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Connected to PostgreSQL!");
});

export default db;
