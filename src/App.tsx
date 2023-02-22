import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import IpAddrTable from "./pages/IpAddrTable";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ip-addr-table" element={<IpAddrTable />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;