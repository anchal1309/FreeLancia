import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { CalendarIcon, UsersIcon, CurrencyDollarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import Footer from '../Footer';

const mockData = {
  freelancers: [
    { id: 1, name: 'John Doe', skills: ['React', 'Node.js'], rating: 4.8 },
    { id: 2, name: 'Jane Smith', skills: ['UI/UX', 'Figma'], rating: 4.9 },
  ],
  projectStats: [
    { name: 'Active', value: 4, color: '#3B82F6' },
    { name: 'Completed', value: 8, color: '#10B981' },
    { name: 'Pending', value: 2, color: '#F59E0B' },
  ],
  monthlyProjects: [
    { month: 'Jan', completed: 3, active: 2 },
    { month: 'Feb', completed: 4, active: 3 },
    { month: 'Mar', completed: 2, active: 4 },
    { month: 'Apr', completed: 5, active: 2 },
    { month: 'May', completed: 3, active: 3 },
    { month: 'Jun', completed: 4, active: 2 },
  ],
  budgetTrend: [
    { month: 'Jan', amount: 5000 },
    { month: 'Feb', amount: 7000 },
    { month: 'Mar', amount: 6500 },
    { month: 'Apr', amount: 8000 },
    { month: 'May', amount: 9500 },
    { month: 'Jun', amount: 11000 },
  ],
  quickStats: {
    totalProjects: 14,
    activeFreelancers: 8,
    totalSpent: 45000,
    projectGrowth: 23,
  },
};

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('post');

  return (
    <>
    <Header />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Projects</p>
              <h3 className="text-xl font-bold">{mockData.quickStats.totalProjects}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Active Freelancers</p>
              <h3 className="text-xl font-bold">{mockData.quickStats.activeFreelancers}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Spent</p>
              <h3 className="text-xl font-bold">${mockData.quickStats.totalSpent}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Project Growth</p>
              <h3 className="text-xl font-bold">+{mockData.quickStats.projectGrowth}%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <nav className="flex space-x-4">
          {['post', 'freelancers', 'active', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === tab
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'post' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Post a New Project</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Required Skills</label>
              <input
                type="text"
                placeholder="e.g., React, Node.js, UI/UX"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Budget</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Post Project
            </button>
          </form>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Project Status Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project Status Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.projectStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {mockData.projectStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Projects Trend */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Projects Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.monthlyProjects}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#10B981" />
                  <Bar dataKey="active" name="Active" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget Trend */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.budgetTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    name="Budget Spent"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { useState } from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   LineChart,
//   Line,
// } from 'recharts';
// import {
//   CalendarIcon,
//   UsersIcon,
//   CurrencyDollarIcon,
//   ChartBarIcon,
// } from '@heroicons/react/24/outline';
// import Header from './Header'; // Import the Header component

// const mockData = {
//   freelancers: [
//     { id: 1, name: 'John Doe', skills: ['React', 'Node.js'], rating: 4.8 },
//     { id: 2, name: 'Jane Smith', skills: ['UI/UX', 'Figma'], rating: 4.9 },
//   ],
//   projectStats: [
//     { name: 'Active', value: 4, color: '#3B82F6' },
//     { name: 'Completed', value: 8, color: '#10B981' },
//     { name: 'Pending', value: 2, color: '#F59E0B' },
//   ],
//   monthlyProjects: [
//     { month: 'Jan', completed: 3, active: 2 },
//     { month: 'Feb', completed: 4, active: 3 },
//     { month: 'Mar', completed: 2, active: 4 },
//     { month: 'Apr', completed: 5, active: 2 },
//     { month: 'May', completed: 3, active: 3 },
//     { month: 'Jun', completed: 4, active: 2 },
//   ],
//   budgetTrend: [
//     { month: 'Jan', amount: 5000 },
//     { month: 'Feb', amount: 7000 },
//     { month: 'Mar', amount: 6500 },
//     { month: 'Apr', amount: 8000 },
//     { month: 'May', amount: 9500 },
//     { month: 'Jun', amount: 11000 },
//   ],
//   quickStats: {
//     totalProjects: 14,
//     activeFreelancers: 8,
//     totalSpent: 45000,
//     projectGrowth: 23,
//   },
// };

// export default function EmployerDashboard() {
//   const [activeTab, setActiveTab] = useState('post');

//   return (
//     <>
//     {/* Add the Header component */}
//     <Header />
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//       <div className="py-8">
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <CalendarIcon className="h-6 w-6 text-blue-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-500">Total Projects</p>
//                 <h3 className="text-xl font-bold">{mockData.quickStats.totalProjects}</h3>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <UsersIcon className="h-6 w-6 text-green-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-500">Active Freelancers</p>
//                 <h3 className="text-xl font-bold">{mockData.quickStats.activeFreelancers}</h3>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <CurrencyDollarIcon className="h-6 w-6 text-yellow-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-500">Total Spent</p>
//                 <h3 className="text-xl font-bold">${mockData.quickStats.totalSpent}</h3>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <ChartBarIcon className="h-6 w-6 text-purple-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm text-gray-500">Project Growth</p>
//                 <h3 className="text-xl font-bold">+{mockData.quickStats.projectGrowth}%</h3>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="mb-8">
//           <nav className="flex space-x-4">
//             {['post', 'freelancers', 'active', 'analytics'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-3 py-2 rounded-md text-sm font-medium ${
//                   activeTab === tab
//                     ? 'bg-blue-100 text-blue-700'
//                     : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Content for each tab */}
//         {activeTab === 'post' && (
//           <div className="bg-white shadow rounded-lg p-6">
//             {/* Post a new project form */}
//           </div>
//         )}
//         {activeTab === 'analytics' && (
//           <div className="space-y-6">
//             {/* Charts for analytics */}
//           </div>
//         )}
//       </div>
//     </div>
//     </>
//   );
// }

