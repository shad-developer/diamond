import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { getColors } from "../../../app/features/colorSlice";
import { Grades } from "../../../components/common/data";
import { toast } from "react-toastify";

const UpdatePrice = () => {
    const dispatch = useDispatch();
    const { colors } = useSelector((state) => state.color);

    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    // State for selections
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [carats, setCarats] = useState("");
    const [inCarats, setInCarats] = useState("");
    const [updatedPrice, setUpdatedPrice] = useState("");

    // Handle form submission
    const handleUpdatePrice = () => {
        if (!carats || !inCarats || !selectedGrade || !selectedColor || !updatedPrice) {
            toast.error("Please fill in all fields before updating.");
            return;
        }

        // Here, send data to the backend or process it accordingly
        const updateData = {
            carats,
            inCarats,
            grade: selectedGrade,
            color: selectedColor,
            price: updatedPrice,
        };

        console.log("Updating price with:", updateData);

        toast.success("Price updated successfully!");
    };

    return (
        <DashboardLayout>
            <div className="mx-auto p-4 sm:p-6">
                <h1 className="text-2xl font-bold mb-5">
                    MASSIVE UPDATE OF LARGE STONES SALE PRICES
                </h1>

                {/* Selection Section */}
                <div className="grid grid-cols-5 gap-4">
                    {/* Carats */}
                    <div className="flex flex-col">
                        <label htmlFor="carats">By Carats</label>
                        <input
                            type="number"
                            step={0.01}
                            min={0}
                            id="carats"
                            value={carats}
                            onChange={(e) => setCarats(e.target.value)}
                            className="border p-2 rounded"
                            placeholder="Enter carats"
                        />
                    </div>

                    {/* In Carats */}
                    <div className="flex flex-col">
                        <label htmlFor="inCarats">In Carats</label>
                        <input
                            type="number"
                            step={0.01}
                            min={0}
                            id="inCarats"
                            value={inCarats}
                            onChange={(e) => setInCarats(e.target.value)}
                            className="border p-2 rounded"
                            placeholder="Enter in carats"
                        />
                    </div>

                    {/* Grade Selection */}
                    <div className="flex flex-col">
                        <label htmlFor="grade">Grade</label>
                        <select
                            id="grade"
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">--Select--</option>
                            {Grades.map((grade) => (
                                <option key={grade.id} value={grade.value}>
                                    {grade.value}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Color Selection */}
                    <div className="flex flex-col">
                        <label htmlFor="color">Color</label>
                        <select
                            id="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">--Select--</option>
                            {colors.map((color) => (
                                <option key={color.id} value={color.name}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Updated Price */}
                    <div className="flex flex-col">
                        <label htmlFor="updatedPrice">Updated Price</label>
                        <input
                            type="number"
                            step={0.01}
                            min={0}
                            id="updatedPrice"
                            value={updatedPrice}
                            onChange={(e) => setUpdatedPrice(e.target.value)}
                            className="border p-2 rounded"
                            placeholder="Enter updated price"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        onClick={handleUpdatePrice}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Update Price
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UpdatePrice;
