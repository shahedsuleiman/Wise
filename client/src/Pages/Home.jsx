import React, { useState } from "react";

import Hero from "../Components/Hero";
// import OurPurpose from "../Components/OurPurpose";
// import OurServices from "../Components/OurServices";
import Cards from "../Components/Cards";
import RecentWorkshops from "../Components/RecentWorkshops";
import Guide from "../Components/Guide";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ChatBot from "../Components/ChatBot";

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Cards />
      <RecentWorkshops />
      <Guide />
      <ChatBot />

      <Footer />
    </div>
  );
}

export default Home;
