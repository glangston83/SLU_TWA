// import Navbar from "./Navbar";
import React from "react";
import regionsImg from "../assets/USA-flag-map.png";
import TWAImmg from "../assets/Tranformative workforce academy image.png"; // Import the TWA logo
import checker from "../assets/Checker.svg"; // Import the checker image
// import "@fontsource/crimson-pro/700.css"; 
import partnerImg from "../assets/partner.png"; // Import the partner image
import jobFairImg from "../assets/job_fair.png"; // Import the job_seeker image
function InfoBox({ image, title, content, route }) {
  return (
    <a href={route} className="no-underline">
      <div className="bg-white rounded shadow grid grid-rows-[55%_auto_auto] items-start text-center w-[352px] h-[300px]">
        <img src={image} alt={title} className="h-full w-full" />
        <h3 className="font-normal font-['Crimson_Pro'] pl-[4%] pt-[5%] pb-[3%] text-[#003DA5] mb-1">{title}</h3>
        <p className="font-['Crimson_Pro'] px-[4%] text-black text-sm">{content}</p>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full py-0 grid gap-0 grid-rows-3">
        {/* Column 1 */}
        <div className="grid place-items-center h-full">
          <img
            src={TWAImmg} alt="background"
            className="inset-0 w-full"
          />
        </div>
        {/* Column 2 */}
        <div className="grid py-8 px-0 place-items-center">
          <h2 className="text-[2rem] font-['Crimson_Pro'] font-regular font-normal text-[#003DA5] mb-4 text-center">Connecting Justice-Involved Jobseekers and Second Chance Employers</h2>
          <p className="text-[1rem] font-['Crimson_Pro'] px-[20%] text-regular text-black text-center mb-4">
            TWA connects justice-involved individuals with fair-chance employers. Also referred to as second-chance employers, these are
            businesses and organizations that are willing to look past the person’s record to the talent the jobseeker has to offer. Some fair
            chance employers can hire people with any criminal background while others must be more selective based on a variety of factors.</p>
        </div>
        {/* Column 3 */}
        <div
          className={
            `relative grid place-items-center h-[400px] w-full bg-[url('${checker}')] bg-cover bg-center bg-no-repeat`
          }
        >
          <div>
            <h2 className="text-[2rem] font-['Crimson_Pro'] font-normal text-black mb-4 text-center">Get connected with the TWA</h2>
          </div>
          <hr className=" border-[#003DA5] h-[4px] w-[30%] m-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-2 px-[5%] w-full justify-items-center">
            <InfoBox
              image={regionsImg}
              title="Regions"
              content="Connect with our services throughout US."
              route="/regions"
            />
            <InfoBox
              image={partnerImg}
              title="Partners"
              content="Find out how to partner, volunteer or support."
              route="/partners"
            />
            <InfoBox
              image={jobFairImg}
              title="Job Fair"
              content="Job Seekers can find programs that can help them."
              route="/job-fair"
            />
          </div>
        </div>
      </div>
    </>
  );
}