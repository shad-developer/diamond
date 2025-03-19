// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import DashboardLayout from "../../../components/common/DashboardLayout";
// import { getQualities } from "../../../app/features/qualitySlice";
// import { Seive } from "../../../components/common/data";
// import { toast } from "react-toastify";

// const AverageCost = () => {
//     const dispatch = useDispatch();
//     const { qualities } = useSelector((state) => state.quality);

//     useEffect(() => {
//         dispatch(getQualities());
//     }, [dispatch]);

//     const now = new Date();
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     const formattedDate = now.toLocaleDateString(undefined, options);

//     // State for selected values
//     const [fromSeive, setFromSeive] = useState("");
//     const [throughSeive, setThroughSeive] = useState("");
//     const [calculatedValue, setCalculatedValue] = useState(null);

//     // Handle calculation
//     const handleCalculate = () => {
//         if (fromSeive !== "" && throughSeive !== "") {
//             const result = parseFloat(fromSeive) - parseFloat(throughSeive);
//             setCalculatedValue(result.toFixed(2)); // Keep two decimal places
//         } else {
//             toast.error("Please select both values.");
//             setCalculatedValue(null);
//         }
//     };

//     return (
//         <DashboardLayout>
//             <div className="mx-auto p-4 sm:p-6">
//                 <h1 className="text-2xl font-bold mb-5">
//                     Average Cost Calculation
//                 </h1>

//                 {/* Search Section */}
//                 <div className="grid grid-cols-3 gap-4">
//                     {/* From The Seive */}
//                     <div className="flex flex-col">
//                         <label htmlFor="fromSeive">From The Seive</label>
//                         <select
//                             id="fromSeive"
//                             value={fromSeive}
//                             onChange={(e) => setFromSeive(e.target.value)}
//                             className="border p-2 rounded"
//                         >
//                             <option value="">Select Type</option>
//                             {Seive.map((seive) => (
//                                 <option key={seive.id} value={seive.value}>
//                                     {seive.value}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Through The Seive */}
//                     <div className="flex flex-col">
//                         <label htmlFor="throughSeive">Through The Seive</label>
//                         <select
//                             id="throughSeive"
//                             value={throughSeive}
//                             onChange={(e) => setThroughSeive(e.target.value)}
//                             className="border p-2 rounded"
//                         >
//                             <option value="">Select Type</option>
//                             {Seive.map((seive) => (
//                                 <option key={seive.id} value={seive.value}>
//                                     {seive.value}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Quality Selection */}
//                     <div className="flex flex-col">
//                         <label htmlFor="quality">Quality</label>
//                         <select id="quality" className="border p-2 rounded">
//                             <option value="">Select Type</option>
//                             {qualities.map((quality) => (
//                                 <option key={quality.id} value={quality.name}>
//                                     {quality.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="flex items-end">
//                          {/* Display Calculation Result with Euro Symbol */}
//                     {calculatedValue !== null && (
//                         <div className="font-bold text-lg">
//                             <label>Calculated Cost: <span className="text-green-600">€ {calculatedValue}</span></label>
//                         </div>
//                     )}
//                     </div>
//                 </div>

//                 {/* Calculate Button */}
//                 <div className="mt-6">
//                     <button
//                         onClick={handleCalculate}
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Calculate
//                     </button>
//                 </div>
//             </div>
//         </DashboardLayout>
//     );
// };

// export default AverageCost;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { getQualities } from "../../../app/features/qualitySlice";
import { Seive } from "../../../components/common/data";
import { toast } from "react-toastify";

// Sample stock data (Replace with your actual data)
const stockData = [
    { seive: 0, quality: "TO", carats: 1420 },
    { seive: 0, quality: "B", carats: 2088 },
    { seive: 0, quality: "B2", carats: 1420 },
    { seive: 0, quality: "BLACK", carats: 3794 },
    { seive: 0, quality: "C", carats: 8748 },
    { seive: 0, quality: "C2", carats: 0.9 },
    { seive: 0, quality: "D", carats: 0.21 },
    { seive: 1, quality: "TO", carats: 2420 },
    { seive: 1, quality: "B", carats: 8769 },
    { seive: 1, quality: "B2", carats: 1530 },
    { seive: 1, quality: "BLACK", carats: 0.58 },
    { seive: 1, quality: "C", carats: 6225 },
    { seive: 1, quality: "C2", carats: 0.911 },
    { seive: 1, quality: "D", carats: 0.765 },
    { seive: 1.5, quality: "TO", carats: 18154 },
    { seive: 1.5, quality: "B", carats: 0.648 },
    { seive: 1.5, quality: "B2", carats: 0.505 },
    { seive: 1.5, quality: "BLACK", carats: 2153 },
    { seive: 1.5, quality: "C", carats: 5215 },
    { seive: 1.5, quality: "C2", carats: 0.745 },
    { seive: 1.5, quality: "D", carats: 5062 },
    { seive: 2, quality: "TO", carats: 6658 },
];

const AverageCost = () => {
    const dispatch = useDispatch();
    const { qualities } = useSelector((state) => state.quality);

    useEffect(() => {
        dispatch(getQualities());
    }, [dispatch]);

    // State for selections
    const [fromSeive, setFromSeive] = useState("");
    const [throughSeive, setThroughSeive] = useState("");
    const [selectedQuality, setSelectedQuality] = useState("");
    const [calculatedValue, setCalculatedValue] = useState(null);

    // Handle Calculation
    const handleCalculate = () => {
        if (fromSeive === "" || throughSeive === "" || selectedQuality === "") {
            toast.error("Please select all fields.");
            setCalculatedValue(null);
            return;
        }

        const fromValue = parseFloat(fromSeive);
        const toValue = parseFloat(throughSeive);

        if (fromValue < toValue) {
            toast.error("From Seive should be greater than Through Seive.");
            setCalculatedValue(null);
            return;
        }

        // Filter stock data within the selected seive range and quality
        const filteredData = stockData.filter(
            (item) =>
                item.seive >= toValue &&
                item.seive <= fromValue &&
                item.quality === selectedQuality
        );

        if (filteredData.length === 0) {
            toast.error("No data found for the selected range and quality.");
            setCalculatedValue(null);
            return;
        }

        // Calculate weighted average cost
        let totalWeightedCost = 0;
        let totalCarats = 0;

        filteredData.forEach(({ seive, carats }) => {
            totalWeightedCost += seive * carats;
            totalCarats += carats;
        });

        const averageCost = totalCarats ? (totalWeightedCost / totalCarats).toFixed(2) : "0.00";

        setCalculatedValue(averageCost);
    };

    return (
        <DashboardLayout>
            <div className="mx-auto p-4 sm:p-6">
                <h1 className="text-2xl font-bold mb-5">
                    Average Cost Calculation
                </h1>

                {/* Selection Section */}
                <div className="grid grid-cols-3 gap-4">
                    {/* From The Seive */}
                    <div className="flex flex-col">
                        <label htmlFor="fromSeive">From The Seive</label>
                        <select
                            id="fromSeive"
                            value={fromSeive}
                            onChange={(e) => setFromSeive(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">Select Type</option>
                            {Seive.map((seive) => (
                                <option key={seive.id} value={seive.value}>
                                    {seive.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Through The Seive */}
                    <div className="flex flex-col">
                        <label htmlFor="throughSeive">Through The Seive</label>
                        <select
                            id="throughSeive"
                            value={throughSeive}
                            onChange={(e) => setThroughSeive(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">Select Type</option>
                            {Seive.map((seive) => (
                                <option key={seive.id} value={seive.value}>
                                    {seive.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quality Selection */}
                    <div className="flex flex-col">
                        <label htmlFor="quality">Quality</label>
                        <select
                            id="quality"
                            value={selectedQuality}
                            onChange={(e) => setSelectedQuality(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">Select Type</option>
                            {qualities.map((quality) => (
                                <option key={quality.id} value={quality.name}>
                                    {quality.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Calculate Button */}
                <div className="mt-6">
                    <button
                        onClick={handleCalculate}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Calculate
                    </button>
                </div>

                {/* Display Calculation Result */}
                <div className="mt-4">
                    {calculatedValue !== null && (
                        <div className="font-bold text-lg">
                            <label>
                                Average Cost:{" "}
                                <span className="text-green-600">€ {calculatedValue}</span>
                            </label>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AverageCost;
