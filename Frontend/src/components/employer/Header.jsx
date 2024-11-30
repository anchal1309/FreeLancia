import { Link, useLocation } from 'react-router-dom';
import { BellIcon, UserCircle, Settings, Moon, Sun, KeyRound, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import Login from '../Auth/Login';
import Notifications from './employerNotification';

export default function Header() {
  const location = useLocation();
  const isAuthenticated = location.pathname !== '/';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const userType = location.pathname.includes('freelancer') ? 'freelancer' : 'employer';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add your theme implementation logic here
  };

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to={`/${userType}`} className="text-2xl font-bold text-blue-600">
                TalentMatch
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to='/employer/*'
                className="border-transparent text-blue-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to='/explorefreelancers'
                className="border-transparent text-blue-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Explore
              </Link>
              {/* <a href='./ExploreProjects.jsx'>Explore</a> */}
              <Link
                to='/messages'
                className="border-transparent text-blue-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Messages
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 rounded-full text-blue-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button> */}

            
                        {/* Bell Icon */}
                        <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-full text-blue-400 hover:text-gray-500"
            >
              <BellIcon className="h-6 w-6" />
            </button>
            {isNotificationsOpen && <Notifications onClose={() => setIsNotificationsOpen(false)} />}
            
            {/* Profile Menu */}
            <div className="relative profile-menu">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
              >
                <UserCircle className="h-6 w-6 text-blue-400" />
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <Link
                      to='/editprofileE'
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircle className="h-4 w-4 mr-3" />
                      Edit Profile
                    </Link>
                    {/* <Link to='/theme'> */}
                    <button
                      onClick={toggleTheme}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {isDarkMode ? (
                        <Sun className="h-4 w-4 mr-3" />
                      ) : (
                        <Moon className="h-4 w-4 mr-3" />
                      )}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <Link
                      to='/passwordE'
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <KeyRound className="h-4 w-4 mr-3" />
                      Change Password
                    </Link>
                    <hr className="my-1" />
                    <Link
                      to="/"
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}