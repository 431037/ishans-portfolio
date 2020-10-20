const router = require("express").Router();
const indexRouter = require("../controllers/index");
const {forwardAuth} = require("../config/auth");

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
