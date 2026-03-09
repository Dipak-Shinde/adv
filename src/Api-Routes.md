BASE URL
http://localhost:5000

====================================================
AUTH / USER APIs
====================================================

POST /api/users/register
# Register new user (Signup – keep as is)

POST /api/users/verify-email-otp
# Verify OTP for signup / forgot / get_started (purpose based)

POST /api/users/resend-otp
# Resend OTP to email

POST /api/users/login
# Login using email + password, returns JWT token

POST /api/users/forgot-password
# Send OTP for password reset

POST /api/users/reset-password
# Reset password using reset token

//for profile setting change password 
POST /api/users/change-password
# Change password (JWT required)

POST /api/users/refresh-token
# Refresh session token

POST /api/users/logout
# Logout user and invalidate session


====================================================
PROFILE APIs
====================================================

GET /api/profile/me
# Get logged-in user profile (JWT required)

PUT /api/profile/update
# Update profile details: full_name, phone, about_me (JWT required)

POST /api/profile/avatar
# Upload profile image (JWT + multipart/form-data)


====================================================
FILE ACCESS
====================================================

GET /uploads/profile/{filename}
# Access uploaded profile image


====================================================
HEALTH CHECK
====================================================

GET /
# Server health check


====================================================
AUTH HEADER
====================================================

Authorization: Bearer <JWT_TOKEN>


====================================================
CONTENT TYPE
====================================================

application/json
multipart/form-data (for avatar upload)
