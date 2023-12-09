import React, { useState } from "react";
import logo2 from "../Assets/logo2.png";
import Stats from "./Stats";
import Users from "./Users";
import CoursesTable from "./CoursesTable";
import Workshops from "./Workshops";
import Techtips from "./Techtips";
import Tables from "./Tables";

function SidebarDash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <>
      <div>
        <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div
            class="flex flex-col flex-grow  overflow-y-auto "
            style={{ backgroundColor: "#F7F1EE " }}
          >
            <div class="flex items-center flex-shrink-0 px-2">
              <img class="h-25 w-45" src={logo2} alt="WiseAssist" />
            </div>
            <hr />
            <div
              class=" flex-1 flex flex-col "
              style={{ backgroundColor: "#F7F1EE " }}
            >
              <nav class="flex-1 px-2 pb-4 ">
                <button
                  className={`text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2   w-full text-sm font-medium rounded-md 
                  ${
                    activeTab === "dashboard"
                      ? "bg-indigo-950 text-white"
                      : "#F7F1EE"
                  }`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Dashboard
                </button>

                <button
                  className={`text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2   w-full text-sm font-medium rounded-md 
                  ${
                    activeTab === "users"
                      ? "bg-indigo-950 text-white"
                      : "#F7F1EE"
                  }`}
                  onClick={() => setActiveTab("users")}
                >
                  Users
                </button>

                <button
                  className={`text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2   w-full text-sm font-medium rounded-md 
                   ${
                     activeTab === "courses"
                       ? "bg-indigo-950 text-white"
                       : "#F7F1EE"
                   }`}
                  onClick={() => setActiveTab("courses")}
                >
                  Courses
                </button>

                <button
                  className={`text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2   w-full text-sm font-medium rounded-md 
                  ${
                    activeTab === "workshops"
                      ? "bg-indigo-950 text-white"
                      : "#F7F1EE"
                  }`}
                  onClick={() => setActiveTab("workshops")}
                >
                  Workshops
                </button>

                <button
                  className={`text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2   w-full text-sm font-medium rounded-md 
                  ${
                    activeTab === "techtips"
                      ? "bg-indigo-950 text-white"
                      : "#F7F1EE"
                  }`}
                  onClick={() => setActiveTab("techtips")}
                >
                  TechTips
                </button>

                <button class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md">
                  Lessons
                </button>
                <button class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full  text-sm font-medium rounded-md">
                  Faq
                </button>
                <button class="text-indigo-950 hover:bg-indigo-950 hover:text-white group flex items-center px-5 py-2  w-full text-sm font-medium rounded-md">
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </div>
        <div class="md:pl-64 flex flex-col flex-1">
          <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            >
              <span class="sr-only">Open sidebar</span>

              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
          </div>

          <main>
            <div class="py-6">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* {activeTab === "userProfile" && <PublecProfile />} */}
                {activeTab === "dashboard" && <Tables />}
                {activeTab === "users" && <Users />}
                {activeTab === "courses" && <CoursesTable />}
                {activeTab === "workshops" && <Workshops />}
                {activeTab === "techtips" && <Techtips />}
                {/* <Stats />
                <Users />
                <CoursesTable />
                <Workshops />
                <Techtips /> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default SidebarDash;
