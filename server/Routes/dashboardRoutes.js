const dashboardController = require("../Controllers/dashboardController");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");
const calendar = require("../middleware/calendar");

router.post("/dashboard/createcourse", dashboardController.createcourse);
router.post("/dashboard/createtichtip", dashboardController.createtichtip);
router.get("/dashboard/allcourses", dashboardController.allcourses);
router.get("/dashboard/allusers", dashboardController.allusers);
router.get("/dashboard/allworkshops", dashboardController.allworkshops);
router.get("/dashboard/alltechtips", dashboardController.alltechtips);
router.get("/dashboard/coursedetail/:id", dashboardController.coursedetail);
router.get("/dashboard/techtipdetail/:id", dashboardController.techtipdetail);
router.put("/dashboard/updatecourse/:id", dashboardController.updatecourse);
router.put("/dashboard/updatetechtip/:id", dashboardController.updatetechtip);
router.put("/dashboard/deletecourse/:id", dashboardController.deletecourse);
router.put("/dashboard/deletetechtip/:id", dashboardController.deletetechtip);
router.put("/dashboard/deleteuser/:id", dashboardController.deleteuser);
router.post("/dashboard/createlesson/:id", dashboardController.createlesson);
router.get("/dashboard/alllessons/:id", dashboardController.alllessons);
router.get("/dashboard/lesson/:id", dashboardController.lessonpage);
router.get("/dashboard/allqeustions", dashboardController.allquestions);
router.put("/dashboard/question/:id/addanswer", dashboardController.addanswer);
router.put("/dashboard/answer/:id/update", dashboardController.updateanswer);
router.put("/dashboard/answer/:id/delete", dashboardController.deleteanswer);
router.get("/dashboard/chatbox/:id", dashboardController.chatbox);
router.post(
  "/dashboard/sendmessage/:id",
  dashboardController.sendmessagetouser
);
router.post("/dashboard/login", dashboardController.login);
router.get("/dashboard/users/count", dashboardController.countusers);
router.get("/dashboard/courses/count", dashboardController.countcourses);
router.get("/dashboard/workshops/count", dashboardController.countworkshops);
router.get("/dashboard/lessons/count", dashboardController.countlessons);
router.get("/dashboard/techtips/count/", dashboardController.counttechtips);
router.get("/dashboard/faq/count/", dashboardController.countfaq);
router.get(
  "/dashboard/course/:id/attendances/count",
  dashboardController.countattendances
);
router.get(
  "/dashboard/course/:id/attendances",
  dashboardController.attendances
);
router.get("/dashboard/lesson/:id/viewers", dashboardController.videoviewers);
router.get(
  "/dashboard/lesson/:id/viewers/count",
  dashboardController.countvideoviewers
);
router.get("/dashboard/course/toprated", dashboardController.topratedcourse);
router.get(
  "/dashboard/workshop/toprated",
  dashboardController.topratedworkshop
);
router.get("/dashboard/lessons/toprated", dashboardController.topratedlesson);
router.get("/dashboard/course/minrated", dashboardController.minratedcourse);
router.get(
  "/dashboard/workshop/minrated",
  dashboardController.minratedworkshop
);
router.get("/dashboard/lessons/minrated", dashboardController.minratedlesson);
router.get(
  "/dashboard/course/mostenrolled",
  dashboardController.mostenrolledcourse
);
router.get(
  "/dashboard/workshop/mostenrolled",
  dashboardController.mostenrolledworkshop
);
router.get(
  "/dashboard/lessons/mostviewed",
  dashboardController.mostviewedvideo
);

module.exports = router;
