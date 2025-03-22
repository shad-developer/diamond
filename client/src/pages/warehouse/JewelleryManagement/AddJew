import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grades, Proportion, Seive } from "../../../components/common/data";
import { getColors } from "../../../app/features/colorSlice";
import { addStone, getAllStones } from "../../../app/features/stoneSlice";
import { getJewelleryTypes } from "../../../app/features/jewellerySlice";
import { getQualities } from "../../../app/features/qualitySlice";

const AddJewellery = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { jewelleryTypes } = useSelector((state) => state.jewellery);
    const { qualities } = useSelector((state) => state.quality);
    const { colors } = useSelector((state) => state.color);
    const { stones, isLoading, isSuccess } = useSelector((state) => state.stone);

    useEffect(() => {
        dispatch(getJewelleryTypes());
        dispatch(getQualities());
        dispatch(getColors());
        dispatch(getAllStones());
    }, [dispatch]);

    const [formData, setFormData] = useState({
        description: "",
        protocol: "",
        goldFrameWeight: "",
        frameValue: "",
        manufacturingCost: "",
        manufacturingFrameCost: "",
        marginPercentage: "",
        chainWeight: "",
        chainManufacturingCost: "",
        chainCost: "",
        // extra fields under the sections
        sideSettings: "",
        numberOfCentralSettingStones: "",
        centralSetting: "",
        extraProcessing: "",
        fixedExpenses: "",
        cost: "",
        publicPrice: "",
        purityToBeShowedOnTheCard: "",
    });

    // State for storing stone data
    const [smallStones, setSmallStones] = useState([]);
    const [largeStones, setLargeStones] = useState([]);
    const [fantasyStones, setFantasyStones] = useState([]);

    // State for individual stone entries in each section
    const [currentSmallStone, setCurrentSmallStone] = useState({
        smallStoneSeiver: "",
        smallStoneColor: "",
        smallStoneQuality: "",
        smallStoneCarats: "",
        smallStonePrice: "",
        smallStoneMarginPercentage: "",
        smallStoneTotal: "",
        smallStoneCurrentStock: "",
    });

    const [currentLargeStone, setCurrentLargeStone] = useState({
        largeStoneCertificate: "",
        largeStoneUnitPrice: "",
        largeStoneSurcharge: "",
        largeStoneTotal: "",
    });

    const [currentFantasyStone, setCurrentFantasyStone] = useState({
        fantasyStoneType: "",
        fantasyStoneCarats: "",
        fantasyStoneMeasure: "",
        fantasyStonePricePerCarat: "",
        fantasyStoneTotal: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSmallStoneChange = (e) => {
        const { name, value } = e.target;
        setCurrentSmallStone({ ...currentSmallStone, [name]: value });
    };

    const handleLargeStoneChange = (e) => {
        const { name, value } = e.target;
        setCurrentLargeStone({ ...currentLargeStone, [name]: value });
    };

    const handleFantasyStoneChange = (e) => {
        const { name, value } = e.target;
        setCurrentFantasyStone({ ...currentFantasyStone, [name]: value });
    };


    const handleAddSmallStone = () => {
        // if (Object.values(currentSmallStone).some(x => x === null || x === '')) {
        //     toast.warn("Please fill in all Small Stone fields before adding.");
        //     return;
        // }

        setSmallStones([...smallStones, currentSmallStone]);
        setCurrentSmallStone({
            smallStoneSeiver: "",
            smallStoneColor: "",
            smallStoneQuality: "",
            smallStoneCarats: "",
            smallStonePrice: "",
            smallStoneMarginPercentage: "",
            smallStoneTotal: "",
            smallStoneCurrentStock: "",
        }); // Clear the form
        toast.success("Small Stone added successfully!");
    };

    const handleAddLargeStone = () => {
        // if (Object.values(currentLargeStone).some(x => x === null || x === '')) {
        //     toast.warn("Please fill in all Large Stone fields before adding.");
        //     return;
        // }

        setLargeStones([...largeStones, currentLargeStone]);
        setCurrentLargeStone({
            largeStoneCertificate: "",
            largeStoneUnitPrice: "",
            largeStoneSurcharge: "",
            largeStoneTotal: "",
        }); // Clear the form
        toast.success("Large Stone added successfully!");

    };

    const handleAddFantasyStone = () => {
        // if (Object.values(currentFantasyStone).some(x => x === null || x === '')) {
        //     toast.warn("Please fill in all Fantasy Stone fields before adding.");
        //     return;
        // }

        setFantasyStones([...fantasyStones, currentFantasyStone]);
        setCurrentFantasyStone({
            fantasyStoneType: "",
            fantasyStoneCarats: "",
            fantasyStoneMeasure: "",
            fantasyStonePricePerCarat: "",
            fantasyStoneTotal: "",
        }); // Clear the form
        toast.success("Fantasy Stone added successfully!");

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;  // Prevent multiple submissions

        const allData = {
            ...formData,
            smallStones,
            largeStones,
            fantasyStones,
        };

        console.log("Data to be submitted:", allData);

        // Dispatch add stone with combined data
        try {
            await dispatch(addStone(allData));
            toast.success("Jewellery saved successfully!"); // Success message
            navigate("/large-stones");  // Redirect after success
        } catch (error) {
            toast.error("Failed to save jewellery."); // Error message
        }
    };


    return (
        <DashboardLayout>
            <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Add Jewellery</h2>
                <form onSubmit={handleSubmit} className="space-y-4">


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* General Jewellery Information */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">DESCRIPTION OF THE ITEM</label>
                            <select
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>--Select--</option>
                                {jewelleryTypes?.map((type) => (
                                    <option key={type?.id} value={type?.type}>
                                        {type?.type}-{type?.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="protocol" className="block text-sm font-medium text-gray-700">PROTOCOL</label>
                            <input
                                type="text"
                                id="protocol"
                                name="protocol"
                                value={formData.protocol}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter protocol"
                            />
                        </div>

                        <div>
                            <label htmlFor="goldFrameWeight" className="block text-sm font-medium text-gray-700">WEIGHT OF THE 18 KT GOLD FRAME</label>
                            <input
                                type="text"
                                id="goldFrameWeight"
                                name="goldFrameWeight"
                                value={formData.goldFrameWeight}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter weight in grams"
                            />
                        </div>

                        <div>
                            <label htmlFor="frameValue" className="block text-sm font-medium text-gray-700">VALUE OF THE FRAME</label>
                            <input
                                type="text"
                                id="frameValue"
                                name="frameValue"
                                value={formData.frameValue}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter frame value"
                            />
                        </div>

                        <div>
                            <label htmlFor="manufacturingCost" className="block text-sm font-medium text-gray-700">MANUFACTURING COST</label>
                            <input
                                type="text"
                                id="manufacturingCost"
                                name="manufacturingCost"
                                value={formData.manufacturingCost}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter manufacturing cost"
                            />
                        </div>

                        <div>
                            <label htmlFor="manufacturingFrameCost" className="block text-sm font-medium text-gray-700">V. COST OF MANUFACTURING FRAME</label>
                            <input
                                type="text"
                                id="manufacturingFrameCost"
                                name="manufacturingFrameCost"
                                value={formData.manufacturingFrameCost}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter manufacturing frame cost"
                            />
                        </div>

                        <div>
                            <label htmlFor="marginPercentage" className="block text-sm font-medium text-gray-700">MAG.IN %</label>
                            <input
                                type="text"
                                id="marginPercentage"
                                name="marginPercentage"
                                value={formData.marginPercentage}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter margin percentage"
                            />
                        </div>

                        <div>
                            <label htmlFor="chainWeight" className="block text-sm font-medium text-gray-700">CHAIN WEIGHT</label>
                            <input
                                type="text"
                                id="chainWeight"
                                name="chainWeight"
                                value={formData.chainWeight}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter chain weight"
                            />
                        </div>

                        <div>
                            <label htmlFor="chainManufacturingCost" className="block text-sm font-medium text-gray-700">CHAIN MANUFACTURING COST</label>
                            <input
                                type="text"
                                id="chainManufacturingCost"
                                name="chainManufacturingCost"
                                value={formData.chainManufacturingCost}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter chain manufacturing cost"
                            />
                        </div>

                        <div>
                            <label htmlFor="chainCost" className="block text-sm font-medium text-gray-700">CHAIN COST</label>
                            <input
                                type="text"
                                id="chainCost"
                                name="chainCost"
                                value={formData.chainCost}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter chain cost"
                            />
                        </div>
                    </div>

                    {/* Small Stone Section */}
                    <hr className="mt-5" />
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl text-red-600 font-semibold">Add Small Stone</h2>
                            <button
                                type="button"
                                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleAddSmallStone}
                            >
                                + Add
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4">
                            <div>
                                <label htmlFor="smallStoneSeiver" className="block text-sm font-medium text-gray-700">Seiver</label>
                                <select
                                    id="smallStoneSeiver"
                                    name="smallStoneSeiver"
                                    value={currentSmallStone.smallStoneSeiver}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Seive</option>
                                    {Seive.map((s) => (
                                        <option key={s.id} value={s.value}>{s.value}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="smallStoneColor" className="block text-sm font-medium text-gray-700">Color</label>
                                <select
                                    id="smallStoneColor"
                                    name="smallStoneColor"
                                    value={currentSmallStone.smallStoneColor}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Color</option>
                                    {colors.map((c) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="smallStoneQuality" className="block text-sm font-medium text-gray-700">Quality</label>
                                <select
                                    id="smallStoneQuality"
                                    name="smallStoneQuality"
                                    value={currentSmallStone.smallStoneQuality}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select Quality</option>
                                    {qualities.map((q) => (
                                        <option key={q.id} value={q.name}>{q.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="smallStoneCarats" className="block text-sm font-medium text-gray-700">Carats</label>
                                <input
                                    type="text"
                                    id="smallStoneCarats"
                                    name="smallStoneCarats"
                                    value={currentSmallStone.smallStoneCarats}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter carats"
                                />
                            </div>
                            <div>
                                <label htmlFor="smallStonePrice" className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="text"
                                    id="smallStonePrice"
                                    name="smallStonePrice"
                                    value={currentSmallStone.smallStonePrice}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter price"
                                />
                            </div>
                            <div>
                                <label htmlFor="smallStoneMarginPercentage" className="block text-sm font-medium text-gray-700">MAG.IN %</label>
                                <input
                                    type="text"
                                    id="smallStoneMarginPercentage"
                                    name="smallStoneMarginPercentage"
                                    value={currentSmallStone.smallStoneMarginPercentage}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter margin percentage"
                                />
                            </div>
                            <div>
                                <label htmlFor="smallStoneTotal" className="block text-sm font-medium text-gray-700">Total</label>
                                <input
                                    type="text"
                                    id="smallStoneTotal"
                                    name="smallStoneTotal"
                                    value={currentSmallStone.smallStoneTotal}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter total"
                                />
                            </div>
                            <div>
                                <label htmlFor="smallStoneCurrentStock" className="block text-sm font-medium text-gray-700">Current Stock</label>
                                <input
                                    type="text"
                                    id="smallStoneCurrentStock"
                                    name="smallStoneCurrentStock"
                                    disabled
                                    value={currentSmallStone.smallStoneCurrentStock}
                                    onChange={handleSmallStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Current stock"
                                />
                            </div>
                        </div>
                        {/* Display Small Stones Table */}
                        {smallStones.length > 0 && (
                            <div className="mt-4 overflow-x-auto">
                                <h3 className="text-lg font-semibold">Small Stones:</h3>
                                <table className="table-auto w-full border-collapse border border-gray-400">
                                    <thead className="bg-red-200">
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-400">Seiver</th>
                                            <th className="px-4 py-2 border border-gray-400">Color</th>
                                            <th className="px-4 py-2 border border-gray-400">Quality</th>
                                            <th className="px-4 py-2 border border-gray-400">Carats</th>
                                            <th className="px-4 py-2 border border-gray-400">Price</th>
                                            <th className="px-4 py-2 border border-gray-400">Margin %</th>
                                            <th className="px-4 py-2 border border-gray-400">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {smallStones.map((stone, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                <td className="px-4 py-2 border border-gray-400">{stone.smallStoneSeiver}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.smallStoneColor}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.smallStoneQuality}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.smallStoneCarats}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.smallStonePrice}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.smallStoneMarginPercentage}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.smallStoneTotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Large Stone Section */}
                    <hr className="mt-5" />
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl text-red-600 font-semibold">Add Large Stone</h2>
                            <button
                                type="button"
                                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleAddLargeStone}
                            >
                                + Add
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                            <div>
                                <label htmlFor="largeStoneCertificate" className="block text-sm font-medium text-gray-700">N.CERTIFICATE - CARATS - GRADE - COLOR - PROP. - FINISH.</label>
                                <select
                                    id="largeStoneCertificate"
                                    name="largeStoneCertificate"
                                    value={currentLargeStone.largeStoneCertificate}
                                    onChange={handleLargeStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="" disabled>--Select--</option>
                                    {stones.map((s) => (
                                        <option key={s.id} value={`${s.certificateNo}-${s.carats}-${s.grade}-${s.color}-${s.proportions}-${s.finish}`}>
                                            {s.certificateNo}-{s.carats}-{s.grade}-{s.color}-{s.proportions}-{s.finish}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="largeStoneUnitPrice" className="block text-sm font-medium text-gray-700">UNIT PRICE</label>
                                <input
                                    type="text"
                                    id="largeStoneUnitPrice"
                                    name="largeStoneUnitPrice"
                                    value={currentLargeStone.largeStoneUnitPrice}
                                    onChange={handleLargeStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter unit price"
                                />
                            </div>
                            <div>
                                <label htmlFor="largeStoneSurcharge" className="block text-sm font-medium text-gray-700">SURCHARGE %</label>
                                <input
                                    type="text"
                                    id="largeStoneSurcharge"
                                    name="largeStoneSurcharge"
                                    value={currentLargeStone.largeStoneSurcharge}
                                    onChange={handleLargeStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter surcharge percentage"
                                />
                            </div>
                            <div>
                                <label htmlFor="largeStoneTotal" className="block text-sm font-medium text-gray-700">Total</label>
                                <input
                                    type="text"
                                    id="largeStoneTotal"
                                    name="largeStoneTotal"
                                    value={currentLargeStone.largeStoneTotal}
                                    onChange={handleLargeStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter total"
                                />
                            </div>
                        </div>
                        {/* Display Large Stones Table */}
                        {largeStones.length > 0 && (
                            <div className="mt-4 overflow-x-auto">
                                <h3 className="text-lg font-semibold">Large Stones:</h3>
                                <table className="table-auto w-full border-collapse border border-gray-400">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-400">Certificate</th>
                                            <th className="px-4 py-2 border border-gray-400">Unit Price</th>
                                            <th className="px-4 py-2 border border-gray-400">Surcharge %</th>
                                            <th className="px-4 py-2 border border-gray-400">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {largeStones.map((stone, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                <td className="px-4 py-2 border border-gray-400">{stone.largeStoneCertificate}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.largeStoneUnitPrice}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.largeStoneSurcharge}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.largeStoneTotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Fantasy Stone Section */}
                    <hr className="mt-5" />
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl text-red-600 font-semibold">Add Fantasy Stone</h2>
                            <button
                                type="button"
                                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleAddFantasyStone}
                            >
                                + Add
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                            <div>
                                <label htmlFor="fantasyStoneType" className="block text-sm font-medium text-gray-700">Fantasy Type</label>
                                <input
                                    type="text"
                                    id="fantasyStoneType"
                                    name="fantasyStoneType"
                                    value={currentFantasyStone.fantasyStoneType}
                                    onChange={handleFantasyStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter fantasy type"
                                />
                            </div>
                            <div>
                                <label htmlFor="fantasyStoneCarats" className="block text-sm font-medium text-gray-700">Carats</label>
                                <input
                                    type="text"
                                    id="fantasyStoneCarats"
                                    name="fantasyStoneCarats"
                                    value={currentFantasyStone.fantasyStoneCarats}
                                    onChange={handleFantasyStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter carats"
                                />
                            </div>
                            <div>
                                <label htmlFor="fantasyStoneMeasure" className="block text-sm font-medium text-gray-700">Measure</label>
                                <input
                                    type="text"
                                    id="fantasyStoneMeasure"
                                    name="fantasyStoneMeasure"
                                    value={currentFantasyStone.fantasyStoneMeasure}
                                    onChange={handleFantasyStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter measure"
                                />
                            </div>
                            <div>
                                <label htmlFor="fantasyStonePricePerCarat" className="block text-sm font-medium text-gray-700">€ PER CARAT</label>
                                <input
                                    type="text"
                                    id="fantasyStonePricePerCarat"
                                    name="fantasyStonePricePerCarat"
                                    value={currentFantasyStone.fantasyStonePricePerCarat}
                                    onChange={handleFantasyStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter price per carat"
                                />
                            </div>
                            <div>
                                <label htmlFor="fantasyStoneTotal" className="block text-sm font-medium text-gray-700">Total</label>
                                <input
                                    type="text"
                                    id="fantasyStoneTotal"
                                    name="fantasyStoneTotal"
                                    value={currentFantasyStone.fantasyStoneTotal}
                                    onChange={handleFantasyStoneChange}
                                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter total"
                                />
                            </div>
                        </div>
                        {/* Display Fantasy Stones Table */}
                        {fantasyStones.length > 0 && (
                            <div className="mt-4 overflow-x-auto">
                                <h3 className="text-lg font-semibold">Fantasy Stones:</h3>
                                <table className="table-auto w-full border-collapse border border-gray-400">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-400">Type</th>
                                            <th className="px-4 py-2 border border-gray-400">Carats</th>
                                            <th className="px-4 py-2 border border-gray-400">Measure</th>
                                            <th className="px-4 py-2 border border-gray-400">Price/Carat</th>
                                            <th className="px-4 py-2 border border-gray-400">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fantasyStones.map((stone, index) => (
                                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                                <td className="px-4 py-2 border border-gray-400">{stone.fantasyStoneType}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.fantasyStoneCarats}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.fantasyStoneMeasure}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.fantasyStonePricePerCarat}</td>
                                                <td className="px-4 py-2 border border-gray-400">{stone.fantasyStoneTotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Extra Fields */}
                    <hr className="mt-5" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="sideSettings" className="block text-sm font-medium text-gray-700">SIDE SETTINGS</label>
                            <input
                                type="text"
                                id="sideSettings"
                                name="sideSettings"
                                value={formData.sideSettings}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter side settings"
                            />
                        </div>
                        <div>
                            <label htmlFor="numberOfCentralSettingStones" className="block text-sm font-medium text-gray-700">NUMBER OF CENTRAL SETTING STONES</label>
                            <input
                                type="text"
                                id="numberOfCentralSettingStones"
                                name="numberOfCentralSettingStones"
                                value={formData.numberOfCentralSettingStones}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter number of central setting stones"
                            />
                        </div>
                        <div>
                            <label htmlFor="centralSetting" className="block text-sm font-medium text-gray-700">CENTRAL SETTING</label>
                            <input
                                type="text"
                                id="centralSetting"
                                name="centralSetting"
                                value={formData.centralSetting}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter central setting"
                            />
                        </div>
                        <div>
                            <label htmlFor="extraProcessing" className="block text-sm font-medium text-gray-700">EXTRA PROCESSING</label>
                            <input
                                type="text"
                                id="extraProcessing"
                                name="extraProcessing"
                                value={formData.extraProcessing}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter extra processing"
                            />
                        </div>
                        <div>
                            <label htmlFor="fixedExpenses" className="block text-sm font-medium text-gray-700">FIXED EXPENSES</label>
                            <input
                                type="text"
                                id="fixedExpenses"
                                name="fixedExpenses"
                                value={formData.fixedExpenses}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter fixed expenses"
                            />
                        </div>
                        <div>
                            <label htmlFor="cost" className="block text-sm font-medium text-gray-700">COST</label>
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter cost"
                            />
                        </div>
                        <div>
                            <label htmlFor="publicPrice" className="block text-sm font-medium text-gray-700">PUBLIC PRICE</label>
                            <input
                                type="text"
                                id="publicPrice"
                                name="publicPrice"
                                value={formData.publicPrice}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter public price"
                            />
                        </div>
                        <div>
                            <label htmlFor="purityToBeShowedOnTheCard" className="block text-sm font-medium text-gray-700">PURITY TO BE SHOWED ON THE CARD</label>
                            <input
                                type="text"
                                id="purityToBeShowedOnTheCard"
                                name="purityToBeShowedOnTheCard"
                                value={formData.purityToBeShowedOnTheCard}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter purity to be showed on the card"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="submit"
                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default AddJewellery;
