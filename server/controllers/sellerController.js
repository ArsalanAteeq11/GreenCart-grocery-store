import jwt from "jsonwebtoken";

// Seller Login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      (email === process.env.SELLER_EMAIL ||
        email === process.env.DEMO_SELLER_EMAIL) &&
      (password === process.env.SELLER_PASSWORD ||
        password === process.env.DEMO_SELLER_PASSWORD)
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("sellerToken", token, {
        httpOnly: true,

        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        success: true,
        message: "login successfully!",
      });
    } else {
      return res.json({
        success: false,
        message: "missing Credentials",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Check isSellerAuth
export const isSellerAuth = async (req, res) => {
  try {
    const sellerEmail = req.user.email;
    return res.json({ success: true, sellerEmail });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Seller Logout

export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,

      secure: true,
      sameSite: "None",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
