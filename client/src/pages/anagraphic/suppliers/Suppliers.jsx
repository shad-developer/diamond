import React, { useEffect, useState } from "react";
import { FaSearch, FaUserPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSupplier, getSuppliers } from "../../../app/features/supplierSlice";


const Suppliers = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const supplierPerPage = 10;

  // State for search fields
  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchCAP, setSearchCAP] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const dispatch = useDispatch();

  const { suppliers, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const handleDeleteSupplier = async (id) => {
    await dispatch(deleteSupplier(id));
    await dispatch(getSuppliers());
  };

  const pageCount = Math.ceil(suppliers?.length / supplierPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-supplier");
  };

  // Filtering logic based on search inputs
  const filteredSuppliers = Array.isArray(suppliers)
    ? suppliers.filter((supplier) => {
        return (
            supplier.nominative?.toLowerCase().includes(searchName.toLowerCase()) &&
            supplier.email?.toLowerCase().includes(searchEmail.toLowerCase()) &&
            supplier.cap?.toString().includes(searchCAP) &&
            supplier.mobilePhone?.toString().includes(searchPhone) &&
            supplier.city?.toLowerCase().includes(searchCity.toLowerCase()) &&
          (searchStatus === "" || supplier.customerStatus === searchStatus)
        );
      })
    : [];

  // Pagination after filtering
  const offset = currentPage * supplierPerPage;
  const currentSupplier = filteredSuppliers.slice(offset, offset + supplierPerPage);

  return (
    <DashboardLayout>
      <div className="mx-auto p-4 sm:p-6">
        {/* Add User Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            <FaUserPlus className="mr-2" />
            Add Suppliers
          </button>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search Name"
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search Email"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search City"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Search CAP"
            value={searchCAP}
            onChange={(e) => setSearchCAP(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Search Phone"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Sr.</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">City</th>
                <th className="border p-2 text-left">CAP</th>
                <th className="border p-2 text-left">Phone</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSupplier.map((supplier, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1 + offset}</td>
                  <td className="border p-2">{supplier.nominative}</td>
                  <td className="border p-2">{supplier.email}</td>
                  <td className="border p-2">{supplier.city}</td>
                  <td className="border p-2">{supplier.cap}</td>
                  <td className="border p-2">{supplier.mobilePhone}</td>
                  <td className="border p-2">
                    <button className="text-green-500 hover:text-green-700 mr-3">
                      <NavLink
                        to={`/update-supplier/${supplier?._id}`}
                        aria-label="Edit client"
                      >
                        <FaEdit />
                      </NavLink>
                    </button>
                    <button
                      onClick={() => handleDeleteSupplier(supplier?._id)}
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
            pageCount={Math.ceil(filteredSuppliers.length / supplierPerPage)}
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

export default Suppliers;
