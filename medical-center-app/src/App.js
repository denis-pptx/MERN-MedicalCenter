import React from 'react'
import Navbar from './components/UI//Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import AuthProvider from './components/AuthProvider';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <AppRouter />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
