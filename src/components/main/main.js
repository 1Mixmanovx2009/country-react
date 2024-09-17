import { useState } from 'react';
import search from "../../assets/images/icon-search-black.svg";
import Loading from "../../assets/images/Dual Ring@1x-1.0s-200px-200px (1).png";
import update from "../../assets/images/update-alt-2-svgrepo-com.svg";
import Delete from "../../assets/images/delete-2-svgrepo-com.svg";

function Mains() {
  const allCountries = [
        {
          id: 1,
          name: "Wallis and Futuna",
          capital: "Mata-Utu",
          population: 11750,
          flag: "https://flagcdn.com/wf.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 2,
          name: "Iceland",
          capital: "Reykjavik",
          population: 366425,
          flag: "https://flagcdn.com/is.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 3,
          name: "Luxembourg",
          capital: "Luxembourg",
          population: 632275,
          flag: "https://flagcdn.com/lu.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 4,
          name: "Mali",
          capital: "Bamako",
          population: 20250834,
          flag: "https://flagcdn.com/ml.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 5,
          name: "Comoros",
          capital: "Moroni",
          population: 869595,
          flag: "https://flagcdn.com/km.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 6,
          name: "Australia",
          capital: "Canberra",
          population: 25687041,
          flag: "https://flagcdn.com/au.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 7,
          name: "Estonia",
          capital: "Tallinn",
          population: 1331057,
          flag: "https://flagcdn.com/ee.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 8,
          name: "Canada",
          capital: "Ottawa",
          population: 38005238,
          flag: "https://flagcdn.com/ca.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 9,
          name: "Belarus",
          capital: "Minsk",
          population: 9398861,
          flag: "https://flagcdn.com/by.svg",
          isLiked: false,
          isBasket: false
        },
        {
          id: 10,
          name: "Guyana",
          capital: "Georgetown",
          population: 786559,
          flag: "https://flagcdn.com/gy.svg",
          isLiked: false,
          isBasket: false
        }
      ]

  const [countries, setCountries] = useState(allCountries);
  const [isLoading, setIsLoading] = useState(false);
  const [editCountry, setEditCountry] = useState(null);
  const [deleteCountryId, setDeleteCountryId] = useState(null);

  const handleSearchCountry = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      const searchValue = allCountries.filter(item =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCountries(searchValue);
      setIsLoading(false);
    }, 1000);
  };

  const handleChangeSelect = (e) => {
    const selectedCountry = allCountries.filter(item => item.id == e.target.value);
    setIsLoading(true);
    if (e.target.value == 0) {
      setCountries(allCountries);
      setIsLoading(false);
    } else {
      setTimeout(() => {
        setCountries(selectedCountry);
        setIsLoading(false);
      }, 500);
    }
  };

  const handleEditClick = (country) => {
    setEditCountry(country);
  };

  const handleDeleteClick = (countryId) => {
    setDeleteCountryId(countryId);
  };

  const handleDeleteConfirm = () => {
    setCountries(countries.filter(item => item.id !== deleteCountryId));
    setDeleteCountryId(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedCountries = countries.map(item => 
      item.id === editCountry.id ? editCountry : item
    );
    setCountries(updatedCountries);
    setEditCountry(null);
  };

  return (
    <>
      <form className="flex relative justify-between px-[80px] mb-[48px]">
        <img className='absolute top-[15px] left-[100px]' src={search} width={18} height={18} />
        <input onChange={handleSearchCountry} className="search-input w-[480px] border-[2px] border-gray-400 p-[10px] pl-[55px] rounded-[12px]" type="text" placeholder="Searching..." />
        <select onChange={handleChangeSelect} className="count-select w-[150px] border-[2px] border-gray-400 p-[10px] rounded-[12px]" name="countrys" id="countrys">
          <option className='w-[200px]' value="0">All</option>
          {allCountries.map(item => <option className='w-[200px]' value={item.id}>{item.capital}</option>)}
        </select>
      </form>
      <ul className='flex flex-wrap justify-between gap-[74px] px-[80px]'>
        {isLoading ? <img className='mx-auto mt-[100px]' src={Loading} width={80} /> :
          countries.map(item => (
            <li className='list w-[264px] block bg-[white] rounded-[5px]' key={item.id}>
              <img className='card-img w-[264px] h-[160px] object-cover mb-[24px]' src={item.flag} />
              <div className='px-[24px]'>
                <p className='text-[18px] font-[800] mb-[16px] leading-[26px]'>{item.name}</p>
                <p className='text-[14px] font-[500] leading-[16px] mb-[8px]'><span className='text-[14px] font-[700] leading-[16px]'>Capital:</span> {item.capital}</p>
                <p className='text-[14px] font-[500] leading-[16px] mb-[25px]'><span className='text-[14px] font-[700] leading-[16px]'>Population: </span> {item.population}</p>
                <div className='flex items-center justify-start gap-2'>
                  <img className='update card-img w-[25px] h-[25px] object-cover mb-[24px] cursor-pointer' src={update} onClick={() => handleEditClick(item)} />
                  <img className='Delete card-img w-[25px] h-[25px] object-cover mb-[24px] cursor-pointer' src={Delete} onClick={() => handleDeleteClick(item.id)} />
                </div>
              </div>
            </li>
          ))
        }
      </ul>

      {/* Edit Modal */}
      {editCountry && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-[20px] font-bold mb-4">Edit Country</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Country Name</label>
                <input
                  type="text"
                  name="name"
                  value={editCountry.name}
                  onChange={e => setEditCountry({ ...editCountry, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Capital</label>
                <input
                  type="text"
                  name="capital"
                  value={editCountry.capital}
                  onChange={e => setEditCountry({ ...editCountry, capital: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Population</label>
                <input
                  type="number"
                  name="population"
                  value={editCountry.population}
                  onChange={e => setEditCountry({ ...editCountry, population: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Change Flag</label>
                <input
                  type="file"
                  onChange={e => setEditCountry({ ...editCountry, flag: URL.createObjectURL(e.target.files[0]) })}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setEditCountry(null)} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCountryId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-[20px] font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this country?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setDeleteCountryId(null)} className="px-4 py-2 bg-gray-300 rounded-lg">No</button>
              <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg">Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} export default Mains;


