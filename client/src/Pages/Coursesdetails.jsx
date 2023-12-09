import React, { useEffect, useState } from "react";
// import { withRouter } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CommentCourses from "../Components/CommentCourses";

function Coursesdetails() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { headers } = useAuth();
  const [courseDetails, setCourseDetails] = useState([]);
  const [courseLessons, setCourseLessons] = useState([]);
  const { id } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/elderlies/detail/${id}`
        );
        setCourseDetails(response.data);
        console.log("Course Details API response:", response.data);
      } catch (error) {
        console.error("Error fetching course details:", error.response);
      }
    };

    fetchCourseDetails();
  }, [id, token]);

  useEffect(() => {
    const fetchCourseLessons = async () => {
      try {
        if (token) {
          console.log(token);
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.get(
            `http://localhost:8080/course/${id}/allessonsauth`
          );
          setCourseLessons(response.data);
          console.log("Course Lessons API response:", response.data);
          if (
            response.data.lessons &&
            response.data.lessons.length > 0 &&
            response.data.lessons[0].id
          ) {
            fetchLessonVideos(response.data.lessons[0].id);
          }
        } else {
          const response = await axios.get(
            `http://localhost:8080/course/${id}/allessons`
          );
          setCourseLessons(response.data);
          console.log("Course Lessons API response:", response.data);
          if (
            response.data.lessons &&
            response.data.lessons.length > 0 &&
            response.data.lessons[0].id
          ) {
            fetchLessonVideos(response.data.lessons[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching course lessons:", error.response);
      }
    };

    fetchCourseLessons();
  }, [id, token]);

  const fetchLessonVideos = async (lessonId) => {
    if (!lessonId) return;

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get(
        `http://localhost:8080/course/lesson/${lessonId}`
      );
      console.log(lessonId);
      console.log(currentVideo);
      setCurrentVideo(response.data.course[0].video);
      console.log("video Lessons API response:", response.data);
    } catch (error) {
      console.error("Error fetching video lessons:", error.response);
    }
  };

  const navigate = useNavigate();
  const handleEnroll = async () => {
    try {
      const enrollmentData = {
        courseId: id,
      };
      axios.defaults.headers.common["Authorization"] = token;
      const enrollResponse = await axios.post(
        `http://localhost:8080/courseregister/${id}`,
        enrollmentData,
        { headers }
      );
      Swal.fire({
        icon: "success",
        title: "Enrollment Successful!",
        text: "You have successfully enrolled in the course.",
      });

      console.log("Enrollment Response:", enrollResponse.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Enrollment Failed",
        text: "You Have to subscribe :) ",
      }).then(() => {
        navigate("/pricing");
      });
    }
  };
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-2/3 px-4">
          <div className="aspect-w-16 aspect-h-16">
            <iframe
              title="lesson-video"
              className="w-full h-[30rem]"
              src={currentVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="lg:w-full lg:px-4 mb-4 lg:mb-0 lg:p-6 w-full relative rounded block">
            <span className="text-indigo-900 text-sm hidden md:block mt-4">
              Technology
            </span>
            <h1 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
              {courseDetails.course && courseDetails.course[0].title
                ? courseDetails.course[0].title
                : "Title Not Available"}
            </h1>
            <p className="text-gray-600 mb-4">
              {courseDetails.course && courseDetails.course[0].detail
                ? courseDetails.course[0].detail
                : "Details Not Available"}
            </p>
            <button
              onClick={handleEnroll}
              class="px-4 py-3 text-indigo-950 transition-all transform border border-indigo-950 hover:bg-indigo-950  hover:text-gray-100"
            >
              Enroll Now
            </button>
          </div>
        </div>

        <div className="lg:w-1/3 px-4">
          <div className="bg-gray-200 border border-gray-300 p-4 font-bold">
            <h1 className="text-indigo-950  hover:text-indigo-900 pl-2 border-l-4 border-indigo-950 mb-6">
              Course Lessons
            </h1>
            <ul>
              {courseLessons.lessons && courseLessons.lessons.length > 0 ? (
                courseLessons.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="flex items-center mb-4 pb-4 border-b border-dashed border-gray-300"
                    onClick={() => fetchLessonVideos(lesson.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="sidebar-thumb">
                      <img
                        className="animated rollIn bg-white border border-dashed border-gray-300 p-2 h-16 w-16 rounded-full"
                        src={lesson.image}
                        alt={lesson.title}
                      />
                    </div>
                    <div className="sidebar-content">
                      <h5 className="animated bounceInRight mb-0">
                        <button className="text-indigo-950 hover:text-indigo-900">
                          {lesson.title}{" "}
                        </button>
                      </h5>
                    </div>
                    <div className="sidebar-meta ml-auto">
                      {/* <span className="time">
                        <i className="fa fa-clock-o text-xs"></i> {lesson.date}{" "}
                      </span> */}
                    </div>
                  </li>
                ))
              ) : (
                <p>No lessons found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <CommentCourses />
      <Footer />
    </>
  );
}

export default Coursesdetails;
