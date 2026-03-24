import * as UserService from "../services/userService.js";




/* REGISTER */
export const registerUser = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match"
      });
    }

    const result = await UserService.registerUserService(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.json(result);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
/* VERIFY OTP – AUTO DETECT PURPOSE */
/* VERIFY OTP */
export async function verifyEmailOtp(req, res) {
  const { email, otp, purpose } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "email and otp are required"
    });
  }

 const result = await UserService.verifyEmailOtpService(
  email,
  otp,
  purpose || "signup" // ✅ match DB default
);

  res.json(result);
}
/* RESEND OTP */


/* RESEND OTP */
export async function resendEmailOtp(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const result = await UserService.resendEmailOtpService(email);

    return res.status(200).json(result);

  } catch (error) {
    console.error("Resend OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to resend OTP"
    });
  }
}



export async function loginUser(req, res) {
  try {
    console.log("--------------------------------------------------");
    console.log(":rocket: LOGIN ATTEMPT:", new Date().toISOString());
    console.log(":envelope_with_arrow: REQUEST BODY:", req.body);

    const result = await UserService.loginUserService({
      ...req.body,
      userAgent: req.headers["user-agent"],
      ipAddress: req.ip,
    });

    console.log(":white_check_mark: LOGIN RESULT:", result);

    if (!result.success) {

      return res.status(401).json(result);
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(":x: LOGIN CONTROLLER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred during login",
    });
  }
}

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


