import React, { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";
import Pagination from "../Components/Pagination";

function Techtip() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const [posts, setPosts] = useState([]);
  const [filteredTechtips, setFilteredTechtips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   <></>;
  // }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    document.body.style.scrollBehavior = "smooth";
    return () => {
      document.body.style.scrollBehavior = "unset";
    };
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get("http://localhost:8080/alltechtips");
        setPosts(response.data);
        setFilteredTechtips(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = filteredTechtips.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <div
        class="text-gray-900 pt-12 pr-0 pb-14 pl-0 w-full "
        style={{ backgroundColor: "#d5c5df " }}
      >
        <div class="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
          <div class="flex flex-col items-center sm:px-5 md:flex-row">
            <div class="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 ">
              <div
                class="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5"
              >
                <div
                  class="bg-indigo-950 flex items-center leading-none rounded-full text-gray-50 pt-1.5 pr-3 pb-1.5 pl-2
              uppercase "
                >
                  <p class="inline">
                    <svg
                      class="w-3.5 h-3.5 mr-1"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0
                  00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755
                  1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1
                  0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </p>
                  <p class="inline text-xs font-medium">New</p>
                </div>
                <p class="text-3xl font-bold leading-none lg:text-4xl xl:text-5xl">
                  Empower Your Tech Journey:
                  <br /> Unleashing Expert Tips and Tricks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto max-w-7x1">
          <div class="flex flex-wrap w-full mb-4 p-4">
            <div class="w-full mb-6 lg:mb-0">
              <h1 class="sm:text-4xl text-5xl font-medium font-bold title-font mb-2 text-gray-900">
                News
              </h1>
              <div class="h-1 w-20 bg-[#522883] rounded"></div>
            </div>
          </div>
          <div data-aos="fade-up" class="flex flex-wrap -m-4 mb-6">
            {currentCards.length > 0 ? (
              currentCards.map((post, index) => (
                <div
                  key={index}
                  class="xl:w-1/3 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full p-2"
                >
                  <div class="bg-[#d5c5df] p-6 rounded-lg border border-solid shadow-lg min-h-[400px] lg:min-h-[450px] transform hover:scale-105 transition duration-500">
                    <img
                      class="h-64 lg:h-48 md:h-48 sm:h-48 w-full object-cover object-center mb-4 rounded-lg transform hover:scale-100 transition duration-500"
                      src={post.image}
                      alt="Image_Size"
                    />
                    <Link to={`/TipDetail/${post.id}`}>
                      <button>
                        <h2 class="tracking-widest text-[#522883] text-xl font-medium text-left title-font mb-2 lg:mb-3">
                          {post.title}
                        </h2>
                      </button>
                    </Link>
                    <p class="leading-relaxed text-sm">{post.short_detail}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full my-4">
                <div className="bg-[#d5c5df] rounded-lg p-4 border border-solid">
                  <p className="text-base text-indigo-950 mb-2">
                    No Techtips found.
                  </p>
                  <p className="text-xs text-indigo-950">
                    Please try a different keyword or check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            cardsPerPage={cardsPerPage}
            totalCards={filteredTechtips.length}
            paginate={paginate}
            handlePageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
}

export default Techtip;
