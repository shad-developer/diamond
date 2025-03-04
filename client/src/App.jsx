import React, { useEffect } from "react";
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

import Clients from './pages/anagraphic/clients/Clients';
import AddClients from './pages/anagraphic/clients/AddClients';
import EditClient from './pages/anagraphic/clients/EditClient';
import Users from './pages/anagraphic/users/Users';
import AddUser from './pages/anagraphic/users/AddUser';
import UpdateUser from './pages/anagraphic/users/UpdateUser';
import AddSupplier from "./pages/anagraphic/suppliers/AddSupplier";
import Suppliers from "./pages/anagraphic/suppliers/Suppliers";
import EditSupplier from "./pages/anagraphic/suppliers/EditSupplier";
import Quality from "./pages/anagraphic/quality/Quality";
import AddQuality from "./pages/anagraphic/quality/AddQuality";
import EditQuality from "./pages/anagraphic/quality/EditQuality";
import Colors from "./pages/anagraphic/colors/Colors";
import AddColors from "./pages/anagraphic/colors/AddColors";
import EditColor from "./pages/anagraphic/colors/EditColor";
import Stones from "./pages/anagraphic/stones/Stones";
import AddStones from "./pages/anagraphic/stones/AddStones";
import EditStone from "./pages/anagraphic/stones/EditStone";
import JewelleryRules from "./pages/anagraphic/jewellery_rules/JewelleryRules";
import JewelleryTypes from "./pages/anagraphic/jewellery_types/JewelleryTypes";
import AddJewelleryType from "./pages/anagraphic/jewellery_types/AddJewelleryType";
import EditJewelleryType from "./pages/anagraphic/jewellery_types/EditJewelleryType";

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



        </Route> 
        {/* protected routes end here */}

        {/* public routes */}
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
