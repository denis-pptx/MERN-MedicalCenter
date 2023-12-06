import React from 'react'
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
