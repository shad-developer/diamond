import React, { useEffect, useState } from "react";
import { FaSearch, FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getColors } from "../../../app/features/colorSlice";
import { Grades, Proportion } from "../../../components/common/data";
import { deleteStone, getAllStones } from "../../../app/features/stoneSlice";

const Stones = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const stonePerPage = 10;

  // State for search fields
  const [searchName, setSearchName] = useState("");
  const [searchDegree, setSearchDegree] = useState("");
  const [searchColor, setSearchColor] = useState("");
  const [searchProportion, setSearchProportion] = useState("");
  const [searchFinish, setSearchFinish] = useState("");
  const [searchBrilliance, setSearchBrilliance] = useState("");

  const dispatch = useDispatch();

  const { stones } = useSelector((state) => state.stone);
  const { colors } = useSelector((state) => state.color);


  useEffect(() => {
    dispatch(getColors())
    dispatch(getAllStones());
  }, [dispatch]);

  const handleDeleteStone = async (id) => {
    await dispatch(deleteStone(id));
    await dispatch(getAllStones());
  };

  const pageCount = Math.ceil(stones?.length / stonePerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-stone");
  };

  // Filtering logic based on search inputs
  const filteredStones = Array.isArray(stones)
    ? stones.filter((stone) => {
      return stone?.certificateNo?.toLowerCase().includes(searchName.toLowerCase()) &&
        stone?.degrees?.toLowerCase().includes(searchDegree.toLowerCase()) &&
        stone?.color?.toLowerCase().includes(searchColor.toLowerCase()) &&
        stone?.proportions?.toLowerCase().includes(searchProportion.toLowerCase()) &&
        stone?.finish?.toLowerCase().includes(searchFinish.toLowerCase()) &&
        stone?.brilliance?.toLowerCase().includes(searchBrilliance.toLowerCase());
      })
    : [];

  
  
  // Pagination after filtering
  const offset = currentPage * stonePerPage;
  const currentStones = filteredStones.slice(offset, offset + stonePerPage);

  return (
    <DashboardLayout>
      <div className="mx-auto p-4 sm:p-6">
        {/* Add  Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Stones
          </button>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Certificate No."
            className="border p-2 rounded w-full"
          />

          {/* Grades DropDown */}
          <select
            value={searchDegree}
            onChange={(e) => setSearchDegree(e.target.value)}
            className="border p-2 rounded w-full">
            <option selected >
              Grade
            </option>
            {Grades?.map((grade) => (
              <option key={grade?.id} value={grade?.value}>
                {grade?.value}
              </option>
            ))}
          </select>

          {/* Color Dropdown */}
          <select
            value={searchColor}
            onChange={(e) => setSearchColor(e.target.value)}
            className="border p-2 rounded w-full">
            <option selected>
              Color
            </option>
            {colors?.map((color) => (
              <option key={color?._id} value={color?.name}>
                {color?.name}
              </option>
            ))}
          </select>

          {/* proportion Dropdown */}
          <select
             value={searchProportion}
             onChange={(e) => setSearchProportion(e.target.value)}
            className="border p-2 rounded w-full">
            <option selected>
              Proportion
            </option>
            {Proportion?.map((proportion) => (
              <option key={proportion?._id} value={proportion?.value}>
                {proportion?.value}
              </option>
            ))}
          </select>

          {/* finish Dropdown */}
          <select
            value={searchFinish}
            onChange={(e) => setSearchFinish(e.target.value)}
            className="border p-2 rounded w-full">
            <option selected>
              Finish
            </option>
            {Proportion?.map((proportion) => (
              <option key={proportion?._id} value={proportion?.value}>
                {proportion?.value}
              </option>
            ))}
          </select>

          {/* Brilliance Dropdown */}
          <select
           value={searchBrilliance}
           onChange={(e) => setSearchBrilliance(e.target.value)}
            className="border p-2 rounded w-full">
            <option selected>
              Brilliance
            </option>
            {Proportion?.map((proportion) => (
              <option key={proportion?._id} value={proportion?.value}>
                {proportion?.value}
              </option>
            ))}
          </select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Sr.</th>
                <th className="border p-2 text-left">Certificate No</th>
                <th className="border p-2 text-left">cuts</th>
                <th className="border p-2 text-left">carats</th>
                <th className="border p-2 text-left">Grade</th>
                <th className="border p-2 text-left">color</th>
                <th className="border p-2 text-left">proportions</th>
                <th className="border p-2 text-left">finish</th>
                <th className="border p-2 text-left">brilliance</th>
                <th className="border p-2 text-left">fluorescence</th>
                <th className="border p-2 text-left">price_per_carat</th>
                <th className="border p-2 text-left">finished_stone_price</th>
                <th className="border p-2 text-left">public_price</th>
                <th className="border p-2 text-left">average</th>
                <th className="border p-2 text-left">costs</th>
                <th className="border p-2 text-left">finished_cost</th>
                <th className="border p-2 text-left">total_compl</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStones.map((stone, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1 + offset}</td>
                  <td className="border p-2">{stone?.certificateNo}</td>
                  <td className="border p-2">{stone?.cuts}</td>
                  <td className="border p-2">{stone?.carats}</td>
                  <td className="border p-2">{stone?.degrees}</td>
                  <td className="border p-2">{stone?.color}</td>
                  <td className="border p-2">{stone?.proportions}</td>
                  <td className="border p-2">{stone?.finish}</td>
                  <td className="border p-2">{stone?.brilliance}</td>
                  <td className="border p-2">{stone?.fluorescence}</td>
                  <td className="border p-2">{stone?.price_per_carat}</td>
                  <td className="border p-2">{stone?.finished_stone_price}</td>
                  <td className="border p-2">{stone?.public_price}</td>
                  <td className="border p-2">{stone?.average}</td>
                  <td className="border p-2">{stone?.costs}</td>
                  <td className="border p-2">{stone?.finished_cost}</td>
                  <td className="border p-2">{stone?.total_compl}</td>
                  <td className="border p-2">
                    <button className="text-green-500 hover:text-green-700 mr-3">
                      <NavLink
                        to={`/update-stone/${stone?._id}`}
                        aria-label="Edit stone"
                      >
                        <FaEdit />
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDeleteStone(stone?._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredStones.length / stonePerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center items-center gap-2"}
            previousClassName={"px-3 py-2 bg-gray-200 rounded"}
            nextClassName={"px-3 py-2 bg-gray-200 rounded"}
            pageClassName={
              "px-3 py-2 cursor-pointer bg-gray-100 hover:bg-gray-300 rounded"
            }
            activeClassName={"bg-green-500 text-white"}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Stones;
