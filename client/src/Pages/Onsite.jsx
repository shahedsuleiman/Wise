import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CommentCourses from "../Components/CommentCourses";

function Onsite() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { headers } = useAuth();
  const [courseDetails, setCourseDetails] = useState([]);
  const { id } = useParams();

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
      </div>
      <CommentCourses />
      <Footer />
    </>
  );
}

export default Onsite;
