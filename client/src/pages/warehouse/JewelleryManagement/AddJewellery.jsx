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
        // Small Stone Data (will be an array of objects later)
        smallStoneSeiver: "",
        smallStoneColor: "",
        smallStoneQuality: "",
        smallStoneCarats: "",
        smallStonePrice: "",
        smallStoneMarginPercentage: "",
        smallStoneTotal: "",
        smallStoneCurrentStock: "",
        // Large Stone Data (will be an array of objects later)
        largeStoneCertificate: "",
        largeStoneUnitPrice: "",
        largeStoneSurcharge: "",
        largeStoneTotal: "",
        // Fantasy Stone Data (will be an array of objects later)
        fantasyStoneType: "",
        fantasyStoneCarats: "",
        fantasyStoneMeasure: "",
        fantasyStonePricePerCarat: "",
        fantasyStoneTotal: "",
    });

    // State for controlling section visibility
    const [showSmallStoneSection, setShowSmallStoneSection] = useState(false);
    const [showLargeStoneSection, setShowLargeStoneSection] = useState(false);
    const [showFantasySection, setShowFantasySection] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dispatch add stone
        await dispatch(addStone(formData));

        if (isSuccess) {
            navigate("/large-stones");
        }
    };

    // Function to handle saving data for a specific section (to be implemented later)
    const handleSaveSection = (sectionName) => {
        console.log(`Saving data for ${sectionName} section:`, formData);
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

                    {/* Collapsible Sections */}
                    <hr className="mt-5" />

                    {/* Add Small Stone Section */}
                    <div className="flex items-center justify-between mt-5">
                        <h2 className="text-xl font-semibold">Add Small Stone</h2>
                        <button
                            type="button"
                            className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => setShowSmallStoneSection(!showSmallStoneSection)}
                        >
                            {showSmallStoneSection ? "Close" : "+ Add"}
                        </button>
                    </div>

                    {showSmallStoneSection && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="smallStoneSeiver" className="block text-sm font-medium text-gray-700">Seiver</label>
                                    <select
                                        id="smallStoneSeiver"
                                        name="smallStoneSeiver"
                                        value={formData.smallStoneSeiver}
                                        onChange={handleChange}
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
                                        value={formData.smallStoneColor}
                                        onChange={handleChange}
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
                                        value={formData.smallStoneQuality}
                                        onChange={handleChange}
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
                                        value={formData.smallStoneCarats}
                                        onChange={handleChange}
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
                                        value={formData.smallStonePrice}
                                        onChange={handleChange}
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
                                        value={formData.smallStoneMarginPercentage}
                                        onChange={handleChange}
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
                                        value={formData.smallStoneTotal}
                                        onChange={handleChange}
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
                                        value={formData.smallStoneCurrentStock}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Current stock"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={() => { handleSaveSection("smallStone"); setShowSmallStoneSection(false); }}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    onClick={() => setShowSmallStoneSection(false)}
                                >
                                    Exit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Add Large Stone Section */}
                    <hr className="mt-5" />
                    <div className="flex items-center justify-between mt-5">
                        <h2 className="text-xl font-semibold">Add Large Stone</h2>
                        <button
                            type="button"
                            className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => setShowLargeStoneSection(!showLargeStoneSection)}
                        >
                            {showLargeStoneSection ? "Close" : "+ Add"}
                        </button>
                    </div>

                    {showLargeStoneSection && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="largeStoneCertificate" className="block text-sm font-medium text-gray-700">N.CERTIFICATE - CARATS - GRADE - COLOR - PROP. - FINISH.</label>
                                    <select
                                        id="largeStoneCertificate"
                                        name="largeStoneCertificate"
                                        value={formData.largeStoneCertificate}
                                        onChange={handleChange}
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
                                        value={formData.largeStoneUnitPrice}
                                        onChange={handleChange}
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
                                        value={formData.largeStoneSurcharge}
                                        onChange={handleChange}
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
                                        value={formData.largeStoneTotal}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter total"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={() => { handleSaveSection("largeStone"); setShowLargeStoneSection(false); }}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    onClick={() => setShowLargeStoneSection(false)}
                                >
                                    Exit
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Add Fantasy Stone Section */}
                    <hr className="mt-5" />
                    <div className="flex items-center justify-between mt-5">
                        <h2 className="text-xl font-semibold">Add Fantasy Stone</h2>
                        <button
                            type="button"
                            className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => setShowFantasySection(!showFantasySection)}
                        >
                            {showFantasySection ? "Close" : "+ Add"}
                        </button>
                    </div>

                    {showFantasySection && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="fantasyStoneType" className="block text-sm font-medium text-gray-700">Fantasy Type</label>
                                    <input
                                        type="text"
                                        id="fantasyStoneType"
                                        name="fantasyStoneType"
                                        value={formData.fantasyStoneType}
                                        onChange={handleChange}
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
                                        value={formData.fantasyStoneCarats}
                                        onChange={handleChange}
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
                                        value={formData.fantasyStoneMeasure}
                                        onChange={handleChange}
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
                                        value={formData.fantasyStonePricePerCarat}
                                        onChange={handleChange}
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
                                        value={formData.fantasyStoneTotal}
                                        onChange={handleChange}
                                        className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter total"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    onClick={() => { handleSaveSection("fantasyStone"); setShowFantasySection(false); }}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    onClick={() => setShowFantasySection(false)}
                                >
                                    Exit
                                </button>
                            </div>
                        </div>
                    )}

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
                            className="bg-green-500 text-white px-12 py-2 rounded mr-3 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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