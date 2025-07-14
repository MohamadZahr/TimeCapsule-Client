import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
const MainLayout = () => {

    const handleLogout = () => {
        console.log('User logged out');
    }
    return (
        <>
            <Header onLogout={handleLogout} />
            <Outlet />
        </>
    );
}
export default MainLayout;