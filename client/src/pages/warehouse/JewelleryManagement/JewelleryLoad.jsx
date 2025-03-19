import React, { useEffect, useState } from "react";
import { FaSearch, FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../../../app/features/colorSlice";
import { Grades, Proportion } from "../../../components/common/data";
import { deleteStone, getAllStones } from "../../../app/features/stoneSlice";
import { getJewelleryTypes } from "../../../app/features/jewellerySlice";

const JewelleryLoad = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 10;

    // State for search fields
    const [searchType, setSearchType] = useState("");
    const dispatch = useDispatch();
    const { jewelleryTypes } = useSelector((state) => state.jewellery);

    useEffect(() => {
        dispatch(getJewelleryTypes());
    }, [dispatch]);

    const handleDelete = async (id) => {
        await dispatch(deleteStone(id));
        await dispatch(getAllStones());
    };


    const pageCount = Math.ceil(jewelleryTypes?.length / itemPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/add-jewellery");
    };

    // Filtering logic based on search inputs
    const filteredData = Array.isArray(jewelleryTypes)
        ? jewelleryTypes.filter((type) => {
            return type?.type?.toLowerCase().includes(searchType.toLowerCase());
        })
        : [];



    // Pagination after filtering
    const offset = currentPage * itemPerPage;
    const currentData = filteredData.slice(offset, offset + itemPerPage);

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
                        Add Jewellery
                    </button>
                </div>

                {/* Search Section */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
                    {/* Jewellery Type DropDown */}
                    <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        className="border p-2 rounded w-full">
                        <option value="" disabled >Jewellery Type</option>
                        {jewelleryTypes?.map((type) => (
                            <option key={type?.id} value={type?.type}>
                                {type?.type}-{type?.description}
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
                                <th className="border p-2 text-left">JEWELRY TYPE</th>
                                <th className="border p-2 text-left">MOUNTED WEIGHT</th>
                                <th className="border p-2 text-left">CHAIN ​​WEIGHT</th>
                                <th className="border p-2 text-left">MANUFACTURING</th>
                                <th className="border p-2 text-left">LATERAL INCAST.</th>
                                <th className="border p-2 text-left">CENTRAL INCAST.</th>
                                <th className="border p-2 text-left">EXTRA WORK</th>
                                <th className="border p-2 text-left">CARAT INFO</th>
                                <th className="border p-2 text-left">COST</th>
                                <th className="border p-2 text-left">PRICE</th>
                                <th className="border p-2 text-left">ACTIONS</th>
                            </tr>
                        </thead>
                        {/* <tbody>
              {currentData.map((jewellery, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1 + offset}</td>
                  <td className="border p-2">{jewellery?.certificateNo}</td>
                  <td className="border p-2">{stone?.cuts}</td>
                  <td className="border p-2">{stone?.carats}</td>
                  <td className="border p-2">{stone?.degrees}</td>
                  <td className="border p-2">{stone?.color}</td>
                  <td className="border p-2">{stone?.proportions}</td>
                  <td className="border p-2">{stone?.finish}</td>
                  <td className="border p-2">{stone?.brilliance}</td>
                  <td className="border p-2">{stone?.fluorescence}</td>
                  <td className="border p-2">{stone?.price_per_carat}</td>
                  <td className="border p-2">
                    <button className="text-green-500 hover:text-green-700 mr-3">
                      <NavLink
                        to={`/update-jewellery/${jewellery?._id}`}
                        aria-label="Edit stone"
                      >
                        <FaEdit />
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDelete(jewellery?._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> */}
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(filteredData.length / itemPerPage)}
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

export default JewelleryLoad;
