import React from 'react';
import sluLogo from '../assets/slu-logo-blue.png'; // Import the image
// First component: Request Info, Visit, Apply
function ActionButtons() {
  return (
    <div className="bg-blue-900 p-4 flex gap-4 justify-end items-center">
      <button className="text-white font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
        Request Info
      </button>
      <button className="text-white font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
        Visit
      </button>
      <button className="text-white font-bold py-2 px-4 rounded hover:bg-gray-200 transition">
        Apply
      </button>
    </div>
  );
}

// Second component: SLU Logo, Regions, Partners, Analytics, Industries
function MainNav() {
  return (
    <div className="flex py-0 items-center justify-between w-full">
      <img src={sluLogo} alt="SLU Logo" className="h-35 w-auto" />
      <div className="flex items-center gap-4 pr-8">
        <button className="text-blue-900 font-semibold hover:underline">Regions</button>
        <button className="text-blue-900 font-semibold hover:underline">Partners</button>
        <button className="text-blue-900 font-semibold hover:underline">Analytics</button>
        <button className="text-blue-900 font-semibold hover:underline">Industries</button>
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