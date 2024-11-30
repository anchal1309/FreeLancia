// import { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const mockData = {
//   recommendations: [
//     { id: 1, title: 'Web App Development', budget: '$3000', skills: ['React', 'Node.js'] },
//     { id: 2, title: 'UI/UX Design', budget: '$2000', skills: ['Figma', 'Adobe XD'] },
//   ],
//   stats: [
//     { name: 'Jan', earnings: 4000 },
//     { name: 'Feb', earnings: 3000 },
//     { name: 'Mar', earnings: 5000 },
//     { name: 'Apr', earnings: 4500 },
//   ],
// };

// export default function FreelancerDashboard() {
//   const [activeTab, setActiveTab] = useState('recommendations');

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Freelancer Dashboard</h1>
//       </div>

//       <div className="mb-8">
//         <nav className="flex space-x-4">
//           {['recommendations', 'active', 'completed', 'analytics'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-3 py-2 rounded-md text-sm font-medium ${
//                 activeTab === tab
//                   ? 'bg-blue-100 text-blue-700'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {activeTab === 'recommendations' && (
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {mockData.recommendations.map((project) => (
//             <div
//               key={project.id}
//               className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
//             >
//               <div className="px-4 py-5 sm:p-6">
//                 <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
//                 <p className="mt-1 text-sm text-gray-500">Budget: {project.budget}</p>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {project.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <div className="px-4 py-4 sm:px-6">
//                 <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
//                   Apply Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {activeTab === 'analytics' && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Earnings</h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={mockData.stats}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="earnings" fill="#3B82F6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from './Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

const mockData = {
  recommendations: [
    { id: 1, title: 'Web App Development', budget: '$3000', skills: ['React', 'Node.js'] },
    { id: 2, title: 'UI/UX Design', budget: '$2000', skills: ['Figma', 'Adobe XD'] },
  ],
  stats: [
    { name: 'Jan', earnings: 4000 },
    { name: 'Feb', earnings: 3000 },
    { name: 'Mar', earnings: 5000 },
    { name: 'Apr', earnings: 4500 },
  ],
};

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState('recommendations');

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Freelancer Dashboard</h1>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-4">
            {['recommendations', 'active', 'completed', 'analytics'].map((tab) => (
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

        {activeTab === 'recommendations' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockData.recommendations.map((project) => (
              <div
                key={project.id}
                className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">Budget: {project.budget}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <Link to='/apply'>
                  <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Earnings</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="earnings" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}
