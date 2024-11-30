import React, { useState } from 'react';
import { Star, Clock, RefreshCw, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Header from './employer/Header';
import Footer from './Footer';

const packages = {
  basic: {
    name: 'Basic Package',
    price: 50,
    delivery: '2 days',
    revisions: 1,
    features: [
      '1 concept included',
      'Logo transparency',
      'Vector file',
      'Printable file'
    ]
  },
  standard: {
    name: 'Standard Package',
    price: 100,
    delivery: '3 days',
    revisions: 3,
    features: [
      '3 concepts included',
      'Logo transparency',
      'Vector file',
      'Printable file',
      'Source file',
      'Social media kit'
    ]
  },
  premium: {
    name: 'Premium Package',
    price: 200,
    delivery: '5 days',
    revisions: 'Unlimited',
    features: [
      '5 concepts included',
      'Logo transparency',
      'Vector file',
      'Printable file',
      'Source file',
      'Social media kit',
      'Stationery designs',
      '3D mockup'
    ]
  }
};

export default function GigDetails() {
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const { id } = useParams();

  const gigData = {
    title: "I will create modern logo design",
    seller: "John Doe",
    rating: 4.9,
    reviews: 182,
    image: "https://images.unsplash.com/photo-1626785774625-8a6387f6c7c1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "I will design a modern, minimal, and unique logo for your business. The design will be professional and memorable, helping your brand stand out from the competition."
  };

  return (
    <>
              <Header/>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{gigData.title}</h1>
          <div className="flex items-center mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${gigData.seller}&background=random`}
              alt={gigData.seller}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="font-semibold text-lg">{gigData.seller}</h2>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{gigData.rating}</span>
                <span className="mx-2">•</span>
                <span>{gigData.reviews} Reviews</span>
              </div>
            </div>
          </div>

          <img
            src={gigData.image}
            alt={gigData.title}
            className="w-full rounded-lg mb-6"
          />

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">About This Gig</h3>
            <p className="text-gray-600">{gigData.description}</p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Why Choose Me?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-green-500 mr-2 mt-1" />
                <div>
                  <h4 className="font-medium">Quick Delivery</h4>
                  <p className="text-sm text-gray-600">Fast turnaround time</p>
                </div>
              </div>
              <div className="flex items-start">
                <RefreshCw className="w-5 h-5 text-green-500 mr-2 mt-1" />
                <div>
                  <h4 className="font-medium">Unlimited Revisions</h4>
                  <p className="text-sm text-gray-600">Until you're satisfied</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="sticky top-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex border-b">
              {Object.keys(packages).map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`flex-1 px-4 py-3 text-center font-medium ${
                    selectedPackage === pkg
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {packages[pkg].name}
                </button>
              ))}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">${packages[selectedPackage].price}</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{packages[selectedPackage].delivery} Delivery</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{packages[selectedPackage].revisions} Revisions</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {packages[selectedPackage].features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Continue (${packages[selectedPackage].price})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}