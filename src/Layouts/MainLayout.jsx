import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer/Footer';
import Header from '../Components/Shared/Header';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header></Header>
            <main className="flex-grow">
                <Outlet></Outlet>
            </main>
            
            <Footer className=''></Footer>
        </div>
    );
};

export default MainLayout;