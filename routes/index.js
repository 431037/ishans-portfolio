const router = require("express").Router();
const indexRouter = require("../controllers/index");

router.get("/", indexRouter.displayHome);
router.get("/about", indexRouter.displayAbout);
router.get("/projects", indexRouter.displayProjects);
router.get("/services", indexRouter.displayServices);
router.get("/contact", indexRouter.displayContact);

module.exports = router;
