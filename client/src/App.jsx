import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/style.css";
import "./charts/ChartjsConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./utils/protectedRoutes";
import Login from "./pages/auth/Login";
import Signup from './pages/auth/Signup';
import Loader from ".components/common/Loader";
import Lotts from "./pages/warehouse/Lots/Lotts";
import AverageCost from "./pages/warehouse/AverageCost/AverageCost";
import UpdatePrice from "./pages/warehouse/UpdatePrice/UpdatePrice";
import StoneStock from "./pages/warehouse/StoneStock/StoneStock";
import JewelleryLoad from "./pages/warehouse/JewelleryManagement/JewelleryLoad";
import AddJewellery from "./pages/warehouse/JewelleryManagement/AddJewellery";
import EditJewellery from "./pages/warehouse/JewelleryManagement/EditJewellery";

const Clients = lazy(() => import("./pages/anagraphic/clients/Clients"));
const AddClients = lazy(() => import("./pages/anagraphic/clients/AddClients"));
const EditClient = lazy(() => import("./pages/anagraphic/clients/EditClient"));
const Users = lazy(() => import("./pages/anagraphic/users/Users"));
const AddUser = lazy(() => import("./pages/anagraphic/users/AddUser"));
const UpdateUser = lazy(() => import("./pages/anagraphic/users/UpdateUser"));
const AddSupplier = lazy(() => import("./pages/anagraphic/suppliers/AddSupplier"));
const Suppliers = lazy(() => import("./pages/anagraphic/suppliers/Suppliers"));
const EditSupplier = lazy(() => import("./pages/anagraphic/suppliers/EditSupplier"));
const Quality = lazy(() => import("./pages/anagraphic/quality/Quality"));
const AddQuality = lazy(() => import("./pages/anagraphic/quality/AddQuality"));
const EditQuality = lazy(() => import("./pages/anagraphic/quality/EditQuality"));
const Colors = lazy(() => import("./pages/anagraphic/colors/Colors"));
const AddColors = lazy(() => import("./pages/anagraphic/colors/AddColors"));
const EditColor = lazy(() => import("./pages/anagraphic/colors/EditColor"));
const Stones = lazy(() => import("./pages/anagraphic/stones/Stones"));
const AddStones = lazy(() => import("./pages/anagraphic/stones/AddStones"));
const EditStone = lazy(() => import("./pages/anagraphic/stones/EditStone"));
const JewelleryRules = lazy(() => import("./pages/anagraphic/jewellery_rules/JewelleryRules"));
const JewelleryTypes = lazy(() => import("./pages/anagraphic/jewellery_types/JewelleryTypes"));
const AddJewelleryType = lazy(() => import("./pages/anagraphic/jewellery_types/AddJewelleryType"));
const EditJewelleryType = lazy(() => import("./pages/anagraphic/jewellery_types/EditJewelleryType"));
const AddLots = lazy(() => import("./pages/warehouse/Lots/AddLots"));
const EditLot = lazy(() => import("./pages/warehouse/Lots/EditLot"));
const Stock = lazy(() => import("./pages/warehouse/Stock/Stock"));

axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <Suspense fallback={<Loader />}>
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Clients Routes */}
          <Route path="/clients" element={<Clients />} />
          <Route path="/add-clients" element={<AddClients />} />
          <Route path="/update-client/:id" element={<EditClient />} />

          {/* User Routes */}
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" exact element={<AddUser />} />
          <Route path="/update-user/:id" exact element={<UpdateUser />} />

          {/* Suppliers Routes */}
          <Route path="/suppliers" exact element={<Suppliers />} />
          <Route path="/add-supplier" exact element={<AddSupplier />} />
          <Route path="/update-supplier/:id" element={<EditSupplier />} />

          {/* Quality Routes */}
          <Route path="/quality" exact element={<Quality />} />
          <Route path="/add-quality" exact element={<AddQuality />} />
          <Route path="/update-quality/:id" element={<EditQuality />} />

          {/* Colors Routes */}
          <Route path="/colors" exact element={<Colors />} />
          <Route path="/add-color" exact element={<AddColors />} />
          <Route path="/update-color/:id" element={<EditColor />} />

          {/* Stone Routes */}
          <Route path="/large-stones" exact element={<Stones />} />
          <Route path="/add-stone" exact element={<AddStones />} />
          <Route path="//update-stone/:id" element={<EditStone />} />

          {/* jewellery rules */}
          <Route path="/jewellery-rules" exact element={<JewelleryRules />} />
          <Route path="/jewellery-type" exact element={<JewelleryTypes />} />
          <Route path="/add-jewellery-type" exact element={<AddJewelleryType />} />
          <Route path="/update-jewellery-type/:id" exact element={<EditJewelleryType />} />

          {/* WareHouse Routes */}
          {/* Load Route */}
          <Route path="/lots" exact element={<Lotts />} />
          <Route path="/add-lots" exact element={<AddLots />} />
          <Route path="/update-lot/:id" exact element={<EditLot />} />

          {/* Stock Route */}
            <Route path="/stock" exact element={<Stock />} />
            
          {/* AverageCost Route */}
          <Route path="/average-cost" exact element={<AverageCost />} />
            
          {/* update price route */}
            <Route path="/update-price" exact element={<UpdatePrice />} />

            {/* Stone Stock */}
            <Route path="/stone-stock" exact element={<StoneStock />} />

            {/* jewellery load managemnet */}
            <Route path="/jewellery" exact element={<JewelleryLoad />} />
          <Route path="/add-jewellery" exact element={<AddJewellery />} />
          <Route path="/update-jewellery/:id" exact element={<EditJewellery />} />

        </Route>
        {/* protected routes end here */}

        {/* public routes */}
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        </Routes>
        </Suspense>
    </>
  );
}

export default App;
