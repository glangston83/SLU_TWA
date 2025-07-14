import Navbar from "./Navbar";
import React from "react";
import regionsImg from "../assets/USA-flag-map.png";
import TWAImmg from "../assets/Tranformative workforce academy image.png"; // Import the TWA logo
import checker from "../assets/Checker.svg"; // Import the checker image
import "@fontsource/crimson-pro/700.css"; 
import partnerImg from "../assets/partner.png"; // Import the partner image
import jobFairImg from "../assets/job_fair.png"; // Import the job_seeker image
function InfoBox({ image, title, content }) {
  return (
    <div className="bg-white rounded shadow flex flex-col items-start text-center w-[352px] h-[300px]">
      <img src={image} alt={title} className="reative h-[55%] w-full" />
      <h3 className="flex font-normal font-['Crimson_Pro'] pl-[4%] pt-[5%] pb-[3%] text-[#003DA5] mb-1">{title}</h3>
      <p className="font-['Crimson_Pro'] px-[4%] text-black text-sm">{content}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full  py-0 grid gap-0">
        {/* Column 1 */}
        <div className="flex flex-col items-center h-full">
          <img
            src={TWAImmg} alt="background"
            className="flex inset-0 w-full"
            />
        </div>
        {/* Column 2 */}
        <div className="flex flex-col py-8 px-0 items-center">
          <h2 className="text-[2rem] font-['Crimson_Pro'] font-regular font-normal text-[#003DA5] mb-4 text-center">Connecting Justice-Involved Jobseekers and Second Chance Employers</h2>
            <p className="text-[1rem] font-['Crimson_Pro'] px-[20%] text-regular text-black text-center mb-4">
TWA connects justice-involved individuals with fair-chance employers. Also referred to as second-chance employers, these are
 businesses and organizations that are willing to look past the person’s record to the talent the jobseeker has to offer. Some fair 
 chance employers can hire people with any criminal background while others must be more selective based on a variety of factors.</p>
        </div>
        {/* Column 3 */}
        <div
        className="relative flex flex-col items-center h-[400px] w-full "
        style={{
          backgroundImage: `url(${checker})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgrountImageOpacity: 0.5,
          z: 0
          }}
        >

          <div>
            <h2 className="text-[2rem] font-['Crimson_Pro'] font-normal text-black mb-4 text-center">Get connected with the TWA</h2>
          </div>
          <hr className=" border-[#003DA5] h-[80%] w-[10%]" />
          <div className="flex px-[10%] flex-row gap-[10%]">
            <InfoBox
              image={regionsImg}
              title="Regions"
              content="Connect with our services throughout US."
            />
            <InfoBox
              image={partnerImg}
              title="Partners"
              content="Find out how to partner, volunteer or support."
            />
            <InfoBox
              image={jobFairImg}
              title="Job Fair"
              content="Job Seekers can find programs that can help them."
            />
          </div>
        </div>
      </div>
    </>
  );
}
