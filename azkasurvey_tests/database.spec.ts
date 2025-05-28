import { expect, test } from "@playwright/test";
import mysql from "mysql2/promise";
test("verify that user can retrive the Data from the database", async () => {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "sakila",
  });
  const [rows] = await db.execute(
    "select a.first_name as name,f.title,f.release_year as year,f.rental_duration as duration,f.rental_rate as rate from actor a inner join film_actor fa on a.actor_id=fa.actor_id inner join film f on fa.film_id=f.film_id where f.rental_duration>6 and f.rental_rate>=4.99 order by a.first_name;"
  );
  let rowCount = rows as any[];
  for (let i = 0; i < rowCount.length; i++) {
    let title = rows[i].title;
    console.log(title);
  }
});
