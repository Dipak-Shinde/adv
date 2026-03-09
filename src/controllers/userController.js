import * as UserService from "../services/userService.js";




export const registerUser = async (req, res) => {
  try {
    const {
      barregno,
      full_name,
      email,
      phone_no,
      password,
      confirmPassword
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match please check"
      });
    }

   const result = await UserService.registerUserService({
      barregno,
      full_name,
      email,
      phone_no,
      password
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}
};

/* VERIFY OTP – AUTO DETECT PURPOSE */
export async function verifyEmailOtp(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "email and otp are required"
    });
  }

  const result = await UserService.verifyEmailOtpService(email, otp);
  res.json(result);
}

/* RESEND OTP */
export async function resendEmailOtp(req, res) {
  res.json(await UserService.resendEmailOtpService(req.body.email));
}

/* LOGIN */
// export async function loginUser(req, res) {
 
//     const result = await UserService.loginUserService({
//     ...req.body,
//     userAgent: req.headers["user-agent"],
//     ipAddress: req.ip,
//   });

//   console.log("LOGIN RESULT:", result); // 👈 ADD THIS

//   res.json(result);
// }


export async function loginUser(req, res) {

  console.log("LOGIN API HIT");
  console.log("REQUEST BODY:", req.body);

  const result = await UserService.loginUserService({
    ...req.body,
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  });

  console.log("LOGIN RESULT:", result);

  res.json(result);
}

/* FORGOT PASSWORD */
// export async function forgotPassword(req, res) {
//   res.json(await UserService.forgotPasswordService(req.body.email));
// }
/* ================= FORGOT PASSWORD ================= */

/* FORGOT PASSWORD */
export async function forgotPassword(req, res) {

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  const result = await UserService.forgotPasswordService(email);

  res.json(result);
}
/* RESET PASSWORD (NO OTP HERE) */
export async function resetPassword(req, res) {
  const { reset_token, newPassword, confirmPassword } = req.body;

  if (!reset_token || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "reset_token, newPassword and confirmPassword are required"
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match"
    });
  }

  const result = await UserService.resetPasswordService(
    reset_token,
    newPassword
  );

  return res.json(result);
}

//* CHANGE PASSWORD (WITH OTP) */
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.user_id;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    const result = await UserService.changePasswordService(
      userId,
      currentPassword,
      newPassword
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
}


/* REFRESH SESSION */
export async function refreshSessionToken(req, res) {
  res.json(
    await UserService.refreshSessionTokenService(
      req.body.refresh_token,
      req.headers["user-agent"],
      req.ip
    )
  );
}

/* LOGOUT */
export async function logoutSession(req, res) {
  res.json(await UserService.logoutSessionService(req.body.session_token));
}


