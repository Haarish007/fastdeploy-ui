import { Outlet } from "react-router-dom";
import  RootLayout  from "./RootLayout";

const MainLayout = () => {
    return (
        <RootLayout>
            <Outlet />
        </RootLayout>
    );
};

export default MainLayout;