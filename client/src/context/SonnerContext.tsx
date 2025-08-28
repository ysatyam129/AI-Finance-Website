'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import Sonner, { SonnerProps } from '@/components/ui/sonner';

interface SonnerContextType {
  showSonner: (sonner: Omit<SonnerProps, 'id' | 'onClose'>) => string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  loading: (title: string, description?: string) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const SonnerContext = createContext<SonnerContextType | undefined>(undefined);

export const useSonner = () => {
  const context = useContext(SonnerContext);
  if (!context) {
    throw new Error('useSonner must be used within a SonnerProvider');
  }
  return context;
};

interface SonnerProviderProps {
  children: ReactNode;
}

export const SonnerProvider = ({ children }: SonnerProviderProps) => {
  const [sonners, setSonners] = useState<(SonnerProps & { id: string })[]>([]);

  const removeSonner = (id: string) => {
    setSonners(prev => prev.filter(sonner => sonner.id !== id));
  };

  const showSonner = (sonner: Omit<SonnerProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newSonner = { ...sonner, id, onClose: removeSonner };
    setSonners(prev => [...prev, newSonner]);
    return id;
  };

  const success = (title: string, description?: string) => {
    return showSonner({ title, description, type: 'success' });
  };

  const error = (title: string, description?: string) => {
    return showSonner({ title, description, type: 'error' });
  };

  const warning = (title: string, description?: string) => {
    return showSonner({ title, description, type: 'warning' });
  };

  const info = (title: string, description?: string) => {
    return showSonner({ title, description, type: 'info' });
  };

  const loading = (title: string, description?: string) => {
    return showSonner({ title, description, type: 'loading', duration: 0 });
  };

  const dismiss = (id: string) => {
    removeSonner(id);
  };

  const dismissAll = () => {
    setSonners([]);
  };

  return (
    <SonnerContext.Provider value={{ 
      showSonner, 
      success, 
      error, 
      warning, 
      info, 
      loading, 
      dismiss, 
      dismissAll 
    }}>
      {children}
      
      {/* Sonner Container */}
      <div className="fixed top-4 left-4 z-[9998] space-y-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {sonners.map((sonner) => (
            <div key={sonner.id} className="pointer-events-auto">
              <Sonner {...sonner} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </SonnerContext.Provider>
  );
};