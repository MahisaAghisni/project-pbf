"use client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Components/Layout";
import Employee from "./Pages/Employee/Employee";
import AddEmployee from "./Pages/Employee/AddEmployee";
import EditEmployee from "./Pages/Employee/EditEmployee";
import Products from "./Pages/Products/Products";
import AddProducts from "./Pages/Products/AddProducts";
import EditProducts from "./Pages/Products/EditProducts";
import Payments from "./Pages/Payments/Payments";
import AddPayments from "./Pages/Payments/AddPayments";
import EditPayments from "./Pages/Payments/EditPayments";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import User from "./Pages/User/User";
import AddUser from "./Pages/User/AddUser";
import EditUser from "./Pages/User/EditUser";

export default function Home() {
  return (
    <Router>
      <Routes>
        {/* auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          {/* dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* user */}
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />

          {/* employee */}
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/add" element={<AddEmployee />} />
          <Route path="/employee/edit/:id" element={<EditEmployee />} />

          {/* product */}
          <Route path="/product" element={<Products />} />
          <Route path="/product/add" element={<AddProducts />} />
          <Route path="/product/edit/:id" element={<EditProducts />} />

          {/* payment */}
          <Route path="/payment" element={<Payments />} />
          <Route path="/payment/add" element={<AddPayments />} />
          <Route path="/payment/edit/:id" element={<EditPayments />} />
        </Route>
      </Routes>
    </Router>
  );
}
