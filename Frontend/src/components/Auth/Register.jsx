import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('freelancer');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    skills: '',
    experienceLevel: 'beginner',
    about: '',
    companyName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, navigate to the appropriate dashboard
    // In a real app, you would handle registration first
    navigate(userType === 'freelancer' ? '/freelancer' : '/employer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-light dark:bg-dark">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-light dark:text-dark">
            Create your account
          </h2>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            type="button"
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
            type="button"
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
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="username" className="sr-only">Username</label>
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
              <label htmlFor="phone" className="sr-only">Phone</label>
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

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
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

            {userType === 'freelancer' ? (
              <>
                <div>
                  <label htmlFor="skills" className="sr-only">Skills</label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                    placeholder="Skills (comma separated)"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="experienceLevel" className="sr-only">Experience Level</label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="companyName" className="sr-only">Company Name</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="about" className="sr-only">About</label>
              <textarea
                id="about"
                name="about"
                required
                rows="4"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-light dark:border-dark placeholder-gunsmoke text-light dark:text-dark focus:outline-none focus:ring-oxley focus:border-oxley"
                placeholder="About"
                value={formData.about}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-oxley hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oxley"
            >
              Register
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-oxley hover:opacity-90"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}