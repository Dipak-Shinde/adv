# ------------- Authentication APIs

| Method | API                           | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| POST   | `/api/users/register`         | Register New User             |
| POST   | `/api/users/verify-email-otp` | Verify Email OTP              |
| POST   | `/api/users/resend-otp`       | Resend Email OTP              |
| POST   | `/api/users/login`            | Login User                    |
| POST   | `/api/users/forgot-password`  | Send Password Reset OTP       |
| POST   | `/api/users/verify-email-otp` | Verify OTP for Password Reset |
| POST   | `/api/users/reset-password`   | Reset Password                |
| POST   | `/api/users/change-password`  | Change Password               |
| POST   | `/api/users/refresh-token`    | Refresh Session Token         |
| POST   | `/api/users/logout`           | Logout User                   |


Request Body: Register User
{
  "barregno": "MH12345",
  "full_name": "Dipak Shinde",
  "email": "dipak@test.com",
  "phone_no": "9876543210",
  "password": "123456",
  "confirmPassword": "123456"
}
Request Body: Verify Email OTP
{
  "email": "dipak@test.com",
  "otp": "123456"
}
Request Body: Resend OTP
{
  "email": "dipak@test.com"
}
Request Body: Login User
{
  "login": "dipak@test.com",
  "password": "123456"
}
Request Body: Forgot Password
{
  "email": "dipak@test.com"
}
Request Body: Verify OTP (Password Reset)
{
  "email": "dipak@test.com",
  "otp": "123456"
}
Request Body: Reset Password
{
  "reset_token": "RESET_TOKEN",
  "newPassword": "12345678",
  "confirmPassword": "12345678"
}
Request Body: Change Password

Headers

Authorization: Bearer JWT_TOKEN

Body

{
  "currentPassword": "123456",
  "newPassword": "654321",
  "confirmPassword": "654321"
}
Request Body: Refresh Token
{
  "refresh_token": "SESSION_TOKEN"
}
Request Body: Logout
{
  "session_token": "SESSION_TOKEN"
}
------------- Sidebar API

| Method | API             | Description      |
| ------ | --------------- | ---------------- |
| GET    | `/api/sidemenu` | Get Sidebar Menu |



# ------------- Client Details

| Method | API                              | Description              |
| ------ | -------------------------------- | ------------------------ |
| POST   | `/api/clients/add-client`        | Add Client + Address     |
| GET    | `/api/clients/client-list/:user_id`| Client List              |
| GET    | `/api/clients/view-client/:id`   | Client + Address Details |
| PUT    | `/api/clients/edit-client/:id`   | Update Client + Address  |
| DELETE | `/api/clients/delete-client/:id` | Delete Client + Address  |


Request Body: Add Client
{
  "firstname": "Akashy",
  "lastname": "kumar",
  "email": "Akashy@example.com",
  "phoneno": "9876543299",
  "dateofbirth": "1996-08-11",
  "gender": "Male",
  "user_id": 6,

  "addressline1": "Mb Road",
  "addressline2": "Near hills station",
  "city_id": 1,
  "state_id": 1,
  "country_id": 1,
  "pincode": "411001",

  "created_by": 1
}


# --------------Case API Endpoints

| API Name              | Method | Full Endpoint                                                                             | ID Used   | Description                       |
| --------------------- | ------ | ----------------------------------------------------------------------------------------- | --------- | --------------------------------- |
| Add Case              | POST   | `http://localhost:8000/api/cases/add-case`                                                | —         | Create a new case                 |
| Case List             | GET    | `http://localhost:8000/api/cases/case-list?user_id=6&page=1&page_size=10`                 | `user_id` | Get all cases for a specific user |
| Case List with Search | GET    | `http://localhost:8000/api/cases/case-list?user_id=6&search=Property&page=1&page_size=10` | `user_id` | Search cases                      |
| View Case Details     | GET    | `http://localhost:8000/api/cases/view-case/1`                                             | `case_id` | View details of a specific case   |
| Update Case           | PUT    | `http://localhost:8000/api/cases/edit-case/1`                                             | `case_id` | Update a case                     |
| Delete Case           | DELETE | `http://localhost:8000/api/cases/delete-case/1`                                           | `case_id` | Delete a case                     |

Request Body: Add Case
{
  "user_id": 6,
  "client_id": 33,
  "case_title": "Property ",
  "casetype": "Civil2",
  "case_description": "Land ownership dispute between two parties",
  "court_name": "District Court",
  "court_location": "Pune",
  "case_startdate": "2026-03-09",
  "case_enddate": "2026-08-15",
  "adverse_party_names": "Rahul Sharma",
  "adverse_party_phones": "9876543210",
  "adverse_party_emails": "rahul@example.com",
  "adverse_party_address": "Mumbai, Maharashtra",
  "adverse_party_advocate_names": "Adv. Amit Patil",
  "adverse_party_advocate_phones": "9999999999",
  "adverse_party_advocate_emails": "amit@law.com",
  "is_active": true,
  "created_by": 1,
  "updated_by": null
}

# --------------------Case Notes APIs

| Method | Endpoint                           | Description                   | Request Body / Params |
| ------ | ---------------------------------- | ----------------------------- | --------------------- |
| POST   | `/api/case-notes/create`           | Create new case note          | Body                  |
| GET    | `/api/case-notes/all/:user_id`     | Get all case notes for a user | `user_id` (params)    |
| GET    | `/api/case-notes/clients/:user_id` | Get clients dropdown for user | `user_id` (params)    |
| GET    | `/api/case-notes/cases/:client_id` | Get cases by client           | `client_id` (params)  |
| GET    | `/api/case-notes/:note_id`         | Get case note by ID           | `note_id` (params)    |
| PUT    | `/api/case-notes/update`           | Update case note              | Body                  |
| DELETE | `/api/case-notes/delete/:note_id`  | Delete case note              | `note_id` (params)    |

Request Body: Create new case note  

{
  "user_id": 6,
  "client_id": 47,
  "case_id": 23,
  "note_title": "Court Hearing",
  "note_description": "Client attended hearing",
  "followup_date": "2026-04-10",
  "created_by": 1
}


Update 

{
  "note_id": 3,
  "note_title": "Court Hearing Updated",
  "note_description": "Client attended hearing and submitted documents",
  "followup_date": "2026-04-15",
  "updated_by": 1
}

Example GET Requests

GET /api/case-notes/all/6
GET /api/case-notes/clients/6
GET /api/case-notes/cases/47
GET /api/case-notes/3
DELETE /api/case-notes/delete/3









git add .

git commit -m okokk

git push origin main