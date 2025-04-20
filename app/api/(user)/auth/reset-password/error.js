
const { default: User } = require("@/models/User");
const bcrypt = require("bcryptjs");

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    // Find the user associated with the token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;  // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the reset token expiry

    // Save the user with the new password
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "An error occurred, please try again later" });
  }
});
