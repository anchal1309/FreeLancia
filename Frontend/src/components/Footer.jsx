import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TalentMatch</h3>
            <p className="text-gray-400 text-sm">
              Connecting talented freelancers with amazing projects worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Freelancers</h4>
            <ul className="space-y-2 text-blue-400 text-sm">
              <li><Link to='/exploreprojects'>Find Projects</Link></li>
              <li>Success Stories</li>
              <li>Resources</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Post a Project</li>
              <li><Link to='/explorefreelancers'>Find Talent</Link></li>
              <li>Enterprise</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} TalentMatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}