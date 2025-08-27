'use client';

import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="AI Finance Logo"
            width={180}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {!user && (
            <>
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600">
                Testimonials
              </a>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onLoginClick}>
              Login
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;