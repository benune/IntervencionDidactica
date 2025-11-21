
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { VisionGeneral } from './components/VisionGeneral';
import { RutaAprendizaje } from './components/RutaAprendizaje';
import { Recursos } from './components/Recursos';
import type { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('vision');

  const renderContent = () => {
    switch (activeTab) {
      case 'ruta':
        return <RutaAprendizaje />;
      case 'recursos':
        return <Recursos />;
      case 'vision':
      default:
        return <VisionGeneral />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#681617]">
          Ruta de Aprendizaje Interactivo
        </h1>
        <p className="mt-2 text-center text-lg text-gray-600">
          Una guía para el curso: Intervención didáctica pedagógica del trabajo docente.
        </p>
        
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Benemérita Escuela Normal Urbana Nocturna del Estado "Ing. José G. Valenzuela"</p>
      </footer>
    </div>
  );
};

export default App;
