import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChangePasswordE from './components/employer/ChangePassword';
import ChangePasswordF from './components/freelancer/ChangePassword';
import EmployerDashboard from './components/employer/EmployerDashboard';
import ExploreFreelancers from './components/employer/ExploreFreelancers';
import MessageE from './components/employer/MessageE';
import ExploreProjects from './components/freelancer/ExploreProjects';
import FreelancerDashboard from './components/freelancer/FreelancerDashboard';
import MessageF from './components/freelancer/MessageF';
import GigDetails from './components/GigDetails';
import ProjectApplication from './components/ProjectApplication';
import ThemeToggle from './components/ThemeToggle';
import useThemeStore from './store/themeStore';
import EditProfileE from './components/employer/EditProfile';
import EditProfileF from './components/freelancer/EditProfile';
import ChatApp from './components/chat/chatapp';

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="relative min-h-screen bg-light dark:bg-dark transition-colors duration-200">
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path='/theme' element={<ThemeToggle/>}/> */}
          <Route path="/register" element={<Register />} />
          <Route path="/freelancer/*" element={<FreelancerDashboard />} />
          <Route path="/employer/*" element={<EmployerDashboard />} />
          <Route path='/messages' element={<MessageE/>}/>
          <Route path='/message' element={<MessageF/>}/>
          <Route path='/details' element={<GigDetails/>}/>
          <Route path='/passwordE' element={<ChangePasswordE/>}/>
          <Route path='/passwordF' element={<ChangePasswordF/>}/>
          <Route path='/explorefreelancers' element={<ExploreFreelancers/>}/>
          <Route path='/exploreprojects' element={<ExploreProjects/>}/>
          <Route path='/editprofileF' element={<EditProfileF/>}/>
          <Route path='/editprofileE' element={<EditProfileE/>}/>
          <Route path='/apply' element={<ProjectApplication/>}/>
          {/* <Route path='/password' element={<Password/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}