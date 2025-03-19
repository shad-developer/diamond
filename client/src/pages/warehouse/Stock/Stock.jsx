import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { getQualities } from "../../../app/features/qualitySlice";
import { getColors } from "../../../app/features/colorSlice";
import { Seive } from "../../../components/common/data";

const Stock = () => {
  const stockData = [
    { seive: 0, quality: "TO", color: "Red", carats: 1420 },
    { seive: 0, quality: "B", color: "Blue", carats: 2088 },
    { seive: 1, quality: "TO", color: "Green", carats: 2420 },
    { seive: 1.5, quality: "C", color: "Yellow", carats: 5215 },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [searchSeive, setSearchSeive] = useState("");
  const [searchQuality, setSearchQuality] = useState("");
  const [searchColor, setSearchColor] = useState("");

  const dispatch = useDispatch();
  const { qualities } = useSelector((state) => state.quality);
  const { colors } = useSelector((state) => state.color);

  useEffect(() => {
    dispatch(getQualities());
    dispatch(getColors());
  }, [dispatch]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredData = stockData.filter(
    (item) =>
      (searchSeive === "" || item.seive.toString() === searchSeive) &&
      (searchQuality === "" || item.quality.includes(searchQuality)) &&
      (searchColor === "" || item.color.includes(searchColor))
  );

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handleExportToCSV = () => {
    const csvData = [
      ["Sr.", "SEIVE", "QUALITY", "COLOR", "CARATS AVAILABLE"],
      ...filteredData.map((item, index) => [
        index + 1 + offset,
        item.seive,
        item.quality,
        item.color,
        item.carats,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stock_data.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold mb-5">Stock Data</h1>
        <div className="grid grid-cols-3 gap-4">
          <select onChange={(e) => setSearchSeive(e.target.value)}>
            <option value="">Select Seive</option>
            {Seive.map((s) => (
              <option key={s.id} value={s.value}>{s.value}</option>
            ))}
          </select>
          <select onChange={(e) => setSearchQuality(e.target.value)}>
            <option value="">Select Quality</option>
            {qualities.map((q) => (
              <option key={q.id} value={q.name}>{q.name}</option>
            ))}
          </select>
          <select onChange={(e) => setSearchColor(e.target.value)}>
            <option value="">Select Color</option>
            {colors.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
        <button onClick={handleExportToCSV} className="mt-4 bg-green-500 text-white px-4 py-2">Export CSV</button>
        <table className="table-auto w-full mt-4 mb-5 border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Seive</th>
              <th className="border px-2 py-1">Quality</th>
              <th className="border px-2 py-1">Color</th>
              <th className="border px-2 py-1">Carats</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-1">{item.seive}</td>
                <td className="border px-2 py-1">{item.quality}</td>
                <td className="border px-2 py-1">{item.color}</td>
                <td className="border px-2 py-1">{item.carats}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </DashboardLayout>
  );
};

export default Stock;
