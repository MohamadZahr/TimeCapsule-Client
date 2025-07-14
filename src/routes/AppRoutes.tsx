import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import LandingPage from '../pages/Landing/LandingPage';
import AuthPage from '../pages/Auth/AuthPage';

const AppRoutes = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/SignIn" element={<AuthPage />} />

            <Route element={<MainLayout />}>
            </Route>
         </Routes>
      </>
   )

}
export default AppRoutes;