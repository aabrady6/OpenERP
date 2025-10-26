use rocket::serde::Deserialize;

#[derive(Deserialize)]
pub struct IntersectionRequest {
    pub point: Point,
    pub radius: f64,
}

#[derive(Deserialize)]
pub struct Point {
    pub lat: f64,
    pub lon: f64,
}
