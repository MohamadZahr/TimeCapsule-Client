import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import LandingPage from '../pages/Landing/LandingPage';
import AuthPage from '../pages/Auth/AuthPage';
import PublicWallPage from '../pages/PublicWall/PublicWallPage';
import CreateCapsulePage from '../pages/CreateCapsule/CreateCapsulePage';

const AppRoutes = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/SignIn" element={<AuthPage />} />
            
            <Route element={<MainLayout />}>
               <Route path="/PublicWall" element={<PublicWallPage />} />
               <Route path="/CreateCapsule" element={<CreateCapsulePage />} />
            </Route>
         </Routes>
      </>
   )

}
export default AppRoutes;