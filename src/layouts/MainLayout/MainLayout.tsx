
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";


const MainLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = localStorage.getItem('user');

        if (!user) {
            navigate('/SignIn');
        }
    }, []);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
export default MainLayout;