import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import IpAddrTable from "./pages/IpAddrTable";
import MTUcalculator from "./pages/MTUcalculator";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ip-addr-table" element={<IpAddrTable />} />
                <Route path="/mtu-calculator" element={<MTUcalculator />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;