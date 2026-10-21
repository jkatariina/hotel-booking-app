import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminPage from "./components/AdminPage";

const isAdminPage = window.location.pathname === "/admin-secret-bookings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{isAdminPage ? <AdminPage /> : <App />}</React.StrictMode>);
