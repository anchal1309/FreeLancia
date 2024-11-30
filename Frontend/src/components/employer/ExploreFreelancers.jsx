// import { useState } from 'react';
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// const mockFreelancers = [
//   {
//     id: 1,
//     name: 'John Doe',
//     title: 'Full Stack Developer',
//     rating: 4.8,
//     hourlyRate: 45,
//     skills: ['React', 'Node.js', 'TypeScript'],
//     image: 'https://i.pravatar.cc/150?img=1',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     title: 'UI/UX Designer',
//     rating: 4.9,
//     hourlyRate: 55,
//     skills: ['Figma', 'Adobe XD', 'UI Design'],
//     image: 'https://i.pravatar.cc/150?img=2',
//   },
// ];

// export default function ExploreFreelancers() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   const allSkills = Array.from(
//     new Set(mockFreelancers.flatMap((freelancer) => freelancer.skills))
//   );

//   const toggleSkill = (skill) => {
//     setSelectedSkills((prev) =>
//       prev.includes(skill)
//         ? prev.filter((s) => s !== skill)
//         : [...prev, skill]
//     );
//   };

//   const filteredFreelancers = mockFreelancers.filter((freelancer) => {
//     const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       freelancer.title.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesSkills = selectedSkills.length === 0 ||
//       selectedSkills.some(skill => freelancer.skills.includes(skill));

//     return matchesSearch && matchesSkills;
//   });

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Explore Talented Freelancers</h1>
//         <p className="mt-2 text-gray-600">Find the perfect match for your project</p>
//       </div>

//       <div className="mb-8">
//         <div className="flex gap-4 items-center">
//           <div className="flex-1 relative">
//             <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name or title..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="mt-4 flex flex-wrap gap-2">
//           {allSkills.map((skill) => (
//             <button
//               key={skill}
//               onClick={() => toggleSkill(skill)}
//               className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 selectedSkills.includes(skill)
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {skill}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredFreelancers.map((freelancer) => (
//           <div key={freelancer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="p-6">
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={freelancer.image}
//                   alt={freelancer.name}
//                   className="h-16 w-16 rounded-full"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">{freelancer.name}</h3>
//                   <p className="text-gray-600">{freelancer.title}</p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <div className="flex items-center text-sm text-gray-500">
//                   <span className="font-medium text-gray-900">${freelancer.hourlyRate}</span>
//                   <span className="ml-1">/ hour</span>
//                   <span className="ml-4">★ {freelancer.rating}</span>
//                 </div>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {freelancer.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
//               <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                 View Profile
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from './Header';

const ExploreFreelancers = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const gigs = [
    {
      id: 1,
      title: "I will create modern logo design",
      seller: "John Doe",
      rating: 4.9,
      reviews: 182,
      price: 50,
      image: "https://images.unsplash.com/photo-1626785774625-8a6387f6c7c1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Logo Design"
    },
    {
      id: 2,
      title: "I will design your website UI/UX",
      seller: "Jane Smith",
      rating: 4.8,
      reviews: 143,
      price: 120,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Web Design"
    },
    {
      id: 3,
      title: "I will create stunning AI art",
      seller: "Mike Wilson",
      rating: 5.0,
      reviews: 89,
      price: 75,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "AI Art"
    },
    {
      id: 4,
      title: "I will edit your videos professionally",
      seller: "Sarah Johnson",
      rating: 4.7,
      reviews: 256,
      price: 95,
      image: "https://images.unsplash.com/photo-1574717024453-354639eb3c9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Video Editing"
    }
  ];

  return (
    <>
          <Header/>
    <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="All">All Categories</option>
          <option value="Logo Design">Logo Design</option>
          <option value="Web Design">Web Design</option>
          <option value="AI Art">AI Art</option>
          <option value="Video Editing">Video Editing</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">Budget</option>
          <option value="0-50">Under $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100+">$100+</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>

      {/* Gigs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gigs.map((gig) => (
          <Link key={gig.id} to='/details'>
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={gig.image}
                alt={gig.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${gig.seller}&background=random`}
                    alt={gig.seller}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-medium">{gig.seller}</span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{gig.title}</h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm">
                    {gig.rating} ({gig.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">STARTING AT</span>
                  <span className="font-bold text-lg">${gig.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ExploreFreelancers;
