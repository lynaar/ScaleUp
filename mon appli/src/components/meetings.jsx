import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUserFriends, 
  FaVideo, 
  FaChevronRight,
  FaPlus,
  FaTimes,
  FaBell,
  FaEllipsisV
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MeetingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [sidebarActive, setSidebarActive] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '10:00',
    duration: '60',
    participants: []
  });

  const meetings = [
    {
      id: 1,
      type: "Équipe",
      title: "PFE",
      date: "2025-05-20",
      time: "14:00",
      duration: 90,
      participants: ["Lyna", "Aya", "merieme"],
      canJoin: true
    },
    {
      id: 2,
      type: "khdma",
      title: "backend",
      date: "2025-05-22",
      time: "10:30",
      duration: 120,
      participants: ["lyna", "aya"],
      canJoin: true
    }
  ];

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const formatTimeRange = (time, duration) => {
    const [hours, minutes] = time.split(':');
    const endTime = new Date();
    endTime.setHours(parseInt(hours) + Math.floor(duration / 60));
    endTime.setMinutes(parseInt(minutes) + (duration % 60));
    return `${time} - ${endTime.getHours()}:${endTime.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateMeeting = (e) => {
    e.preventDefault();
    // Ici vous ajouteriez la logique pour créer la réunion
    setShowNewMeetingModal(false);
    setNewMeeting({
      title: '',
      date: '',
      time: '10:00',
      duration: '60',
      participants: []
    });
  };

  return (
    <div className="meetings-container">
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
        <header className="meetings-header">
          <div>
            <h1>Mes Réunions</h1>
            <p className="subtitle">Vos prochaines sessions de collaboration</p>
          </div>
         
        </header>

        {/* Tabs Section */}
        <section className="tabs-section">
          <div className="tabs">
            <motion.button
              className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              À venir
            </motion.button>
            <motion.button
              className={`tab ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Passées
            </motion.button>
          </div>
        </section>

        {/* Meetings List */}
        <section className="meetings-list">
          <AnimatePresence>
            {meetings.map(meeting => (
              <motion.div
                key={meeting.id}
                className="meeting-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="card-header">
                  <span className={`meeting-type ${meeting.type.toLowerCase()}`}>
                    {meeting.type}
                  </span>
                  <div className="card-actions">
                    <button className="icon-btn">
                      <FaBell />
                    </button>
                    <button className="icon-btn">
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>
                
                <h3 className="meeting-title">{meeting.title}</h3>
                
                <div className="meeting-details">
                  <div className="detail">
                    <FaCalendarAlt className="icon" />
                    <span>{formatDate(meeting.date)}</span>
                  </div>
                  
                  <div className="detail">
                    <FaClock className="icon" />
                    <span>{formatTimeRange(meeting.time, meeting.duration)}</span>
                  </div>
                  
                  <div className="detail">
                    <FaUserFriends className="icon" />
                    <span>
                      {meeting.participants.length} participant{meeting.participants.length > 1 ? 's' : ''} • {' '}
                      {meeting.participants.join(', ')}
                    </span>
                  </div>
                </div>
                
                <div className="card-footer">
                  <motion.button
                    className="secondary-btn"
                    onClick={() => setSelectedMeeting(meeting)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Détails <FaChevronRight />
                  </motion.button>
                  <motion.button
                    className="primary-btn"
                    whileHover={{ scale: 1.03, boxShadow: "0 2px 10px rgba(228, 62, 50, 0.3)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaVideo /> Rejoindre
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {/* New Meeting Modal */}
   
               
         

      {/* Meeting Detail Modal */}
      <AnimatePresence>
        {selectedMeeting && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMeeting(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-btn"
                onClick={() => setSelectedMeeting(null)}
              >
                <FaTimes />
              </button>
              
              <div className="modal-header">
                <span className={`meeting-type ${selectedMeeting.type.toLowerCase()}`}>
                  {selectedMeeting.type}
                </span>
                <h2>{selectedMeeting.title}</h2>
              </div>
              
              <div className="modal-body">
                <div className="detail-group">
                  <FaCalendarAlt className="icon" />
                  <div>
                    <h4>Date</h4>
                    <p>{formatDate(selectedMeeting.date)}</p>
                  </div>
                </div>
                
                <div className="detail-group">
                  <FaClock className="icon" />
                  <div>
                    <h4>Heure</h4>
                    <p>{formatTimeRange(selectedMeeting.time, selectedMeeting.duration)}</p>
                  </div>
                </div>
                
                <div className="detail-group">
                  <FaUserFriends className="icon" />
                  <div>
                    <h4>Participants</h4>
                    <p>{selectedMeeting.participants.join(', ')}</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <motion.button
                  className="secondary-btn"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Modifier
                </motion.button>
                <motion.button
                  className="primary-btn"
                  whileHover={{ scale: 1.03, boxShadow: "0 2px 10px rgba(228, 62, 50, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FaVideo /> Rejoindre la réunion
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Styles */}
      <style jsx>{`
        .meetings-container {
          display: flex;
          min-height: 100vh;
          background-color: #f9fafb;
          position: relative;
        }

        .sidebar {
          width: 280px;
          height: 120vh;
          background: white;
          border-right: 1px solid #e5e7eb;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
          z-index: 100;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

        .main-content {
          flex: 1;
          padding: 2rem;
          position: relative;
          margin-left: 280px;
          min-height: 100vh;
        }

        .meetings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .meetings-header h1 {
          font-size: 1.8rem;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin: 0;
        }

        .primary-btn {
          background: #e43e32;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .primary-btn:hover {
          background: #c2332a;
        }

        /* Tabs Section */
        .tabs-section {
          margin-bottom: 2rem;
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          background: none;
          border: none;
          color: #6b7280;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .tab.active {
          color: #e43e32;
        }

        .tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e43e32;
        }

        /* Meetings List */
        .meetings-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .meeting-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border-left: 4px solid #e43e32;
        }

        .meeting-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .meeting-type {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .meeting-type.équipe {
          background: rgba(228, 62, 50, 0.1);
          color: #e43e32;
        }

        .meeting-type.atelier {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .icon-btn {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 0.25rem;
          font-size: 1rem;
        }

        .meeting-title {
          font-size: 1.25rem;
          color: #111827;
          margin: 0 0 1rem 0;
        }

        .meeting-details {
          margin: 1rem 0;
        }

        .detail {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          color: #4a5568;
          font-size: 0.95rem;
        }

        .icon {
          margin-right: 0.75rem;
          color: #9ca3af;
          min-width: 20px;
        }

        .card-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .secondary-btn {
          background: none;
          color: #e43e32;
          border: 1px solid #e43e32;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: rgba(228, 62, 50, 0.1);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6b7280;
          padding: 0.25rem;
        }

        .modal-content h2 {
          margin-top: 0;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #4b5563;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        .form-row .form-group {
          flex: 1;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        /* Detail Modal Styles */
        .modal-header {
          margin-bottom: 1.5rem;
        }

        .modal-header h2 {
          margin-bottom: 0.5rem;
        }

        .modal-body {
          margin: 2rem 0;
        }

        .detail-group {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }

        .detail-group .icon {
          font-size: 1.25rem;
          margin-top: 0.25rem;
        }

        .detail-group h4 {
          margin: 0 0 0.25rem 0;
          color: #4b5563;
          font-size: 0.9rem;
        }

        .detail-group p {
          margin: 0;
          color: #111827;
          font-size: 1rem;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
          
          .main-content {
            margin-left: 0;
            padding: 1rem;
          }
          
          .meetings-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .card-footer {
            flex-direction: column;
          }
          
          .primary-btn, .secondary-btn {
            width: 100%;
            justify-content: center;
          }
          
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MeetingsPage;