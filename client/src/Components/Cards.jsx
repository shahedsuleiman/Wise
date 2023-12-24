import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cards() {
  const [courseData, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/home/allcourses"
        );
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {" "}
      <div className="mt-8 my-8 lg:my-8 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h3 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100">
            Check our Latest Courses
          </h3>
        </div>
        <div className="mt-6 md:mt-0">
          <button
            href=""
            className="linear rounded-[20px] bg-indigo-950 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-indigo-900 active:bg-brand-700"
          >
            View All
          </button>
        </div>
      </div>
      <div className="bg-white flex justify-center items-center py-6">
        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
          {courseData && courseData.courses ? (
            courseData.courses.map((course) => (
              <div
                key={course.id}
                className="max-w-xs max-h-full bg-white px-4 pt-4 pb-2 rounded-lg border border-gray-300 shadow-lg transform hover:scale-105 transition duration-500 flex flex-col"
              >
                <div className="relative flex-shrink-0">
                  <img
                    className="w-full h-48 rounded-xl object-cover mb-4"
                    src={course.image} // Assuming you have an 'image' property in your course data
                    alt={course.title} // Assuming you have a 'title' property in your course data
                  />
                </div>
                <h1 className="text-gray-800 text-2xl font-bold cursor-pointer">
                  {course.title}
                </h1>
                <div className="my-4">
                  <div className="flex space-x-1 items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-950 mb-1.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <p>By {course.trainer}</p>
                  </div>
                  <Link to={`/courseDetails/${course.id}`}>
                    <button className="mt-4 text-xl w-full text-white bg-indigo-950 py-2 rounded-xl shadow-lg">
                      Buy Lesson
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p> // Or any other message while data is being fetched
          )}
        </div>
      </div>
    </>
  );
}

export default Cards;
