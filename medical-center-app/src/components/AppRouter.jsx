import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import Catalog from '../pages/Catalog';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/catalog" element={<Catalog />} />
        </Routes>
    );
};

export default AppRouter;