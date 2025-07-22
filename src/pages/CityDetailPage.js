import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CityDetailPage() {
    const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Industries');
  const [editMode, setEditMode] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [editingIndustry, setEditingIndustry] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    industryName: '',
    numIndividuals: '',
    image: null,
    imagePreview: null
  });

  // Edit form state for industry
  const [editFormData, setEditFormData] = useState({
    industryName: '',
    numIndividuals: '',
    image: null,
    imagePreview: null
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.industryName && formData.numIndividuals) {
      const newIndustry = {
        id: Date.now(),
        name: formData.industryName,
        individuals: formData.numIndividuals,
        image: formData.imagePreview,
      };
      
      setIndustries([...industries, newIndustry]);
      setFormData({ industryName: '', numIndividuals: '', image: null, imagePreview: null });
      setShowModal(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteIndustry = (id) => {
    setIndustries(industries.filter(industry => industry.id !== id));
  };

  const handleEditIndustry = (industry) => {
    setEditingIndustry(industry);
    setEditFormData({
      industryName: industry.name,
      numIndividuals: industry.individuals,
      image: null,
      imagePreview: industry.image
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editFormData.industryName && editFormData.numIndividuals && editingIndustry) {
      const updatedIndustries = industries.map(industry => 
        industry.id === editingIndustry.id 
          ? {
              ...industry,
              name: editFormData.industryName,
              individuals: editFormData.numIndividuals,
              image: editFormData.imagePreview
            }
          : industry
      );
      
      setIndustries(updatedIndustries);
      setEditFormData({ industryName: '', numIndividuals: '', image: null, imagePreview: null });
      setShowEditModal(false);
      setEditingIndustry(null);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleIndustrySelection = (id) => {
    setSelectedIndustries(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedIndustries = () => {
    setIndustries(industries.filter(industry => !selectedIndustries.includes(industry.id)));
    setSelectedIndustries([]);
    setEditMode(false);
  };

  const filteredIndustries = industries.filter(industry => {
    if (selectedFilter === 'All Industries') return true;
    return industry.name === selectedFilter;
  });

  const availableFilters = ['All Industries', ...industries.map(ind => ind.name)];
  const searchedFilters = availableFilters.filter(filter => 
    filter.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="pt-[100px] bg-gray-100 min-h-screen font-[CrimsonPro] flex flex-col">
 
      <h1 className="text-[40px] text-[#003DA5] mb-[80px] px-8">Saint Louis, MO</h1>

    
      <p className="text-[#003DA5] text-[20px] leading-relaxed mb-[80px] max-w-4xl px-8">
        St. Louis is a major city in Missouri along the Mississippi River. Its iconic, 630-ft. Gateway Arch, built in the 1960s, honors the early 19th-century explorations 
        of Lewis and Clark and America's westward expansion in general. Replica paddlewheelers ply the river, offering views of the arch. The Soulard district is home 
        to barbecue restaurants and clubs playing blues music. ― Google
      </p>

   
      <div className="bg-white w-full shadow-md flex flex-col min-h-[400px]">
   
        <div className="px-8 py-4 flex justify-between items-center">
         
          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#003DA5] text-[#003DA5] rounded hover:bg-gray-50"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {selectedFilter}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Search industries..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#003DA5]"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {searchedFilters.map((filter, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[#003DA5]"
                      onClick={() => {
                        setSelectedFilter(filter);
                        setShowFilterDropdown(false);
                        setFilterSearch('');
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {editMode && selectedIndustries.length > 0 && (
              <button 
                onClick={deleteSelectedIndustries}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Selected ({selectedIndustries.length})
              </button>
            )}
            
            {editMode && (
              <button 
                onClick={() => {
                  setEditMode(false);
                  setSelectedIndustries([]);
                }}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-400 text-gray-600 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            )}

            <button 
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#003DA5] text-[#003DA5] rounded hover:bg-gray-50"
              onClick={() => {
                if (editMode) {
                  setEditMode(false);
                  setSelectedIndustries([]);
                } else {
                  setEditMode(true);
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {editMode ? 'Done Editing' : 'Edit Industries'}
            </button>

            {!editMode && industries.length > 0 && (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#003DA5] text-white rounded hover:bg-[#00297a]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Select Items
              </button>
            )}
          </div>
        </div>

        {/* Cards Container - 6 cards per row */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">

            {filteredIndustries.map((industry) => (
              <div
                key={industry.id}
                className={`w-[270px] h-[300px] bg-white rounded-[10px] shadow-lg flex flex-col overflow-hidden relative ${
                  editMode ? 'cursor-pointer' : ''
                } ${
                  selectedIndustries.includes(industry.id) ? 'ring-4 ring-[#003DA5]' : ''
                }`}
                onClick={() => editMode && toggleIndustrySelection(industry.id)}
              >
           
                {editMode && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedIndustries.includes(industry.id) 
                        ? 'bg-[#003DA5] border-[#003DA5]' 
                        : 'bg-white border-gray-400'
                    }`}>
                      {selectedIndustries.includes(industry.id) && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}

           
                <div className="w-[264px] h-[150px] mx-auto mt-[3px] bg-gray-200 rounded overflow-hidden"  onClick={() => navigate("/industrydetailpage")} >
                  {industry.image ? (
                    <img 
                      src={industry.image} 
                      alt={industry.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100" >
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
          
                <div className="flex-grow px-4 py-3 flex flex-col justify-between">
                
                  <h3 className="text-[16px] font-[CrimsonPro] text-[#003DA5] mb-2">
                    {industry.name}
                  </h3>
                  
          
                  <div className="flex items-end justify-between">
           
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                      <span className="text-[12px] text-black">
                        {industry.individuals} individuals
                      </span>
                    </div>
                    
                   
                    {!editMode ? (
                      <button
                        onClick={() => deleteIndustry(industry.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete industry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditIndustry(industry);
                        }}
                        className="text-[#003DA5] hover:text-[#00297a]"
                        title="Edit industry"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Plus Card - Only show when not in edit mode */}
            {!editMode && (
              <div
                className="w-[270px] h-[300px] border-2 border-dotted border-[#003DA5] rounded-[10px] flex items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={() => setShowModal(true)}
              >
                <span className="text-[#003DA5] text-5xl">+</span>
              </div>
            )}
          </div>
        </div>

        {/* Empty state message */}
        {filteredIndustries.length === 0 && !editMode && (
          <div className="flex-grow flex items-center justify-center py-20">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a1 1 0 011-1h6a1 1 0 011 1v2M7 7h10" />
              </svg>
              <p className="text-lg">No industries found</p>
              <p className="text-sm">Add your first industry to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Industry Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[645px] h-[645px] rounded-lg shadow-lg p-8 relative overflow-auto">
      
            <button
              className="absolute top-4 right-4 text-[#003DA5] text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            
            <h2 className="text-center text-[#003DA5] text-2xl font-semibold mb-6">
              Add a New Industry
            </h2>

            <div className="flex flex-col items-center">
              
              <div className="mb-4 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="industryName">
                  Enter Industry
                </label>
                <input
                  id="industryName"
                  type="text"
                  placeholder="Enter industry name"
                  value={formData.industryName}
                  onChange={(e) => setFormData(prev => ({ ...prev, industryName: e.target.value }))}
                  className="w-full h-[45px] border rounded px-3 text-black/80"
                  required
                />
              </div>

            
              <div className="mb-4 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="numIndividuals">
                  Enter number of individuals
                </label>
                <input
                  id="numIndividuals"
                  type="number"
                  placeholder="Enter number of individuals"
                  value={formData.numIndividuals}
                  onChange={(e) => setFormData(prev => ({ ...prev, numIndividuals: e.target.value }))}
                  className="w-full h-[45px] border rounded px-3 text-black/80"
                  required
                />
              </div>

     
              <div className="mb-2 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="uploadImage">
                  Upload Image
                </label>
                <input
                  id="uploadImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="uploadImage"
                  className="w-full h-[45px] bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200"
                  title="Upload Image"
                >
                  <svg className="w-6 h-6 text-[#003DA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-[#003DA5] font-medium">Choose File</span>
                </label>
              </div>

       
              <p className="text-center my-2 font-medium text-gray-500">OR</p>

             
              <div className="mb-6 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="takePhoto">
                  Take a Photo
                </label>
                <input
                  id="takePhoto"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="takePhoto"
                  className="w-full h-[45px] bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200"
                  title="Take a Photo"
                >
                  <svg className="w-6 h-6 text-[#003DA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[#003DA5] font-medium">Open Camera</span>
                </label>
              </div>

       
              {formData.imagePreview && (
                <div className="mb-4 w-[343px]">
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              )}

            
              <button 
                onClick={handleFormSubmit}
                className="w-[343px] h-[45px] bg-[#003DA5] text-white rounded hover:bg-[#00297a] transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Industry Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[645px] h-[645px] rounded-lg shadow-lg p-8 relative overflow-auto">
        
            <button
              className="absolute top-4 right-4 text-[#003DA5] text-2xl font-bold"
              onClick={() => {
                setShowEditModal(false);
                setEditingIndustry(null);
                setEditFormData({ industryName: '', numIndividuals: '', image: null, imagePreview: null });
              }}
              aria-label="Close modal"
            >
              ×
            </button>

           
            <h2 className="text-center text-[#003DA5] text-2xl font-semibold mb-6">
              Edit Industry
            </h2>

            <div className="flex flex-col items-center">
             
              <div className="mb-4 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="editIndustryName">
                  Industry Name
                </label>
                <input
                  id="editIndustryName"
                  type="text"
                  placeholder="Enter industry name"
                  value={editFormData.industryName}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, industryName: e.target.value }))}
                  className="w-full h-[45px] border rounded px-3 text-black/80"
                  required
                />
              </div>

             
              <div className="mb-4 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="editNumIndividuals">
                  Number of individuals
                </label>
                <input
                  id="editNumIndividuals"
                  type="number"
                  placeholder="Enter number of individuals"
                  value={editFormData.numIndividuals}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, numIndividuals: e.target.value }))}
                  className="w-full h-[45px] border rounded px-3 text-black/80"
                  required
                />
              </div>

             
              <div className="mb-2 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="editUploadImage">
                  Upload New Image
                </label>
                <input
                  id="editUploadImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleEditImageChange}
                />
                <label
                  htmlFor="editUploadImage"
                  className="w-full h-[45px] bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200"
                  title="Upload Image"
                >
                  <svg className="w-6 h-6 text-[#003DA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-[#003DA5] font-medium">Choose File</span>
                </label>
              </div>

           
              <p className="text-center my-2 font-medium text-gray-500">OR</p>

            
              <div className="mb-6 w-[343px]">
                <label className="text-[#003DA5] block mb-1" htmlFor="editTakePhoto">
                  Take a Photo
                </label>
                <input
                  id="editTakePhoto"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleEditImageChange}
                />
                <label
                  htmlFor="editTakePhoto"
                  className="w-full h-[45px] bg-gray-100 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200"
                  title="Take a Photo"
                >
                  <svg className="w-6 h-6 text-[#003DA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[#003DA5] font-medium">Open Camera</span>
                </label>
              </div>

            
              {editFormData.imagePreview && (
                <div className="mb-4 w-[343px]">
                  <img
                    src={editFormData.imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              )}

             
              <button 
                onClick={handleEditSubmit}
                className="w-[343px] h-[45px] bg-[#003DA5] text-white rounded hover:bg-[#00297a] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

 
      {showFilterDropdown && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setShowFilterDropdown(false)}
        />
      )}
    </div>
  );
}