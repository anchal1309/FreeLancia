import React, { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from '../Footer';

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Header/>
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
          <Link key={gig.id} to={`/gig/${gig.id}`}>
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
      <Footer/>
    </div>
  );
};

export default ExploreFreelancers;