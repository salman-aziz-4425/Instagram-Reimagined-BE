export const userAuth = async (req, res, next) => {
  try {
      const userId = req.query.userId || req.body.userId || req.params.userId || req.body.loggedInUserId || req.body.senderId || req.params.id

      if (userId.toString() === req.user.userId.toString()) {
          next();
      } else {
          res.status(401).json({ error: "User not authorized" });
      }
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
};