import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteJewelleryType, getJewelleryTypes } from "../../../app/features/jewellerySlice";

const JewelleryTypes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const typePerPage = 10;

  // State for search fields
  const [searchType, setSearchType] = useState("");

  const dispatch = useDispatch();

  const { isLoading, isSuccess, jewelleryTypes } = useSelector(
    (state) => state.jewellery
  );

  useEffect(() => {
    dispatch(getJewelleryTypes());
  }, [dispatch]);

  const handleDeleteType = async (id) => {
    await dispatch(deleteJewelleryType(id));
    await dispatch(getJewelleryTypes());
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-jewellery-type");
  };

  const filteredTypes = Array.isArray(jewelleryTypes)
    ? jewelleryTypes.filter((type) =>
        type.type?.toLowerCase().includes(searchType.toLowerCase())
      )
    : [];

  // Pagination after filtering
  const offset = currentPage * typePerPage;
  const currentType = filteredTypes.slice(offset, offset + typePerPage);
  const pageCount = Math.ceil(jewelleryTypes?.length / typePerPage);

  return (
    <DashboardLayout>
      <div className="mx-auto p-4 sm:p-6">
        {/* Add type Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Jewellery Type
          </button>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          <input
            type="text"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            placeholder="Search Type"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Sr.</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentType.map((type, index) => (
                <tr key={type._id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1 + offset}</td>
                  <td className="border p-2">{type?.type}</td>
                  <td className="border p-2">{type?.description}</td>
                  <td className="border p-2">
                    <button className="text-green-500 hover:text-green-700 mr-3">
                      <NavLink
                        to={`/update-jewellery-type/${type?._id}`}
                        aria-label="Edit Type"
                      >
                        <FaEdit />
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDeleteType(type?._id)}
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
            pageCount={Math.ceil(filteredTypes.length / typePerPage)}
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

export default JewelleryTypes;
