#[macro_use]
extern crate rocket;

use rocket::serde::json::Json;
use sqlx::{Pool, Postgres};
use std::env;

mod endpoints;
mod models;

use endpoints::{health::health, intersections::get_intersections};

#[launch]
async fn rocket() -> _ {
    rocket::build()
        .mount("/api", routes![health])
        .mount("/api/intersections", routes![get_intersections])
}
