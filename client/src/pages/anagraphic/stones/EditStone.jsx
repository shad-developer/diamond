import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import StoneForm from "../../../components/forms/StoneForm";
import { getStoneById, updateStone } from "../../../app/features/stoneSlice";

const initialState = {
  certificateNo: "",
  cuts: "",
  carats: "",
  degrees: "",
  color: "",
  proportions: "",
  finish: "",
  brilliance: "",
  fluorescence: "",
  price_per_carat: "",
  finished_stone_price: "",
  public_price: "",
  note: "",
  average: "",
  costs: "",
  finished_cost: "",
  total_compl: "",
};

const EditStone = () => {
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stone, isLoading, isSuccess } = useSelector((state) => state.stone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (id) {
      dispatch(getStoneById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (stone) {
      setFormData({
        certificateNo: stone.certificateNo,
        cuts: stone.cuts,
        carats: stone.carats,
        degrees: stone.degrees,
        color: stone.color,
        proportions: stone.proportions,
        finish: stone.finish,
        brilliance: stone.brilliance,
        fluorescence: stone.fluorescence,
        price_per_carat: stone.price_per_carat,
        finished_stone_price: stone.finished_stone_price,
        public_price: stone.public_price,
        note: stone.note,
        average: stone.average,
        costs: stone.costs,
        finished_cost: stone.finished_cost,
        total_compl: stone.total_compl,
      });
    }
  }, [stone]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateStone({ id, formData }));

    if (isSuccess) {
      navigate("/large-stones");
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Modify Stone</h2>
        <StoneForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          isLoading={isLoading}
        />
      </div>
    </DashboardLayout>
  );
};

export default EditStone;
