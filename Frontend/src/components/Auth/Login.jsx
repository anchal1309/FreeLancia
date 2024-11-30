// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     phone: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // For demo purposes, navigate to freelancer dashboard
//     // In a real app, you would validate credentials first
//     navigate('/freelancer');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-light dark:bg-dark">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-bold text-light dark:text-dark">
//             Sign in to your account
//           </h2>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="username" className="sr-only">Username</label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="phone" className="sr-only">Phone</label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
//                 placeholder="Phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-oxley hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxley"
//             >
//               Sign in
//             </button>
//           </div>

//           <div className="text-center">
//             <Link
//               to="/register"
//               className="font-medium text-oxley hover:opacity-90"
//             >
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('freelancer'); // Default to freelancer
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the appropriate dashboard based on user type
    navigate(`/${userType}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-light dark:bg-dark">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-light dark:text-dark">
            Sign in to your account
          </h2>
        </div>

        {/* User Type Selection */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setUserType('freelancer')}
            className={`px-4 py-2 rounded-lg ${
              userType === 'freelancer'
                ? 'bg-oxley text-white'
                : 'bg-gunsmoke text-white opacity-75'
            }`}
          >
            Freelancer
          </button>
          <button
            onClick={() => setUserType('employer')}
            className={`px-4 py-2 rounded-lg ${
              userType === 'employer'
                ? 'bg-oxley text-white'
                : 'bg-gunsmoke text-white opacity-75'
            }`}
          >
            Employer
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-oxley hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxley"
            >
              Sign in as {userType === 'freelancer' ? 'Freelancer' : 'Employer'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/register"
              className="font-medium text-oxley hover:opacity-90"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
