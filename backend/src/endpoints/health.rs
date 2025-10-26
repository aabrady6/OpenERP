use rocket::serde::json::Json;
use serde::Serialize;

#[derive(Serialize)]
pub struct Status {
    message: String,
}

#[get("/")]
pub fn health() -> Json<Status> {
    Json(Status {
        message: "Backend is running ✅".to_string(),
    })
}
