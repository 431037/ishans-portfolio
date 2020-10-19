let express = require("express");
let router = express.Router();

const clientRouter = require("../controllers/client");

function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  next();
}

router.get("/list", requireAuth, clientRouter.clientList);

router.get("/add", clientRouter.addPage);

router.post("/add", clientRouter.processAddPage);

router.get("/edit/:id", clientRouter.editPage);

router.post("/edit/:id", clientRouter.processEditPage);

router.get("/delete/:id", clientRouter.deleteClient);

module.exports = router;
