import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "../../app/features/clientSlice";
function ClientCard() {
  const dispatch = useDispatch();
  const { clients } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white  shadow-sm rounded-xl">
      <div className="px-3 pt-3">
        <div className="flex items-center justify-center">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">
            {clients?.length || "none"}
          </div>
        </div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Total Clients
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ClientCard;
