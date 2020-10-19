const router = require("express").Router();
const indexRouter = require("../controllers/index");

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  next();
}

function forwardAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/client/list");
}

router.get("/", indexRouter.displayHome);
router.get("/about", indexRouter.displayAbout);
router.get("/projects", indexRouter.displayProjects);
router.get("/services", indexRouter.displayServices);
router.get("/contact", indexRouter.displayContact);

router.get("/login", forwardAuth, indexRouter.displayLoginPage);
router.post("/login", forwardAuth, indexRouter.processLoginPage);

router.get("/register", forwardAuth, indexRouter.displayRegisterPage);
router.post("/register", forwardAuth, indexRouter.processRegisterPage);

router.get("/logout", indexRouter.logout);

module.exports = router;
