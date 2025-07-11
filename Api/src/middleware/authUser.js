const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(token_decode.user._id);
    req.userId = token_decode.id; // ✅ Better for GET routes
    if (!req.body) req.body = {};
    req.body.userId = token_decode.id; // ✅ Optional fallback
    console.log(token_decode.name);

    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
module.exports = authUser;
