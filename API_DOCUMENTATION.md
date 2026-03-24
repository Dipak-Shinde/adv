# Authentication API Documentation

**Base URL:** `http://localhost:5000/api/users`  
**Content-Type:** `application/json`
==============================================================================

//This is endpoint Api for frontend  routing.....
POST   http://localhost:5000/api/users/register
POST   http://localhost:5000/api/users/verify-email-otp
POST   http://localhost:5000/api/users/resend-otp
POST   http://localhost:5000/api/users/login
POST   http://localhost:5000/api/users/forgot-password
POST   http://localhost:5000/api/users/reset-password
POST   http://localhost:5000/api/users/logout
GET    http://localhost:5000/api/users/sidemenu/:roleId
    

//=======================================================================================

//for profile page endpoints
GET  http://localhost:5000/api/profile/me

PUT  http://localhost:5000/api/profile/update

 post http://localhost:5000/api/profile/avatar







//api for development testing not for frontend..

POST   http://localhost:5000/api/users/test-smtp
POST   http://localhost:5000/api/users/test-send-otp








