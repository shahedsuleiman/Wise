import React from "react";
import Stats from "./Stats";
import Users from "./Users";
import CoursesTable from "./CoursesTable";
import Workshops from "./Workshops";
import Techtips from "./Techtips";

function Tables() {
  return (
    <>
      <Stats />
      <Users />
      <CoursesTable />
      <Workshops />
      <Techtips />
    </>
  );
}

export default Tables;
