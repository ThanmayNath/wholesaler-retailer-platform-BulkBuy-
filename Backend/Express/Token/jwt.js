import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("Received token -", token);
  if (!token) {
    res.send("Need Token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to auth" });
      } else {
        req.userID = decoded.id;
        next();
      }
    });
  }
};

export default verifyJWT;
