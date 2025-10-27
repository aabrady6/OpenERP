use rocket::serde::Serialize;

#[derive(Serialize)]
pub struct Status {
    pub message: String,
}
