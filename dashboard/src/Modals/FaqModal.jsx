import React, { useState } from "react";
import axios from "axios";

function FaqModal({ faq, closeModal, updateFaq }) {
  const [updatedFaq, setUpdatedFaq] = useState(
    faq || {
      question: "",
      answer: "",
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFaq({ ...updatedFaq, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      if (!faq || !faq.id) {
        console.error("Invalid techtip object:", faq);
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/dashboard/faq/${faq.id}/update`,
        updatedFaq
      );

      updateFaq(response.data.faq);

      closeModal();
    } catch (error) {
      console.error("Error updating techtip:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur backdrop-filter   bg-black bg-opacity-30">
      <div className="bg-white rounded-lg w-full sm:w-96 shadow-lg p-6 max-h-[80vh] overflow-y-auto  scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-indigo-950 scrollbar-track-indigo-100">
        <h2 className="text-xl font-semibold mb-4"> Edit Faq</h2>

        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Question</label>
          <input
            type="text"
            name="title"
            value={updatedFaq.question}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Answer</label>
          <textarea
            name="answer"
            value={updatedFaq.answer}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 mb-2 w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="bg-indigo-950 text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-900"
          >
            Update
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FaqModal;
