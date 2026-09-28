import { BrowserRouter, Routes, Route } from "react-router-dom";

import MirrorPage from "./pages/MirrorPage";
import MobileChat from "./components/MobileChat/MobileChat";

import "./components/MobileChat/MobileChat.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<MirrorPage />}
                />

                <Route
                    path="/mobile"
                    element={<MobileChat />}
                />
            </Routes>
        </BrowserRouter>
    );
}