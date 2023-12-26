const dashboardController = require("../Controllers/dashboardController");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");

router.post("/dashboard/createcourse", dashboardController.createcourse);
router.post("/dashboard/createtichtip", dashboardController.createtichtip);
router.get("/dashboard/allcourses", dashboardController.allcourses);
router.get("/dashboard/coursedetail/:id", dashboardController.coursedetail);
router.get("/dashboard/allusers", dashboardController.allusers);
router.get("/dashboard/allworkshops", dashboardController.allworkshops);
router.get("/dashboard/alltechtips", dashboardController.alltechtips);
router.put("/dashboard/updatecourse/:id", dashboardController.updatecourse);
router.put("/dashboard/updatetechtip/:id", dashboardController.updatetechtip);
router.put("/dashboard/deletecourse/:id", dashboardController.deletecourse);
router.put("/dashboard/deletetechtip/:id", dashboardController.deletetechtip);
router.put("/dashboard/deleteuser/:id", dashboardController.deleteuser);
router.post("/dashboard/createlesson/:id", dashboardController.createlesson);

router.get("/dashboard/alllessons/:id", dashboardController.alllessons);

router.post(
  "/dashboard/lesson/:id/uploadimage",
  dashboardController.uploadlessonimage
);
router.get("/dashboard/allfaq", dashboardController.allfaq);
router.put("/dashboard/faq/:id/update", dashboardController.updatefaq);
router.put("/dashboard/faq/:id/delete", dashboardController.deletefaq);
router.post("/dashboard/login", dashboardController.login);
router.get("/dashboard/users/count", dashboardController.countusers);
router.get("/dashboard/courses/count", dashboardController.countcourses);
router.get("/dashboard/workshops/count", dashboardController.countworkshops);
router.get("/dashboard/techtips/count/", dashboardController.counttechtips);

router.get(
  "/dashboard/course/:id/attendances/count",
  dashboardController.countattendances
);
router.get(
  "/dashboard/course/:id/attendances",
  dashboardController.attendances
);

router.post("/dashboard/addfaq", dashboardController.addfaq);
module.exports = router;
