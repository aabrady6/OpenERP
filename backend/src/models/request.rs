use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Point {
    pub lat: f64,
    pub lon: f64,
}

#[derive(Deserialize)]
pub struct IntersectionRequest {
    pub point: Point,
    pub radius: f64,
}
