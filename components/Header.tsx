import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <img 
              className="h-16 w-auto" 
              src="https://benune.github.io/home/images/LogoBENUNE_WhiteCircleBG.png" 
              alt="Logo BENUNE" 
            />
          </div>
          <div className="hidden md:block text-right">
            <h1 className="text-lg font-semibold text-gray-700">
              Benemérita Escuela Normal Urbana Nocturna del Estado
            </h1>
            <p className="text-sm text-gray-500">"Ing. José G. Valenzuela"</p>
          </div>
        </div>
      </div>
    </header>
  );
};