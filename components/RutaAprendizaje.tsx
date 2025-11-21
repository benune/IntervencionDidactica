import React, { useState, useMemo } from 'react';
import { learningUnits } from '../constants';
import type { Session } from '../types';

// --- HELPERS & ICONS ---

const getSessionDate = (session: Session): Date | null => {
    if (!session.date.includes('-')) return null;
    const [day, month] = session.date.split('-').map(Number);
    const year = month >= 9 ? 2025 : 2026; // Asume que el curso abarca 2025-2026
    return new Date(year, month - 1, day);
};

const getSessionHighlightType = (session: Session): 'jornada' | 'related' | 'none' => {
    const content = session.content.toLowerCase();
    if (content.startsWith('jornada de')) {
        return 'jornada';
    }

    const relatedKeywords = [
        'jornada', 'prácticas', 'propuesta de intervención', 'planeación', 'sistematización', 'reflexionar sobre la propia práctica'
    ];

    const textToSearch = (content + ' ' + session.strategy.join(' ')).toLowerCase();

    if (relatedKeywords.some(keyword => textToSearch.includes(keyword))) {
        return 'related';
    }
    return 'none';
};

const CalendarIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg> );
const ListIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg> );
const CloseIcon = () => ( <svg className="h-6 w-6 text-gray-500 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> );
const ChevronLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>);


// --- SUB-COMPONENTS ---

const SessionCard: React.FC<{ session: Session }> = ({ session }) => {
    const highlightType = getSessionHighlightType(session);
    const isJornada = highlightType === 'jornada';
    const isRelated = highlightType === 'related';

    const cardClasses = isJornada ? 'bg-amber-50 border-amber-200'
                      : isRelated ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-white border-gray-200';
    
    const titleClasses = isJornada ? 'text-amber-800'
                       : isRelated ? 'text-emerald-800'
                       : 'text-[#681617]';

    const tagClasses = isJornada ? 'bg-amber-100 text-amber-700'
                     : isRelated ? 'bg-emerald-100 text-emerald-700'
                     : 'bg-gray-100 text-gray-500';

    return (
        <div className={`rounded-lg shadow p-5 border transition-all duration-300 ${cardClasses}`}>
            <div className="flex justify-between items-start mb-3">
                <h4 className={`text-lg font-bold ${titleClasses}`}>Sesión {session.sessionInWeek} (Semana {session.week})</h4>
                <span className={`text-sm font-medium px-2 py-1 rounded ${tagClasses}`}>{session.day} | {session.date}</span>
            </div>
            {isJornada && <div className="mb-4 text-center p-2 rounded-md bg-amber-100 text-amber-800 font-semibold border border-amber-200">Jornada de Prácticas</div>}
            {isRelated && <div className="mb-4 text-center p-2 rounded-md bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200">Sesión de Apoyo a Prácticas</div>}
            
            <div className="space-y-4">
                <div><h5 className="font-semibold text-gray-700">Contenido:</h5><p className="text-gray-600 ml-4">{session.content}</p></div>
                {session.strategy?.length > 0 && <div><h5 className="font-semibold text-gray-700">Estrategias Didácticas:</h5><ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">{session.strategy.map((s, i) => <li key={i}>{s}</li>)}</ul></div>}
                {session.resources?.length > 0 && <div><h5 className="font-semibold text-gray-700">Recursos:</h5><div className="flex flex-wrap gap-2 ml-4 mt-1">{session.resources.map((r, i) => <span key={i} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{r}</span>)}</div></div>}
                {session.evaluationStrategy && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-200"><div><h5 className="font-semibold text-gray-700">Evaluación:</h5><p className="text-gray-600 ml-4">{session.evaluationStrategy}</p></div><div><h5 className="font-semibold text-gray-700">Instrumento:</h5><p className="text-gray-600 ml-4">{session.evaluationInstrument}</p></div></div>}
            </div>
        </div>
    );
};

const getDayHighlightType = (sessions: Session[] | undefined): 'jornada' | 'related' | 'activity' | 'none' => {
    if (!sessions || sessions.length === 0) return 'none';
    if (sessions.some(s => getSessionHighlightType(s) === 'jornada')) return 'jornada';
    if (sessions.some(s => getSessionHighlightType(s) === 'related')) return 'related';
    return 'activity';
};


const CalendarView: React.FC<{ sessions: Session[], onDateClick: (sessions: Session[]) => void }> = ({ sessions, onDateClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // Sep 2025
    
    const sessionsByDate = useMemo(() => {
        const map = new Map<string, Session[]>();
        sessions.forEach(session => {
            const date = getSessionDate(session);
            if(date) {
                const dateKey = date.toDateString();
                if (!map.has(dateKey)) map.set(dateKey, []);
                map.get(dateKey)!.push(session);
            }
        });
        return map;
    }, [sessions]);

    const changeMonth = (offset: number) => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));

    const renderCells = () => {
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(startDate.getDate() - monthStart.getDay());
        const endDate = new Date(monthEnd);
        endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));

        const rows = [];
        let days = [];
        let day = new Date(startDate);

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const daySessions = sessionsByDate.get(day.toDateString());
                const dayHighlight = getDayHighlightType(daySessions);
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                
                let buttonBgClass = '';
                let buttonTextClass = '';

                if (daySessions) {
                    switch(dayHighlight) {
                        case 'jornada':
                            buttonBgClass = 'bg-amber-100 hover:bg-amber-200';
                            buttonTextClass = 'text-amber-800 font-bold';
                            break;
                        case 'related':
                            buttonBgClass = 'bg-emerald-100 hover:bg-emerald-200';
                            buttonTextClass = 'text-emerald-800';
                            break;
                        case 'activity':
                            buttonBgClass = 'bg-blue-100 hover:bg-blue-200';
                            buttonTextClass = 'text-blue-800';
                            break;
                    }
                }

                days.push(
                    <div key={day.toString()} className={`p-2 border-t border-l ${isCurrentMonth ? '' : 'bg-gray-50'}`}>
                        <button
                            onClick={() => daySessions && onDateClick(daySessions)}
                            disabled={!daySessions}
                            className={`w-full h-full flex flex-col items-center justify-center rounded-md transition-colors duration-200 ${daySessions ? 'cursor-pointer ' + buttonBgClass : ''}`}
                        >
                            <span className={`font-medium ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}`}>{day.getDate()}</span>
                            {daySessions && <span className={`text-xs mt-1 ${buttonTextClass}`}>{daySessions.length} Act.</span>}
                        </button>
                    </div>
                );
                day.setDate(day.getDate() + 1);
            }
            rows.push(<div className="grid grid-cols-7" key={day.toString()}>{days}</div>);
            days = [];
        }
        return <div className="border-r border-b">{rows}</div>;
    };
    
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeftIcon /></button>
                <h3 className="text-xl font-bold text-gray-800">{currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</h3>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRightIcon /></button>
            </div>
            <div className="grid grid-cols-7 text-center font-semibold text-sm text-gray-600 mb-2">
                {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map(d => <div key={d}>{d}</div>)}
            </div>
            {renderCells()}
        </div>
    );
};


// --- MAIN COMPONENT ---

export const RutaAprendizaje: React.FC = () => {
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [currentWeek, setCurrentWeek] = useState(1);
    const [selectedDateSessions, setSelectedDateSessions] = useState<Session[] | null>(null);

    const allSessions = useMemo(() => learningUnits.flatMap(unit => unit.sessions), []);
    const totalWeeks = useMemo(() => Math.max(...allSessions.map(s => s.week)), [allSessions]);
    const sessionsByWeek = useMemo(() => allSessions.reduce((acc, session) => {
        (acc[session.week] = acc[session.week] || []).push(session);
        return acc;
    }, {} as Record<number, Session[]>), [allSessions]);
    
    const displayedSessions = useMemo(() => {
        return sessionsByWeek[currentWeek] || [];
    }, [currentWeek, sessionsByWeek]);
    
    const ViewToggle = () => (
        <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setViewMode('list')} className={`px-4 py-2 text-sm font-semibold rounded-md flex items-center transition-colors duration-200 ${viewMode === 'list' ? 'bg-white text-[#681617] shadow' : 'text-gray-600'}`}><ListIcon/> Vista Semanal</button>
            <button onClick={() => setViewMode('calendar')} className={`px-4 py-2 text-sm font-semibold rounded-md flex items-center transition-colors duration-200 ${viewMode === 'calendar' ? 'bg-white text-[#681617] shadow' : 'text-gray-600'}`}><CalendarIcon/> Vista Calendario</button>
        </div>
    );

    return (
        <div className="space-y-6">
            <ViewToggle />
            
            {viewMode === 'list' && (
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">
                    {/* Week Navigator */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Seleccionar Semana</h3>
                        <div className="border-b border-gray-200 pb-2 overflow-x-auto">
                            <div className="flex space-x-2 pb-2">
                                {Array.from({ length: totalWeeks }, (_, i) => i + 1).map(week => (
                                    <button key={week} onClick={() => setCurrentWeek(week)} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${currentWeek === week ? 'bg-[#681617] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Semana {week}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                     {/* Session Display */}
                    <div className="pt-4 border-t">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Actividades de la Semana {currentWeek}</h2>
                        {displayedSessions.length > 0 ? (
                            <div className="space-y-4">{displayedSessions.map((session, index) => <SessionCard key={index} session={session} />)}</div>
                        ) : (
                            <p className="text-center text-gray-500 py-8">No hay actividades programadas para esta semana.</p>
                        )}
                    </div>
                </div>
            )}

            {viewMode === 'calendar' && <CalendarView sessions={allSessions} onDateClick={setSelectedDateSessions} />}

            {selectedDateSessions && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={() => setSelectedDateSessions(null)}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="p-4 sm:p-6 sticky top-0 bg-white border-b z-10 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Actividades del {getSessionDate(selectedDateSessions[0])?.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                            <button onClick={() => setSelectedDateSessions(null)}><CloseIcon/></button>
                        </div>
                        <div className="p-4 sm:p-6 space-y-4">{selectedDateSessions.map((session, index) => <SessionCard key={index} session={session} />)}</div>
                    </div>
                </div>
            )}
        </div>
    );
};