import React, { useEffect, useState } from "react";
import { FaSearch, FaUserPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  getUserById,
} from "../../../app/features/authSlice";
import FormattedDate from "../../../components/FormattedDate";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  // State for search fields
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const dispatch = useDispatch();

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    await dispatch(getAllUsers());
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-user");
  };

  // Filtering logic based on search inputs
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) => {
        return (
          user.username?.toLowerCase().includes(searchName.toLowerCase()) &&
          user.email?.toLowerCase().includes(searchEmail.toLowerCase())
        );
      })
    : [];

  // Pagination after filtering
  const offset = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);

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
            Add Login
          </button>
        </div>

        {/* Search Section */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Email"
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
                <th className="border p-2 text-left">Created At</th>
                <th className="border p-2 text-left">Updated At</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1 + offset}</td>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    <FormattedDate date={user.createdAt} />
                  </td>
                  <td className="border p-2">
                    <FormattedDate date={user.updatedAt} />
                  </td>
                  <td className="border p-2">
                    <span
                      className={`${
                        user.status === "active"
                          ? "bg-green-500 text-white rounded-full p-1"
                          : "bg-red-500 text-white rounded-full p-1"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() => navigate(`/update-user/${user._id}`)}
                      className="text-green-500 hover:text-green-700 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user?._id)}
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
            pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
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

export default Users;
