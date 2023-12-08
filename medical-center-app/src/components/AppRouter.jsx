import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import Services from '../pages/Services';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
