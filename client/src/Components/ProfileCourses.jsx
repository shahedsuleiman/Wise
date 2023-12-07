import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router-dom";

function ProfileCourses() {
  const [userCourses, setUserCourses] = useState([]);
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const { id } = useParams();

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        if (!token) {
          console.error("Token not available.");
          return;
        }
        console.log(id);

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(
          `http://localhost:8080/profile/mycourses`
        );
        if (Array.isArray(response.data.courses)) {
          // Check if response.data is an array
          setUserCourses(response.data.courses);
          console.log("User Courses:", response.data.courses);
        } else {
          console.error(
            "Data received is not an array:",
            response.data.courses
          );
        }
        setUserCourses(response.data.courses);
        console.log("User Courses:", response.data.courses);
      } catch (error) {
        console.error("Error fetching user courses:", error);
      }
    };

    fetchUserCourses();
  }, []);
  return (
    <>
      <div className="relative items-end justify-center flex-col border-[1px] border-gray-200 bg-white bg-clip-border shadow-md dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="p-4">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            All Courses
          </h4>
        </div>
        <div className="flex flex-col gap-4">
          {Array.isArray(userCourses) && userCourses.length > 0 ? (
            userCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded shadow-md dark:border-[#ffffff33]"
              >
                <div className="flex items-center">
                  <div>
                    <img
                      className="h-[83px] w-[83px] rounded-lg"
                      src={course.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <Link to={`/courseDetails/${course.id}`}>
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {course.title}
                      </p>
                    </Link>
                    <p className="mt-2 text-sm text-gray-600">
                      {course.description}.
                    </p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {course.start_time}
                    </p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {course.end_time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41z" />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileCourses;