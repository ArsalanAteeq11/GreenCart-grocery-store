import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "unauthorizedddd" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken", tokenDecode.id);
    if (tokenDecode.id) {
      // req.body.userId = tokenDecode.id;
      req.user = { id: tokenDecode.id };
    } else {
      return res.json({ success: false, message: "unauthorizedd" });
    }
    next();
  } catch (error) {
    console.log("error", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
