import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout/MainLayout';
import LandingPage from '../pages/Landing/LandingPage';
import AuthPage from '../pages/Auth/AuthPage';
import PublicWallPage from '../pages/PublicWall/PublicWallPage';
import CreateCapsulePage from '../pages/CreateCapsule/CreateCapsulePage';
import PrivateWallPage from '../pages/PrivateWall/PrivateWallPage';
import CapsuleDetailsPage from '../pages/CapsuleDetails/CapsuleDetailsPage';

const AppRoutes = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/SignIn" element={<AuthPage />} />
            
            <Route element={<MainLayout />}>
               <Route path="/PublicWall" element={<PublicWallPage />} />
               <Route path="/PrivateWall" element={<PrivateWallPage />} />
               <Route path="/CreateCapsule" element={<CreateCapsulePage />} />
               <Route path="/capsule/details" element={<CapsuleDetailsPage />} />
            </Route>
         </Routes>
      </>
   )

}
export default AppRoutes;