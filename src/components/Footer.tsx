import { PawPrint, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-green-600">AJUDATODOS</span>
            </div>
            <p className="text-gray-600 text-sm">
              Salvando vidas através da tecnologia, amor e dedicação.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-4">Useful links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">About us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Blogs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Main Menu */}
          <div>
            <h3 className="mb-4">Main Menu</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Offers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Menus</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Reservation</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>example@email.com</li>
              <li>+64 958 248 966</li>
              <li className="text-sm">Social media</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-6 text-center text-gray-600 text-sm">
          Copyright © 2025 | All rights reserved
        </div>
      </div>
    </footer>
  );
}
