import React from 'react';
import sluLogo from '../assets/slu-logo-blue.png'; // Import the image
import "@fontsource/crimson-pro/700.css"; // 700 = bold
// First component: Request Info, Visit, Apply
function ActionButtons() {
  return (
    <div className="bg-[#003DA5] p-4 h-[60px] flex gap-4 justify-end items-center">
      <div className="flex gap-0 l-[1194px] px-0">
        <button className="font-['Crimson_Pro'] text-white font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
          Request Info
        </button>
        <button className="font-['Crimson_Pro'] text-white font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
          Visit
        </button>
        <button className="font-['Crimson_Pro'] text-white font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
          Apply
        </button>
      </div>
    </div>
  );
}

// Second component: SLU Logo, Regions, Partners, Analytics, Industries
function MainNav() {
  return (
    <div className="flex py-0 items-center justify-between px-[3%]">
      <img src={sluLogo} alt="SLU Logo" className="h-35 w-auto" />
      <div className="flex items-center gap-4 pr-8">
        <button className="font-['Crimson_Pro'] text-blue-900 font-semibold hover:underline">Regions</button>
        <button className="font-['Crimson_Pro'] text-blue-900 font-semibold hover:underline">Partners</button>
        <button className="font-['Crimson_Pro'] text-blue-900 font-semibold hover:underline">Analytics</button>
        <button className="font-['Crimson_Pro'] text-blue-900 font-semibold hover:underline">Industries</button>
      </div>
    </div>
  );
}

// Navbar combines both components
export default function Navbar() {
  return (
    <nav className="w-full flex flex-col items-stretch shadow">
      <ActionButtons />
      <MainNav />
    </nav>
  );
}