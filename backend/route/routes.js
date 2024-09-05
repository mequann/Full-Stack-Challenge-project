const router = require("express").Router();
const controllers = require('../controller/controllers'); 

router.post("/create", controllers.createController);
router.get("/getAll", controllers.getAllController);
router.get("/getById/:id", controllers.getByIdController);
router.put("/update/:id", controllers.updateController);
router.delete("/delete/:id", controllers.deleteController);
router.get("/getStatistics", controllers.getStatisticsController);

module.exports = router;
