use crate::models::request::Point;
use rocket::serde::Serialize;

#[derive(Serialize)]
pub struct IntersectionResponse {
    pub points: Vec<Point>,
}
