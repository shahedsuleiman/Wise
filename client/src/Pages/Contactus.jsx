import React, { useState, useEffect } from "react";
import axios from "axios";
import contact from "../assets/contact.jpg";
import Faq from "../Components/Faq";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function Contactus() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);

  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);

  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      console.log(questions.id);
      const response = await axios.get("http://localhost:8080/faq/all");
      console.log(response.data);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchAnswer = async (questionId) => {
    try {
      console.log(questionId);
      const response = await axios.get(
        `http://localhost:8080/faq/${questionId}/answer`
      );
      console.log(response.data);
      setAnswer(response.data[0].answer);
      return response.data[0].answer;
    } catch (error) {
      console.error(`Error fetching answer for question ${questionId}:`, error);
      return "Failed to fetch answer";
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const submitQuestion = async () => {
    try {
      console.log("Submitting question:", question);
      axios.defaults.headers.common["Authorization"] = token;
      await axios.post(`http://localhost:8080/faq/addquestion`, { question });
      setQuestion("");
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <>
      <div
        className="w-full  dark:bg-gray-500 py-10 "
        style={{
          width: "100%",
          backgroundImage: `url(${contact})`,
          backgroundPosition: "center center",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0">
          <div className="bg-gradient-to-b from-indigo-950 via-transparent to-transparent h-[45rem]"></div>
        </div>
        <div className="container py-24 h-[20rem] sm:h-[22rem]  flex flex-col sm:flex-col md:flex-col  flex-wrap content-center justify-center ">
          <h1 className=" z-10 text-5xl py-5 antialiased font-semibold leadi text-center text-white">
            How May We Help You?
          </h1>

          <div className="flex flex-row z-10">
            <input
              type="text"
              placeholder="Ask Us :)"
              className="w-full sm:w-2/3 p-3 rounded-l-lg "
              fdprocessedid="j22ud"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              type="button"
              className="w-full sm:w-1/3 p-3 font-semibold bg-indigo-950 text-white  rounded-r-lg "
              fdprocessedid="8d0pnm"
              onClick={submitQuestion}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Faq questions={questions} fetchAnswer={fetchAnswer} />
    </>
  );
}

export default Contactus;
