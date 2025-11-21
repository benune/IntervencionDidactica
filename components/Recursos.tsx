
import React from 'react';
import { bibliographicResources, audiovisualResources } from '../constants';
import type { Resource } from '../types';

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ResourceList: React.FC<{ title: string; resources: Resource[]; icon: string; }> = ({ title, resources, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4 mb-4 border-b-2 border-[#681617] pb-2">
      <span className="text-3xl">{icon}</span>
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    <ul className="space-y-3">
      {resources.map((resource, index) => (
        <li key={index} className="text-gray-600">
          {resource.url ? (
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              {resource.reference}
              <LinkIcon />
            </a>
          ) : (
            <span>{resource.reference}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export const Recursos: React.FC = () => {
  return (
    <div className="space-y-8">
      <ResourceList icon="📚" title="Referencias Bibliográficas" resources={bibliographicResources} />
      <ResourceList icon="📽️" title="Recursos Audiovisuales" resources={audiovisualResources} />
    </div>
  );
};