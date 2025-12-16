import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;