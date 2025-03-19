import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { deleteLott, getAllLots } from "../../../app/features/lottSlice";

const Lotts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const lotPerPage = 10;

  // Separate search state variables
  const [searchBatchNo, setSearchBatchNo] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");
  const [searchFromDate, setSearchFromDate] = useState("");
  const [searchToDate, setSearchToDate] = useState("");

  const dispatch = useDispatch();
  const { lots } = useSelector((state) => state.lott);

  useEffect(() => {
    dispatch(getAllLots());
  }, [dispatch]);

  // Filtering logic
  const filteredLots = Array.isArray(lots)
    ? lots.filter((lot) => {
      return (
        lot.lotName?.toLowerCase().includes(searchBatchNo.toLowerCase()) &&
        lot.supplier?.toLowerCase().includes(searchSupplier.toLowerCase()) &&
        (searchFromDate === "" || new Date(lot.dateOfInsert) >= new Date(searchFromDate)) &&
        (searchToDate === "" || new Date(lot.dateOfInsert) <= new Date(searchToDate))
      );
    })
    : [];

  // Pagination after filtering
  const offset = currentPage * lotPerPage;
  const currentLots = filteredLots.slice(offset, offset + lotPerPage);
  const pageCount = Math.ceil(filteredLots.length / lotPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-lots");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };


  const handleDelete = async (id) => {
    await dispatch(deleteLott(id));
    await dispatch(getAllLots());
  }

  return (
    <DashboardLayout>
      <div className="mx-auto p-4 sm:p-6">
        {/* Add Lot Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Lot
          </button>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          <input
            type="text"
            value={searchBatchNo}
            onChange={(e) => setSearchBatchNo(e.target.value)}
            placeholder="Batch No"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={searchSupplier}
            onChange={(e) => setSearchSupplier(e.target.value)}
            placeholder="Supplier"
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={searchFromDate}
            onChange={(e) => setSearchFromDate(e.target.value)}
            placeholder="From Date"
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            value={searchToDate}
            onChange={(e) => setSearchToDate(e.target.value)}
            placeholder="To Date"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Sr.</th>
                <th className="border p-2 text-left">Batch No</th>
                <th className="border p-2 text-left">Supplier</th>
                <th className="border p-2 text-left">Date of Insert</th>
                <th className="border p-2 text-left">Total Carats</th>
                <th className="border p-2 text-left">Total Lot Cost</th>
                <th className="border p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLots.map((lot, index) => (
                <tr key={lot._id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1 + offset}</td>
                  <td className="border p-2">{lot.lotName}</td>
                  <td className="border p-2">{lot.supplier}</td>
                  <td className="border p-2">{formatDate(lot.dateOfInsert)}</td>
                  <td className="border p-2">{lot.totalCarats}</td>
                  <td className="border p-2">{lot.totalCost}</td>
                  <td className="border p-2">
                    <button className="text-green-500 hover:text-green-700 mr-3">
                      <NavLink to={`/update-lot/${lot._id}`} aria-label="Edit Lot">
                        <FaEdit />
                      </NavLink>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(lot._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="font-bold">
                <td className="border p-2 text-right" colSpan="5"></td>
                <td className="border p-2">Total: <span className="text-red-500"> € {filteredLots.reduce((sum, lot) => sum + parseFloat(lot.totalCost || 0), 0).toFixed(2)} </span></td>
                <td className="border p-2"></td>
              </tr>
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

export default Lotts;
