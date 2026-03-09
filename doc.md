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
| GET    | `/api/clients/client-list`       | Client List              |
| GET    | `/api/clients/view-client/:id`   | Client + Address Details |
| PUT    | `/api/clients/edit-client/:id`   | Update Client + Address  |
| DELETE | `/api/clients/delete-client/:id` | Delete Client + Address  |

Request Body: Add Client
{
  "user_id": 2,
  "firstname": "Avinash",
  "lastname": "J.",
  "phoneno": "9999999999",
  "email": "Avi@gmail.com",
  "gender": "Male",
  "dateofbirth": "1998-05-11",
  "city": "Phaltan",
  "created_by": 1,

  "addressline1": "Wakad1",
  "addressline2": "Bhumkar chauk1",
  "state": "Maharashtra",
  "country": "India",
  "pincode": "411001"
}

git add .

git commit -m okokk

git push origin main