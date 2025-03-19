import React, { useEffect, useState } from "react";
import { FaSearch, FaTrashAlt, FaEdit, FaPlus, FaFileExport } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  getColors } from "../../../app/features/colorSlice";
import { Grades, Proportion } from "../../../components/common/data";
import { deleteStone, getAllStones } from "../../../app/features/stoneSlice";

const StoneStock = () => {
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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    dispatch(getColors())
    dispatch(getAllStones());
  }, [dispatch]);

  const pageCount = Math.ceil(stones?.length / stonePerPage);

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

  const handleExportToCSV = () => {
    const csvData = [
      [
        "Sr.",
        "CERTIFICATE NO",
        "CUT",
        "CARATS",
        "GRADE",
        "COLOR",
        "PROP",
        "FINISH",
        "BRILLIANCE",
        "FLOUR.",
        "PR.CARAT",
        "PR.FINISHED STONE",
        "PR.A PRICE",
        "CUSTOMER WAITING FOR CONFIRMATION",
      ],
      ...filteredStones.map((stone, index) => [
        index + 1 + offset,
        stone?.certificateNo || "",
        stone?.cuts || "",
        stone?.carats || "",
        stone?.degrees || "",
        stone?.color || "",
        stone?.proportions || "",
        stone?.finish || "",
        stone?.brilliance || "",
        stone?.fluorescence || "",
        stone?.price_per_carat || "",
        stone?.finished_stone_price || "",
        stone?.public_price || "",
        "", // Placeholder for CUSTOMER WAITING FOR CONFIRMATION
      ]),
    ]
      .map((row) => row.join(",")) 
      .join("\n"); // Join all rows into a single CSV string
  
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stone_stock.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
    
    
    
  return (
    <DashboardLayout>
      <div className="mx-auto p-4 sm:p-6">
        {/* Add  Button */}
        <div className="flex justify-end mb-4">
          <button
           onClick={handleExportToCSV}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaFileExport className="mr-2" />
           Export
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
            <option value="" disabled >
              Select Grade
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
            <option value="" disabled>
             Select Color
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
            <option value="" disabled>
              Select Proportion
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
            <option value="" disabled>
              Select Grade
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
            <option value="" disabled>
              Select Brilliance
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
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 text-sm text-left">Sr.</th>
                <th className="border px-2 text-sm text-left">CERTIFICATE NO</th>
                <th className="border px-2 text-sm text-left">CUT</th>
                <th className="border px-2 text-sm text-left">CARATS</th>
                <th className="border px-2 text-sm text-left">GRADE</th>
                <th className="border px-2 text-sm text-left">COLOR</th>
                <th className="border px-2 text-sm text-left">PROP</th>
                <th className="border px-2 text-sm text-left">FINISH</th>
                <th className="border px-2 text-sm text-left">BRILLIANCE</th>
                <th className="border px-2 text-sm text-left">FLOUR.</th>
                <th className="border px-2 text-sm text-left">PR.CARAT</th>
                <th className="border px-2 text-sm text-left">PR.FINISHED STONE</th>
                <th className="border px-2 text-sm text-left">PR.A PRICE</th>
                <th className="border px-2 text-sm text-left">CUSTOMER WAITING FOR CONFIRMATION</th>
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
                  <td className="border p-2"></td>
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
            pageCount={pageCount}
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

export default StoneStock;
