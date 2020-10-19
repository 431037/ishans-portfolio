const router = require("express").Router();
const indexRouter = require("../controllers/index");

router.get("/", indexRouter.displayHome);
router.get("/about", indexRouter.displayAbout);
router.get("/projects", indexRouter.displayProjects);
router.get("/services", indexRouter.displayServices);
router.get("/contact", indexRouter.displayContact);

router.get("/login", indexRouter.displayLoginPage);
router.post("/login", indexRouter.processLoginPage);

router.get("/register", indexRouter.displayRegisterPage);
router.post("/register", indexRouter.processRegisterPage);

router.get("/logout", indexRouter.logout);

module.exports = router;
