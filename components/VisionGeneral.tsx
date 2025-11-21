import React from 'react';
import { visionGeneralCards, courseInfo } from '../constants';
import type { VisionCard } from '../types';

const InfoCard: React.FC<{ card: VisionCard }> = ({ card }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#681617]">
    <div className="flex items-center space-x-4">
      <span className="text-3xl">{card.icon}</span>
      <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
    </div>
    <p className="mt-4 text-gray-600">
      {card.description}
    </p>
  </div>
);

const CourseDetails: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#681617]">
    <div className="flex items-center justify-center space-x-4 mb-4">
        <span className="text-3xl">📋</span>
        <h3 className="text-2xl font-bold text-gray-800">Detalles del Curso</h3>
    </div>
    <div className="space-y-4">
        <div className="md:col-span-2 text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase">Curso</p>
            <p className="text-xl text-gray-900">{courseInfo.name}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center pt-4 border-t">
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Docente</p>
                <p className="text-lg text-gray-900">{courseInfo.teacher}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Licenciatura</p>
                <p className="text-lg text-gray-900">{courseInfo.degree}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Semestre</p>
                <p className="text-lg text-gray-900">{courseInfo.semester}</p>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase">Horas / Créditos</p>
                <p className="text-lg text-gray-900">{courseInfo.totalHours} / {courseInfo.credits}</p>
            </div>
        </div>
    </div>
  </div>
);

export const VisionGeneral: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700">Bienvenida/o al Curso</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Este espacio está diseñado para guiarte a través de los objetivos, dominios y competencias que desarrollarás durante el semestre. Explora las secciones para conocer a fondo la estructura del curso.
        </p>
      </div>

      <CourseDetails />

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {visionGeneralCards.map((card) => (
          <InfoCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
};