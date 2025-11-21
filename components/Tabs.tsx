
import React from 'react';
import type { Tab } from '../types';

interface TabsProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabItems: { id: Tab; label: string }[] = [
  { id: 'vision', label: 'Visión General' },
  { id: 'ruta', label: 'Ruta de Aprendizaje' },
  { id: 'recursos', label: 'Recursos Clave' },
];

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-8 border-b border-gray-200">
      <nav className="-mb-px flex justify-center space-x-2 sm:space-x-8" aria-label="Tabs">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id
                ? 'border-[#681617] text-[#681617]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 sm:px-4 border-b-2 font-medium text-sm sm:text-base transition-colors duration-200 focus:outline-none`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
