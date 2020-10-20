module.exports = {
  requireAuth: function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
    }
    next();
  },
  forwardAuth: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/client/list");
  },
};
