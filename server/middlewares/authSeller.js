import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.json({ success: false, message: "unauthorized" });
  }
  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (
      tokenDecode.email === process.env.SELLER_EMAIL ||
      tokenDecode.email === process.env.DEMO_SELLER_EMAIL
    ) {
      req.user = { email: tokenDecode.email };
      next();
    } else {
      return res.json({ success: false, message: "unauthorized" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authSeller;
