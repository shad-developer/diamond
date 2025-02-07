import React, { useEffect, useState } from "react";
import { FaSearch, FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors } from "../../../app/features/colorSlice";
import { Grades, Proportion } from "../../../components/common/data";

const Stones = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const colorPerPage = 10;

  // State for search fields
  const [searchName, setSearchName] = useState("");

  const dispatch = useDispatch();

  const { colors, isLoading, isSuccess } = useSelector((state) => state.color);

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const handleDeleteColor = async (id) => {
    await dispatch(deleteColor(id));
    await dispatch(getColors());
  };

  const pageCount = Math.ceil(colors?.length / colorPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-color");
  };

  // Filtering logic based on search inputs
  const filteredColors = Array.isArray(colors)
    ? colors.filter((color) => {
        return color.name?.toLowerCase().includes(searchName.toLowerCase());
      })
    : [];

  // Pagination after filtering
  const offset = currentPage * colorPerPage;
  const currentcolors = filteredColors.slice(offset, offset + colorPerPage);

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
          <select>
            <option selected disabled>
              Grade
            </option>
            {Grades?.map((grade) => (
              <option key={grade?.id} value={grade?.value}>
                {grade?.value}
              </option>
            ))}
          </select>

          {/* Color Dropdown */}
          <select>
            <option selected disabled>
              Color
            </option>
            {colors?.map((color) => (
              <option key={color?._id} value={color?.name}>
                {color?.name}
              </option>
            ))}
          </select>

          {/* proportion Dropdown */}
          <select>
            <option selected disabled>
              Proportion
            </option>
            {Proportion?.map((proportion) => (
              <option key={proportion?._id} value={proportion?.value}>
                {proportion?.value}
              </option>
            ))}
          </select>

          {/* finish Dropdown */}
          <select>
            <option selected disabled>
              Finish
            </option>
            {colors?.map((color) => (
              <option key={color?._id} value={color?.name}>
                {color?.name}
              </option>
            ))}
          </select>

          {/* Brilliance Dropdown */}
          <select>
            <option selected disabled>
              Brilliance
            </option>
            {colors?.map((color) => (
              <option key={color?._id} value={color?.name}>
                {color?.name}
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
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentcolors.map((color, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1 + offset}</td>
                  <td className="border p-2">{color?.name}</td>
                  <td className="border p-2">
                    <button className="text-green-500 hover:text-green-700 mr-3">
                      <NavLink
                        to={`/update-color/${color?._id}`}
                        aria-label="Edit Color"
                      >
                        <FaEdit />
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDeleteColor(color?._id)}
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
            pageCount={Math.ceil(filteredColors.length / colorPerPage)}
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
