import db from "../database/db.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.status(401).send({ message: "Invalid token authorization." });
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
      return res.status(401).send({ message: "Invalid user." });
    }
    delete user.password;
    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

export default auth;
