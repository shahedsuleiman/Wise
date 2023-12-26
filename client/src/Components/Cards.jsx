import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Cards() {
  const [courseData, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/home/allcourses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="mt-20 my-8 lg:my-10 lg:mt-20 container px-6 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-gray-300">
        <div>
          <h3 className=" font_heading text-4xl leading-tight text-[#522883] dark:text-gray-100">
            Check our Latest Courses
          </h3>
        </div>
        <div className="mt-6 md:mt-0 px-6">
          <button className="linear rounded-[20px] bg-indigo-950 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-indigo-900 active:bg-brand-700">
            View All
          </button>
        </div>
      </div>
      <div className="bg-white flex justify-center items-center py-6 md:w-full   ">
        <div className="container mx-auto px-4 ">
          <Slider {...settings}>
            {courseData && courseData.courses ? (
              courseData.courses.map((course) => (
                <div
                  key={course.id}
                  className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 border border-solid p-10"
                  // style={{ width: "300px", minHeight: "400px" }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      className="w-full h-48 rounded-xl object-cover mb-4"
                      src={course.image}
                      alt={course.title}
                    />
                  </div>
                  <h1 className="text-gray-800 text-xl font-bold cursor-pointer h-16">
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
                    <Link
                      to={
                        course.category.toLowerCase() === "online"
                          ? `/courseDetails/${course.id}`
                          : `/onsiteCourseDetails/${course.id}`
                      }
                    >
                      <button className="mt-4 text-xl w-full text-white bg-indigo-950 py-2 rounded-xl shadow-lg">
                        Buy Lesson
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Cards;
