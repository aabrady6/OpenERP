use crate::models::status::Status;
use rocket::serde::json::Json;

#[get("/")]
pub fn health() -> Json<Status> {
    Json(Status {
        message: "Backend is running ✅".to_string(),
    })
}
