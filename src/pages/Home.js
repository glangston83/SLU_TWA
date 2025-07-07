import Navbar from "./Navbar";
import React from "react";
import regionsImg from "../assets/USA-flag-map.png";
import partnersImg from "../assets/USA-flag-map.png";
import jobsImg from "../assets/USA-flag-map.png";
import bgImg from "../assets/USA-flag-map.png"; // Import your transparent image

function InfoBox({ image, title, content }) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center text-center">
      <img src={image} alt={title} className="h-16 w-16 mb-2" />
      <h3 className="font-bold text-blue-900 mb-1">{title}</h3>
      <p className="text-gray-700 text-sm">{content}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full px-8 py-8 grid grid-cols-1 gap-8">
        {/* Column 1 */}
        <div className="relative flex flex-col items-center h-60">
          {/* Transparent background image for only column 1 */}
          <img
            src={bgImg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none rounded"
            style={{ zIndex: 0 }}
          />
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex-1 flex items-center justify-center h-full relative z-10 text-center">
            Transformative Workforce<br></br> Academy
          </h2>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">
            Connecting Justice Involved Jobseekers and second Change Employers
          </h2>
            <p className="text-gray-700 text-center mb-4">
    We bridge the gap between justice-involved individuals seeking meaningful employment and employers committed to offering second chances.Our network provides resources, support, and opportunities for jobseekers to rebuild their futures.Together, we foster inclusive workplaces and stronger communities through transformative workforce solutions.
  </p>
        </div>
        {/* Column 3 */}
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">
            Get Connected with TWA
          </h2>
          <div className="flex flex-row gap-4">
            <InfoBox
              image={regionsImg}
              title="Regions"
              content="Explore workforce opportunities by region and connect with local resources."
            />
            <InfoBox
              image={partnersImg}
              title="Partners"
              content="Meet our partners who support justice-involved individuals and workforce development."
            />
            <InfoBox
              image={jobsImg}
              title="Jobs"
              content="Find job openings and career support through the TWA network."
            />
          </div>
        </div>
      </div>
    </>
  );
}
