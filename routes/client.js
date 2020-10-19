let express = require("express");
let router = express.Router();

const clientRouter = require("../controllers/client");

router.get("/list", clientRouter.clientList);

router.get("/add", clientRouter.addPage);

router.post("/add", clientRouter.processAddPage);

router.get("/edit/:id", clientRouter.editPage);

router.post("/edit/:id", clientRouter.processEditPage);

router.get("/delete/:id", clientRouter.deleteClient);

module.exports = router;
