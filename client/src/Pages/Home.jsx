import React from "react";
import Intro from "../Components/Home/Intro";
import Service from "../Components/Home/Service";
import Feature from "../Components/Home/Feature";
import Experience from "../Components/Home/Experience";

const Home = () => {
  return (
    <div className="pb-10">
      <Intro />
      <Service />
      <Feature />
      <Experience />
    </div>
  );
};

export default Home;
