import jwt from "jsonwebtoken";
const authUser = async (req, res , next) => {
  try {
    const token = req?.cookies?.AccessToken || req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({
          message: "Please Login",
          success: false,
          error: true,
        });
    } else {
      const decoded = jwt.verify(token, process.env.SECRETACCESSTOKEN);
      if (decoded) {
        req.userId = decoded?._id;
      }
    }
    next()
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true });
  }
};

export default authUser;
