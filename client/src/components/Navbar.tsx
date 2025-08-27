'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Finance
              </h1>
            </div>
          </div>
          {user && (
            <div className="flex items-center space-x-6">
              <div className="hidden md:block">
                <span className="text-gray-600">Welcome back,</span>
                <span className="ml-1 font-semibold text-gray-800">{user.name}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={logout}
                className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
              >
                🚪 Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}