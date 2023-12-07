import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useCookies } from "react-cookie";

function ProfilePass() {
  const [userPass, setUserPass] = useState({
    oldpassword: "",
    newpassword: "",
  });
  
  const [cookies] = useCookies(["token"]);
  const token = cookies.Token;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserPass({ ...userPass, [name]: value });
  };
  
  const handleUpdate = async () => {
    try {
      if (!token) {
        console.error("Token not available.");
        return;
      }

      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.put(
        "http://localhost:8080/myprofile/updatepassword",
        userPass
      );

      console.log("User data updated!", response.data);
    } catch (error) {
      console.error("Error updating user data:", error.response);
    }
  };


 
  

  return (
    <>
      <form className="w-full mt-10 max-w-lg mx-auto">
        <div className="md:flex flex-col md:justify-center md:items-start mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-indigo-950 font-bold mb-1 md:mb-0 pr-4 text-right md:text-left"
              htmlFor="inline-oldPassword"
            >
              Old Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-950"
              id="oldpassword"
              type="password"
              name = "oldpassword"
              placeholder="******************"
              value={userPass.oldpassword}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex flex-col md:justify-center md:items-start mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-indigo-950 font-bold mb-1 md:mb-0 pr-4 text-right md:text-left"
              htmlFor="inline-newPassword"
            >
              New Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-950"
              id="newpassword"
              type="password"
              name="newpassword"
              placeholder="******************"
              value={userPass.newpassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6"></div>
        <div className="md:flex flex-col  md:items-start">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 text-center">
            <button
              className="flex-col md:items-start bg-indigo-950 hover:bg-indigo-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleUpdate}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ProfilePass;
