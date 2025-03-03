import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStones } from "../../app/features/stoneSlice";

function StoneCard() {
  const dispatch = useDispatch();
  const { stones } = useSelector((state) => state.stone);

  useEffect(() => {
    dispatch(getAllStones());
  }, [dispatch]);
  return (
    <div className="flex justify-center items-center flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white  shadow-sm rounded-xl">
      <div className="px-3 pt-3">
        <div className="flex items-center justify-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {stones?.length || "."}
          </div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Total Stones
          </h2>
        </div>
      </div>
    </div>
  );
}

export default StoneCard;
