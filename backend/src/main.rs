use rocket::{get, launch, routes, serde::json::Json};
use serde::Serialize;
use sqlx::{Pool, Postgres};
use std::env;

#[derive(Serialize)]
struct Status {
    message: String,
}

#[get("/")]
fn health() -> Json<Status> {
    Json(Status {
        message: "Backend is running".to_string(),
    })
}

#[launch]
async fn rocket() -> _ {
    // Retrieve DATABASE_URL from environment
    let database_url =
        env::var("DATABASE_URL").expect("DATABASE_URL must be set in environment variables");

    // Connect to Postgres
    let pool = Pool::<Postgres>::connect(&database_url)
        .await
        .expect("Failed to connect to database");

    rocket::build().manage(pool).mount("/", routes![health])
}
