import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Details() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/${courseId}`
        );
        setCourse(response.data.course);

        // Fetch lessons related to this courseId
        const lessonsResponse = await axios.get(
          `http://localhost:8080/courses/${courseId}/lessons`
        );
        setLessons(lessonsResponse.data.lessons);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);
  return (
    <>
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-2/3 px-4">
          <div className="lg:w-full lg:px-4 mb-4 lg:mb-0 lg:p-6 w-full relative rounded block">
            <h1 className="text-gray-800 text-4xl font-bold mt-2 mb-2 leading-tight">
              title
            </h1>
            <img alt="" className="text-gray-600 mb-4" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded shadow-md dark:border-[#ffffff33]">
                <div className="flex items-center">
                  <div>
                    <img
                      className="h-[83px] w-[83px] rounded-lg"
                      //   src={course.image}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <Link>
                      <p className="text-base font-medium text-navy-700 dark:text-white">
                        {/* {course.title} */}
                      </p>
                    </Link>
                    <p className="mt-2 text-sm text-gray-600">
                      {/* {course.description}. */}
                    </p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {/* {course.start_time} */}
                    </p>
                    <p className="text-base font-medium text-navy-700 dark:text-white">
                      {/* {course.end_time} */}
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
            </div>
            <button class="px-4 py-3 text-indigo-950 transition-all transform border border-indigo-950 hover:bg-indigo-950  hover:text-gray-100">
              Add Lessons
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
