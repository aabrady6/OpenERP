use rocket::serde::{Deserialize, Serialize, json::Json};
use sqlx::Pool;
use sqlx::Postgres;

use crate::models::request::IntersectionRequest;

#[derive(Serialize)]
pub struct IntersectionResponse {
    points: Vec<Point>,
}

#[derive(Serialize)]
pub struct Point {
    lat: f64,
    lon: f64,
}

#[get("/items/search?<lat>&<lon>&<radius>")]
pub async fn get_intersections(lat: f64, lon: f64, radius: f64) -> Json<IntersectionResponse> {
    println!(
        "📡 Received GET /api/intersections/items/search?lat={}&lon={}&radius={}",
        lat, lon, radius
    );

    // Temporary example data
    let fake_points = vec![Point { lat: 1.0, lon: 2. }, Point { lat: 3., lon: 4. }];

    Json(IntersectionResponse {
        points: fake_points,
    })
}
