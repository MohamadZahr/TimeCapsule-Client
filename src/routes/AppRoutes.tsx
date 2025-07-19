import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import LandingPage from '../pages/Landing/LandingPage';
import AuthPage from '../pages/Auth/AuthPage';
import PublicWallPage from '../pages/PublicWall/PublicWallPage';

const AppRoutes = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/SignIn" element={<AuthPage />} />
            
            <Route element={<MainLayout />}>
               <Route path="/PublicWall" element={<PublicWallPage />} />
            </Route>
         </Routes>
      </>
   )

}
export default AppRoutes;