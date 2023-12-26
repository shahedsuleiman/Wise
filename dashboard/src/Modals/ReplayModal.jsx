import React, { useState } from "react";
import axios from "axios";

const ReplyModal = ({ closeModal, onUpdateAnswer }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    try {
      // Perform the API call to update the FAQ answer
      const response = await axios.post(
        "http://localhost:8080/dashboard/addfaq",
        {
          question: question,
          answer: answer,
        }
      );

      // Assuming the API call was successful, update the answer in the table
      onUpdateAnswer(response.data); // Update with the actual response from the server
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      // Handle error scenarios here
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-20">
        <h2 className="text-lg font-semibold mb-4">Reply to FAQ:</h2>
        <div>
          <label
            htmlFor="question"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Question:
          </label>
          <input
            type="text"
            id="question"
            className="w-full border rounded-md p-2 mb-4"
            placeholder="Enter the question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="answer"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Answer:
          </label>
          <textarea
            id="answer"
            className="w-full border rounded-md p-2 mb-4"
            rows="4"
            placeholder="Write your reply here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-white border border-solid border-indigo-950 text-indigo-950 px-4 py-2 rounded-md"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
