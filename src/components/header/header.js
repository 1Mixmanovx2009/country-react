import { useState } from "react";
import darcModeMoon from "../../assets/images/Path.svg";
import add from "../../assets/images/add-to-queue-svgrepo-com.svg";

function Headers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    population: "",
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleCloseModal();
  };

  return (
    <>
      <header className='flex justify-between items-center mb-[48px]'>
        <h1 className='text-[24px] font-[800] leading-[32.74px] py-[24px] px-[81px] text-[#111517]'>
          Where in the world?
        </h1>
        <div className="flex items-center justify-between gap-5">
          <img className="add cursor-pointer" src={add} width={25} height={25} alt="Add" onClick={handleAddClick} />
          <button className='flex items-center pr-[80px] gap-[8px]'>
            <img src={darcModeMoon} alt="Dark mode toggle" />
            <p className='text-[16px] font-[600] leading-[21.82px] text-[#111517]'>Dark Mode</p>
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-[20px] font-bold mb-4">Add a Country</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Country Name</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Enter country name" required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Enter city" required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Population</label>
                <input type="number" name="population" value={formData.population} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2" placeholder="Enter population" required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Select Image</label>
                <input type="file" name="image" onChange={handleImageChange} className="w-full" accept="image/*" required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Headers;
