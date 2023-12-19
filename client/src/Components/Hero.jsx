import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import hero1 from "../assets/hero.png";

function Hero() {
  return (
    <div className="py-8 lg:bg-gradient-to-r from-white via-white to-customPink   md:bg-gradient-to-r from-white via-white to-customPink  ">
      <header class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-10 text-indigo-900 md:mx-auto md:flex-row md:items-center"></header>

      <div class="mx-auto  px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div class="flex flex-col items-center justify-between lg:flex-row">
          <div class="lg:max-w-lg lg:pr-5">
            <div class="max-w-xl">
              <h2 class="mb-6 max-w-lg text-4xl font-bold leading-snug tracking-tight text-indigo-900sm:text-5xl sm:leading-snug">
                Welcome to
                <span class="inline-block font-serif font-extrabold text-indigo-900 ml-2">
                  WiseAssist!
                </span>
              </h2>
              <p class="text-base text-gray-700">
                Thank you for choosing WiseAssist. We look forward to being your
                trusted partner on your tech journey. Let's navigate the digital
                landscape together!".
              </p>

              <div class="mt-8 sm:flex space-y-3 sm:space-y-0 sm:space-x-3">
                <div class="relative overflow-hidden rounded-xl border-4 border-indigo-900 bg-white shadow">
                  <div class="py-10 px-6">
                    <div class="flex items-center">
                      <h3 class="relative ml-2 inline-block text-4xl font-bold leading-none">
                        328
                      </h3>
                      <span class="ml-3 text-base font-medium capitalize">
                        Great Achievements
                      </span>
                    </div>
                  </div>
                </div>

                <div class="relative overflow-hidden rounded-xl border-4 border-indigo-900 bg-white shadow">
                  <div class="py-10 px-6">
                    <div class="flex items-center">
                      <h3 class="relative ml-2 inline-block text-4xl font-bold leading-none">
                        16
                      </h3>
                      <span class="ml-3 text-base font-medium capitalize">
                        Graduations sponsored
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="relative text-indigo-900 lg:ml-32 lg:w-1/2 hidden lg:block">
            <div class="border-b-8 border-b-indigo-900 max-w-lg mx-auto mb-10">
              <img class="w-full h-full object-contain" src={hero1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
