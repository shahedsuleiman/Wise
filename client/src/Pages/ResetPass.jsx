import React, { useState } from "react";
import axios from "axios";

function ResetPass() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      if (newPassword === confirmPassword) {
        const response = await axios.put(
          "http://localhost:8080/resetpassword",
          { email, newPassword }
        );

        if (response.status === 200) {
          setResetSuccess(true);
        } else {
          setErrorMessage("Password reset failed.");
        }
      } else {
        setErrorMessage("Passwords do not match.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong.");
    }
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handlePasswordReset}
          >
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john@gmail.com"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 block w-full p-2.5 "
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-950 focus:border-indigo-950 block w-full p-2.5 "
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {resetSuccess && (
              <p className="text-green-500">Password reset successful!</p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button
              type="submit"
              class="w-full text-white bg-indigo-950 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPass;
