import React, { useState, useRef, useEffect } from "react";
import regionsImg from "../assets/USA-flag-map.png";
import stl__img from "../assets/saint_louis_img.png";
export default function Regions() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (showEditModal && dialog) {
      dialog.showModal();
    } else if (!showEditModal && dialog) {
      dialog.close();
    }
  }, [showEditModal]);

  // Function to handle camera capture
  const handleTakePhoto = async () => {
    try {
      // Check if the browser supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Camera access is not supported in this browser');
        return;
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });

      // Create a video element to show camera preview
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;
      
      // Create a modal for camera preview
      const cameraModal = document.createElement('div');
      cameraModal.className = 'fixed inset-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center z-[999999]';
      
      video.className = 'max-w-[90%] max-h-[70%] rounded-lg';
      
      // Create capture button
      const captureBtn = document.createElement('button');
      captureBtn.textContent = 'Capture Photo';
      captureBtn.className = 'mt-5 px-6 py-3 bg-[#003DA5] text-white border-0 rounded-lg text-base cursor-pointer hover:bg-blue-700 transition-colors';
      
      // Create cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.className = 'mt-3 px-6 py-3 bg-gray-500 text-white border-0 rounded-lg text-base cursor-pointer hover:bg-gray-600 transition-colors';
      
      cameraModal.appendChild(video);
      cameraModal.appendChild(captureBtn);
      cameraModal.appendChild(cancelBtn);
      document.body.appendChild(cameraModal);

      // Hide dialog when camera opens
      if (dialogRef.current) {
        dialogRef.current.close();
      }

      // Handle capture
      captureBtn.onclick = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        // Convert to blob and set as captured image
        canvas.toBlob((blob) => {
          // Create object URL for preview and store it
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);
          console.log('Photo captured successfully:', imageUrl);
        }, 'image/jpeg', 0.8);
        
        // Stop camera and close modal
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(cameraModal);
        
        // Show dialog again after capture
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      };
      
      // Handle cancel
      cancelBtn.onclick = () => {
        stream.getTracks().forEach(track => track.stop());
        document.body.removeChild(cameraModal);
        
        // Show dialog again after cancel
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      };
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      
      if (error.name === 'NotAllowedError') {
        alert('Camera access was denied. Please allow camera access and try again.');
      } else if (error.name === 'NotFoundError') {
        alert('No camera found on this device.');
      } else {
        alert('Error accessing camera: ' + error.message);
      }
    }
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create object URL for file preview
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      console.log('File selected:', file.name);
    }
  };
  const regions = [
    {
      name: "New York",
      cities: [
        { name: "New York City", image: stl__img ,industries: ["Finance", "Technology", "Media"], individuals: 2500 },
        { name: "Albany", image: stl__img ,industries: ["Government", "Healthcare"], individuals: 800 },
        { name: "Buffalo", image: stl__img ,industries: ["Manufacturing", "Healthcare"], individuals: 650 }
      ]
    },
    {
      name: "Massachusetts",
      cities: [
        { name: "Boston", image: stl__img, industries: ["Technology", "Healthcare", "Education"], individuals: 1800 },
        { name: "Cambridge", image: stl__img, industries: ["Technology", "Biotechnology"], individuals: 1200 }
      ]
    },
    {
      name: "Pennsylvania",
      cities: [
        { name: "Philadelphia", image: stl__img, industries: ["Healthcare", "Manufacturing", "Finance"], individuals: 1600 },
        { name: "Pittsburgh", image: stl__img, industries: ["Technology", "Healthcare"], individuals: 1100 }
      ]
    },
    {
      name: "Georgia",
      cities: [
        { name: "Atlanta", image: stl__img, industries: ["Technology", "Transportation", "Finance"], individuals: 2200 },
        { name: "Savannah", image: stl__img, industries: ["Logistics", "Tourism"], individuals: 700 }
      ]
    },
    {
      name: "Florida",
      cities: [
        { name: "Miami", image: stl__img, industries: ["Finance", "Tourism", "International Trade"], individuals: 1900 },
        { name: "Orlando", image: stl__img, industries: ["Tourism", "Technology"], individuals: 1000 }
      ]
    },
  ];

  return (
    <div className="min-h-screen grid grid-rows">
      {/* Section 1: Background Image with Quote */}
      <div className="relative flex items-center justify-center h-[40vh] min-h-[30%] bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 max-h-full"
          style={{
            backgroundImage: `url(${regionsImg})`
          }}
        ></div>
        <div className="relative text-center text-[#003DA5] px-8 py-12">
          <h1 className="text-4xl text-5xl font-bold mb-2 font-['Crimson_Pro']">
            There are hundreds of people waiting for a second chance.
          </h1>
        </div>
      </div>

      {/* Section 2: List of Regions */}
      <div className="bg-white py-6 px-3 flex flex-col justify-center min-h-[50vh] overflow-y-auto">
        <div className="max-w-full mx-auto w-full">
          <div className="flex justify-between items-center mb-8">
            <div className="relative">
              <button className="bg-white text-[#003DA5] border-2 border-[#003DA5] px-6 py-2 rounded-lg hover:bg-[#003DA5] hover:text-white transition-colors duration-200 font-medium flex items-center gap-2">
                All Regions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <button 
              onClick={() => setShowEditModal(true)}
              className="bg-white text-[#003DA5] px-6 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200 font-medium flex items-center gap-2 border-2 border-[#003DA5]"
            >
               Edit 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21V16.75L16.2 3.575C16.4 3.39167 16.6208 3.25 16.8625 3.15C17.1042 3.05 17.3583 3 17.625 3C17.8917 3 18.15 3.05 18.4 3.15C18.65 3.25 18.8667 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.7708 5.4 20.8625 5.65C20.9542 5.9 21 6.15 21 6.4C21 6.66667 20.9542 6.92083 20.8625 7.1625C20.7708 7.40417 20.625 7.625 20.425 7.825L7.25 21H3ZM17.6 7.8L19 6.4L17.6 5L16.2 6.4L17.6 7.8Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          <div className="space-y-8 w-full p-2 ">
            {regions.map((state, index) => (
              <div 
                key={index}
                className="p-3 bg-white rounded shadow-md hover:shadow-lg transition-shadow duration-300 w-full"
              >
                <h3 className="text-xl font-semibold text-[#003DA5] mb-4">
                  {state.name}
                </h3>
                
                {/* Cities as columns */}
                <div className="grid bg-white grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {state.cities.map((city, cityIndex) => (
                    <div key={cityIndex} className="p-0 bg-black-500 w-[70%] h-[100%] rounded border hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col items-center text-left mb-3">
                        {city.image && (
                          <img 
                            src={city.image} 
                            alt={city.name}
                            className="w-full h-[75%] object-fill object-cover mb-2"
                          />
                        )}
                      </div>
                      
                      <div className="font-medium text-blue-800 text-sm justify-left flex items-center gap-2 mb-2 px-2">
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C11.7667 22 11.5667 21.9333 11.4 21.8C11.2333 21.6667 11.1083 21.4917 11.025 21.275C10.7083 20.3417 10.3083 19.4667 9.825 18.65C9.35833 17.8333 8.7 16.875 7.85 15.775C7 14.675 6.30833 13.625 5.775 12.625C5.25833 11.625 5 10.4167 5 9C5 7.05 5.675 5.4 7.025 4.05C8.39167 2.68333 10.05 2 12 2C13.95 2 15.6 2.68333 16.95 4.05C18.3167 5.4 19 7.05 19 9C19 10.5167 18.7083 11.7833 18.125 12.8C17.5583 13.8 16.9 14.7917 16.15 15.775C15.25 16.975 14.5667 17.975 14.1 18.775C13.65 19.5583 13.275 20.3917 12.975 21.275C12.8917 21.5083 12.7583 21.6917 12.575 21.825C12.4083 21.9417 12.2167 22 12 22ZM12 11.5C12.7 11.5 13.2917 11.2583 13.775 10.775C14.2583 10.2917 14.5 9.7 14.5 9C14.5 8.3 14.2583 7.70833 13.775 7.225C13.2917 6.74167 12.7 6.5 12 6.5C11.3 6.5 10.7083 6.74167 10.225 7.225C9.74167 7.70833 9.5 8.3 9.5 9C9.5 9.7 9.74167 10.2917 10.225 10.775C10.7083 11.2583 11.3 11.5 12 11.5Z" fill="#003DA5"/>
                      </svg>
                        {city.name}</div>

                      <div className="flex flex-wrap gap-1 justify-left text-xs text-gray-600 mb-2 px-2 text-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 18V16H16V18H3ZM19.6 17L14.6 12L19.6 7L21 8.4L17.4 12L21 15.6L19.6 17ZM3 13V11H13V13H3ZM3 8V6H16V8H3Z" fill="#1D1B20"/>
                        </svg>

                        {city.industries.length > 0 ? city.industries.length : 0} Industries
                      </div>
                      
                      <div className="text-xs text-gray-600 justify-left flex items-center gap-2 mb-2 px-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 16.6666V14.3541C0 13.8819 0.118056 13.4444 0.354167 13.0416C0.590278 12.6389 0.916667 12.3333 1.33333 12.125C1.52778 12.0278 1.71528 11.9375 1.89583 11.8541C2.09028 11.7708 2.29167 11.6944 2.5 11.625V16.6666H0ZM3.33333 10.8333C2.63889 10.8333 2.04861 10.5903 1.5625 10.1041C1.07639 9.61804 0.833333 9.02776 0.833333 8.33331C0.833333 7.63887 1.07639 7.04859 1.5625 6.56248C2.04861 6.07637 2.63889 5.83331 3.33333 5.83331C4.02778 5.83331 4.61806 6.07637 5.10417 6.56248C5.59028 7.04859 5.83333 7.63887 5.83333 8.33331C5.83333 9.02776 5.59028 9.61804 5.10417 10.1041C4.61806 10.5903 4.02778 10.8333 3.33333 10.8333ZM3.33333 9.16665C3.56944 9.16665 3.76389 9.09026 3.91667 8.93748C4.08333 8.77081 4.16667 8.56942 4.16667 8.33331C4.16667 8.0972 4.08333 7.90276 3.91667 7.74998C3.76389 7.58331 3.56944 7.49998 3.33333 7.49998C3.09722 7.49998 2.89583 7.58331 2.72917 7.74998C2.57639 7.90276 2.5 8.0972 2.5 8.33331C2.5 8.56942 2.57639 8.77081 2.72917 8.93748C2.89583 9.09026 3.09722 9.16665 3.33333 9.16665ZM3.33333 16.6666V14.3333C3.33333 13.8611 3.45139 13.4305 3.6875 13.0416C3.9375 12.6389 4.26389 12.3333 4.66667 12.125C5.52778 11.6944 6.40278 11.375 7.29167 11.1666C8.18056 10.9444 9.08333 10.8333 10 10.8333C10.9167 10.8333 11.8194 10.9444 12.7083 11.1666C13.5972 11.375 14.4722 11.6944 15.3333 12.125C15.7361 12.3333 16.0556 12.6389 16.2917 13.0416C16.5417 13.4305 16.6667 13.8611 16.6667 14.3333V16.6666H3.33333ZM5 15H15V14.3333C15 14.1805 14.9583 14.0416 14.875 13.9166C14.8056 13.7916 14.7083 13.6944 14.5833 13.625C13.8333 13.25 13.0764 12.9722 12.3125 12.7916C11.5486 12.5972 10.7778 12.5 10 12.5C9.22222 12.5 8.45139 12.5972 7.6875 12.7916C6.92361 12.9722 6.16667 13.25 5.41667 13.625C5.29167 13.6944 5.1875 13.7916 5.10417 13.9166C5.03472 14.0416 5 14.1805 5 14.3333V15ZM10 9.99998C9.08333 9.99998 8.29861 9.67359 7.64583 9.02081C6.99306 8.36803 6.66667 7.58331 6.66667 6.66665C6.66667 5.74998 6.99306 4.96526 7.64583 4.31248C8.29861 3.6597 9.08333 3.33331 10 3.33331C10.9167 3.33331 11.7014 3.6597 12.3542 4.31248C13.0069 4.96526 13.3333 5.74998 13.3333 6.66665C13.3333 7.58331 13.0069 8.36803 12.3542 9.02081C11.7014 9.67359 10.9167 9.99998 10 9.99998ZM10 8.33331C10.4583 8.33331 10.8472 8.17359 11.1667 7.85415C11.5 7.52081 11.6667 7.12498 11.6667 6.66665C11.6667 6.20831 11.5 5.81942 11.1667 5.49998C10.8472 5.16665 10.4583 4.99998 10 4.99998C9.54167 4.99998 9.14583 5.16665 8.8125 5.49998C8.49306 5.81942 8.33333 6.20831 8.33333 6.66665C8.33333 7.12498 8.49306 7.52081 8.8125 7.85415C9.14583 8.17359 9.54167 8.33331 10 8.33331ZM16.6667 10.8333C15.9722 10.8333 15.3819 10.5903 14.8958 10.1041C14.4097 9.61804 14.1667 9.02776 14.1667 8.33331C14.1667 7.63887 14.4097 7.04859 14.8958 6.56248C15.3819 6.07637 15.9722 5.83331 16.6667 5.83331C17.3611 5.83331 17.9514 6.07637 18.4375 6.56248C18.9236 7.04859 19.1667 7.63887 19.1667 8.33331C19.1667 9.02776 18.9236 9.61804 18.4375 10.1041C17.9514 10.5903 17.3611 10.8333 16.6667 10.8333ZM16.6667 9.16665C16.9028 9.16665 17.0972 9.09026 17.25 8.93748C17.4167 8.77081 17.5 8.56942 17.5 8.33331C17.5 8.0972 17.4167 7.90276 17.25 7.74998C17.0972 7.58331 16.9028 7.49998 16.6667 7.49998C16.4306 7.49998 16.2292 7.58331 16.0625 7.74998C15.9097 7.90276 15.8333 8.0972 15.8333 8.33331C15.8333 8.56942 15.9097 8.77081 16.0625 8.93748C16.2292 9.09026 16.4306 9.16665 16.6667 9.16665ZM17.5 16.6666V11.625C17.7083 11.6944 17.9028 11.7708 18.0833 11.8541C18.2778 11.9375 18.4722 12.0278 18.6667 12.125C19.0833 12.3333 19.4097 12.6389 19.6458 13.0416C19.8819 13.4444 20 13.8819 20 14.3541V16.6666H17.5Z" fill="#1D1B20"/>
                        </svg>
                        {city.individuals} individuals</div>
                      <div className="text-xs text-gray-600 justify-between flex items-center gap-2 mb-2 p-2">
                        <a href="/citydetailpage" className="text-[#003DA5] hover:underline">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_10_1417)">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_10_1417">
                          <rect width="24" height="24" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>
                        </a>
                        <a href="/statistics" className="text-[#003DA5] hover:underline">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 20V10M18 20V4M6 20V16" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </a>

                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#1D1B20"/>
                          </svg>

                      </div>
                    </div>
                  ))}
                </div>


              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <dialog 
        ref={dialogRef}
        className="backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 rounded-lg shadow-2xl border-0 max-w-md w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
        onClose={() => setShowEditModal(false)}
        onClick={(e) => {
          // Close dialog when clicking on backdrop
          if (e.target === dialogRef.current) {
            setShowEditModal(false);
            if (dialogRef.current) {
              dialogRef.current.close();
            }
          }
        }}
      >
        <div className="bg-white rounded-lg p-8 border-2 border-[#003DA5] w-full flex flex-col gap-6">
          <div className="relative flex justify-center items-center mb-6">
            <label className="text-[#003DA5] font-['Crimson_Pro'] font-semibold text-2xl leading-none tracking-normal">
              Add a New State
            </label>
            <button 
              onClick={() => {
                setShowEditModal(false);
                if (dialogRef.current) {
                  dialogRef.current.close();
                }
              }}
              className="absolute right-0 text-gray-500 hover:text-gray-700 transition-colors"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-base font-semibold text-[#003DA5] font-['Crimson_Pro'] mb-3">
                Enter State
              </label>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Enter state name"
                  className="w-full px-4 py-3 border-2 font-['Crimson_Pro'] text-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003DA5] focus:border-[#003DA5] transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-base font-semibold text-[#003DA5] font-['Crimson_Pro'] mb-3">
                Enter Number of Industries
              </label>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Enter Number of Industries"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-['Crimson_Pro'] text-base focus:outline-none focus:ring-2 focus:ring-[#003DA5] focus:border-[#003DA5] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-['Crimson_Pro'] text-[#003DA5] font-semibold mb-3">
                Enter Number of People
              </label>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Enter Number of People"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-['Crimson_Pro'] text-base focus:outline-none focus:ring-2 focus:ring-[#003DA5] focus:border-[#003DA5] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-['Crimson_Pro'] text-[#003DA5] font-semibold mb-3">
                Upload Image
              </label>
              <div className="space-y-3">
                <div className="flex flex-col gap-3">
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-['Crimson_Pro'] text-base focus:outline-none focus:ring-2 focus:ring-[#003DA5] focus:border-[#003DA5] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#003DA5] file:text-white hover:file:bg-blue-700"
                  />
                  <button 
                    type="button"
                    onClick={handleTakePhoto}
                    className="w-full px-4 py-3 border-2 test-base font-['Crimson_Pro'] text-[#003DA5] border-[#003DA5] text-[#003DA5] rounded-lg hover:bg-[#003DA5] hover:text-white transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Take Photo
                  </button>
                </div>
              </div>
              
              {/* Image Preview */}
              {capturedImage && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Selected Image:</p>
                  <div className="relative inline-block">
                    <img 
                      src={capturedImage}
                      alt="Selected"
                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setCapturedImage(null)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-3">
            <button 
              type="button"
              onClick={() => {
                // Handle form submission here
                console.log('Form submitted');
                setShowEditModal(false);
                if (dialogRef.current) {
                  dialogRef.current.close();
                }
              }}
              className="w-full px-8 py-3 bg-[#003DA5] font-['Crimson_Pro'] text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Submit
            </button>
          </div>

        </div>
      </dialog>
    </div>
  );
}
