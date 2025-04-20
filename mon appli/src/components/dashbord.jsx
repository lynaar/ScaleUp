import React, { useState } from 'react';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaTasks, 
  FaCheckCircle, 
  FaSpinner, 
  FaTimesCircle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const Dashboard = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [sidebarActive, setSidebarActive] = useState(false);

  // Données simulées
  const teamMembers = 8;
  const upcomingMeetings = [
    { title: "Révision hebdomadaire", time: "10:00 AM" },
    { title: "Présentation client", time: "02:30 PM" }
  ];
  const tasks = { completed: 15, pending: 7 };
  const evaluationCriteria = [
    { name: "MVP développé", status: "fulfilled" },
    { name: "Test utilisateur", status: "fulfilled" },
    { name: "Levée de fonds", status: "pending" },
    { name: "Recrutement", status: "pending" },
    { name: "Chiffre d'affaires", status: "not-met" }
  ];

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn" 
        onClick={() => setSidebarActive(!sidebarActive)}
      >
        ☰
      </button>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <h1>Programme ScaleUp</h1>
          <div className="date-range">
            <span>Date de début: 01/06/2025</span>
            <span>Date de fin: 30/11/2025</span>
          </div>
        </header>

        {/* Phases Section */}
        <section className="phases-section">
          <h2>Phases du Programme</h2>
          <div className="phases-container">
            {[1, 2, 3, 4].map((phase) => (
              <div 
                key={phase} 
                className={`phase-card ${activePhase === phase ? 'active' : ''}`}
                onClick={() => setActivePhase(phase)}
              >
                <div className="phase-number">Phase {phase}</div>
                <div className="phase-name">
                  {phase === 1 && 'Sélection'}
                  {phase === 2 && 'Accélération'}
                  {phase === 3 && 'Mentorat'}
                  {phase === 4 && 'resultats'}
                </div>
                <div className="phase-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${phase * 25}%` }}
                  ></div>
                </div>
                <div className="phase-status">
                  {phase === 1 ? 'Terminée' : phase < 4 ? 'En cours' : 'À venir'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
        
          
          <div className="stat-card meetings-card">
            <h3>Réunions à venir</h3>
            <div className="stat-value">{upcomingMeetings.length}</div>
            <div className="meeting-list">
              {upcomingMeetings.map((meeting, index) => (
                <div key={index} className="meeting-item">
                  <span>{meeting.title}</span>
                  <span>{meeting.time}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="stat-card tasks-card">
            <h3>Tâches globales</h3>
            <div className="stat-value">{tasks.completed + tasks.pending}</div>
            <div className="task-progress">
              <div className="progress-labels">
                <span>Terminées: {tasks.completed}</span>
                <span>En attente: {tasks.pending}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${(tasks.completed / (tasks.completed + tasks.pending)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>

       
          <section className="evaluation-section">
            <h2>Critères d'évaluation</h2>
            <div className="criteria-container">
              {evaluationCriteria.map((criteria, index) => (
                <div key={index} className={`criteria-item ${criteria.status}`}>
            {criteria.status === 'fulfilled' && <FaCheckCircle />}
            {criteria.status === 'pending' && <FaSpinner />}
            {criteria.status === 'not-met' && <FaTimesCircle />}
            <span>{criteria.name}</span>
            <div className="star-rating">
              {[...Array(5)].map((_, starIndex) => (
                <span key={starIndex}>&#9733;</span>
              ))}
            </div>
                </div>
              ))}
            </div>
          </section>
              </main>

              {/* CSS Styles */}
      <style jsx>{`
      .star-rating {
        display: flex;
        gap: 0.2rem;
        color: #fbbf24; /* Gold color for stars */
        font-size: 1.2rem;
      }
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f9fafb;
        }

        /* Main Content Styles */
      .main-content {
  flex: 1;
  padding: 2rem;
  position: relative;
  margin-left: 280px; /* Account for sidebar width */
  min-height: 100vh;
}
        .mobile-menu-btn {
          display: none;
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #e43e32;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          z-index: 10;
          font-size: 1.2rem;
        }
          .dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f9fafb;
  position: relative;
}

/* Sidebar Fixe en Haut */
.sidebar {
  width: 280px;
  height: 120vh; /* Hauteur étendue */
  background: white;
  border-right: 1px solid #e5e7eb;
  position: fixed;
  left: 0;
  top: 0; /* Positionné en haut */
  overflow-y: auto; /* Scroll si contenu trop long */
  z-index: 100;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
        }

        .dashboard-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .dashboard-header h1 {
          font-size: 1.8rem;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .date-range {
          display: flex;
          gap: 2rem;
          color: #6b7280;
          font-size: 0.9rem;
        }

        /* Phases Section */
        .phases-section {
          margin-bottom: 2rem;
        }

        .phases-section h2 {
          font-size: 1.5rem;
          color: #111827;
          margin-bottom: 1rem;
        }

        .phases-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .phase-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 4px solid #e5e7eb;
        }

        .phase-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .phase-card.active {
          border-left-color: #e43e32;
          background-color: rgba(228, 62, 50, 0.05);
        }

        .phase-number {
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .phase-name {
          font-size: 1.1rem;
          color: #374151;
          margin-bottom: 1rem;
        }

        .phase-progress {
          height: 6px;
          background-color: #e5e7eb;
          border-radius: 3px;
          margin-bottom: 0.5rem;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background-color: #e43e32;
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .phase-status {
          font-size: 0.8rem;
          color: #6b7280;
        }

        /* Stats Section */
        .stats-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .stat-card h3 {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1rem;
        }

        .stat-change {
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .stat-change.positive {
          color: #10b981;
        }

        .stat-change.negative {
          color: #ef4444;
        }

        .meeting-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meeting-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f3f4f6;
          font-size: 0.9rem;
        }

        .meeting-item:last-child {
          border-bottom: none;
        }

        .task-progress {
          margin-top: 1rem;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 0.3rem;
        }

        .progress-bar-container {
          height: 6px;
          background-color: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        /* Evaluation Section */
        .evaluation-section {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .evaluation-section h2 {
          font-size: 1.5rem;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .criteria-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .criteria-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem;
          border-radius: 6px;
          font-weight: 500;
        }

        .criteria-item.fulfilled {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .criteria-item.pending {
          background-color: rgba(249, 115, 22, 0.1);
          color: #f97316;
        }

        .criteria-item.not-met {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .main-content {
            padding: 1rem;
          }
          
          .stats-section {
            grid-template-columns: 1fr;
          }
          
          .phases-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .phases-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;