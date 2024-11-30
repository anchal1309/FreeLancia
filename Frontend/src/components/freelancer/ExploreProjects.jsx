import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from '../Footer';

const mockProjects = [
  {
    id: 1,
    title: 'E-commerce Website Development',
    description: 'Looking for a skilled developer to build a modern e-commerce platform with React and Node.js.',
    budget: '$3000-$5000',
    duration: '2-3 months',
    skills: ['React', 'Node.js', 'MongoDB'],
    postedBy: 'Tech Solutions Inc.',
    postedDate: '2 days ago',
  },
  {
    id: 2,
    title: 'Mobile App UI Design',
    description: 'Need a creative UI/UX designer for a fitness tracking mobile application.',
    budget: '$2000-$3000',
    duration: '1-2 months',
    skills: ['UI Design', 'Figma', 'Mobile Design'],
    postedBy: 'FitTech Studios',
    postedDate: '1 day ago',
  },
];

export default function ExploreProjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  const allSkills = Array.from(
    new Set(mockProjects.flatMap((project) => project.skills))
  );

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 ||
      selectedSkills.some(skill => project.skills.includes(skill));

    return matchesSearch && matchesSkills;
  });

  const handleApply = (projectId) => {
    navigate(`/project/${projectId}/apply`);
  };

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Explore Available Projects</h1>
        <p className="mt-2 text-gray-600">Find your next opportunity</p>
      </div>

      <div className="mb-8">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedSkills.includes(skill)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                <span className="text-sm text-gray-500">{project.postedDate}</span>
              </div>
              <p className="mt-2 text-gray-600">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  <span className="font-medium text-gray-900">{project.budget}</span>
                  <span className="mx-2">•</span>
                  <span>{project.duration}</span>
                </div>
                <span className="text-gray-500">by {project.postedBy}</span>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <Link to='/apply'>
              <button
                // onClick={() => handleApply(project.id)}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Now
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}