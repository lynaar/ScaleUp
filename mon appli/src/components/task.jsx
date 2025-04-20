import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaRegCircle, 
  FaTrash, 
  FaPlus, 
  FaEllipsisV,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const TasksPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finaliser le business plan", completed: false, priority: "high", dueDate: "2025-06-10" },
    { id: 2, title: "Préparer la présentation pour les investisseurs", completed: true, priority: "medium", dueDate: "2025-05-28" },
    { id: 3, title: "Contacter les mentors pour feedback", completed: false, priority: "low", dueDate: "2025-06-15" },
    { id: 4, title: "Mettre à jour le modèle financier", completed: false, priority: "high", dueDate: "2025-05-30" }
  ]);
  
  const [newTask, setNewTask] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [selectedDueDate, setSelectedDueDate] = useState("");

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          priority: selectedPriority,
          dueDate: selectedDueDate
        }
      ]);
      setNewTask("");
      setSelectedPriority("medium");
      setSelectedDueDate("");
      setShowAddTask(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case "high": return "Haute";
      case "medium": return "Moyenne";
      case "low": return "Basse";
      default: return "";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Pas de date";
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="tasks-container">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn">☰</button>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="tasks-header">
          <div>
            <h1>Tâches</h1>
            <p className="subtitle">Gérez vos actions et priorités</p>
          </div>
         
        </header>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total</h3>
            <div className="stat-value">{tasks.length}</div>
          </div>
          <div className="stat-card">
            <h3>Terminées</h3>
            <div className="stat-value">{tasks.filter(t => t.completed).length}</div>
          </div>
          <div className="stat-card">
            <h3>En retard</h3>
            <div className="stat-value">
              {tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length}
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <section className="tasks-list">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                className={`task-card ${task.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="task-main">
                  <button 
                    className="task-checkbox"
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.completed ? (
                      <FaCheckCircle className="checked" />
                    ) : (
                      <FaRegCircle />
                    )}
                  </button>
                  
                  <div className="task-content">
                    <h3 className={task.completed ? 'line-through' : ''}>
                      {task.title}
                    </h3>
                    <div className="task-meta">
                      <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                      </span>
                      {task.dueDate && (
                        <span className={`due-date ${!task.completed && new Date(task.dueDate) < new Date() ? 'overdue' : ''}`}>
                          {formatDate(task.dueDate)}
                          {!task.completed && new Date(task.dueDate) < new Date() && (
                            <FaExclamationTriangle className="ml-1" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="task-actions">
                  <button 
                    className="action-btn delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FaTrash />
                  </button>
                  <button className="action-btn more">
                    <FaEllipsisV />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddTask(false)}
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
                onClick={() => setShowAddTask(false)}
              >
                &times;
              </button>
              
              <h2>Ajouter une nouvelle tâche</h2>
              
              <form onSubmit={addTask}>
                <div className="form-group">
                  <label>Titre de la tâche</label>
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Priorité</label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                    >
                      <option value="high">Haute</option>
                      <option value="medium">Moyenne</option>
                      <option value="low">Basse</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Date d'échéance</label>
                    <input
                      type="date"
                      value={selectedDueDate}
                      onChange={(e) => setSelectedDueDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <motion.button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowAddTask(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Annuler
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="primary-btn"
                    whileHover={{ scale: 1.03, boxShadow: "0 2px 10px rgba(228, 62, 50, 0.3)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Ajouter
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Styles */}
      <style jsx>{`
        .tasks-container {
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

        .tasks-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .tasks-header h1 {
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

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .stat-card h3 {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #111827;
        }

        /* Tasks List */
        .tasks-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        .task-card {
          background: white;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .task-card.completed {
          opacity: 0.7;
        }

        .task-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .task-main {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .task-checkbox {
          background: none;
          border: none;
          color: #d1d5db;
          cursor: pointer;
          font-size: 1.25rem;
          padding: 0.25rem;
        }

        .task-checkbox .checked {
          color: #10b981;
        }

        .task-content {
          flex: 1;
        }

        .task-content h3 {
          font-size: 1.1rem;
          color: #111827;
          margin: 0 0 0.25rem 0;
        }

        .line-through {
          text-decoration: line-through;
          color: #9ca3af;
        }

        .task-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
        }

        .priority-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: 500;
          font-size: 0.75rem;
        }

        .bg-red-100 { background-color: #fee2e2; }
        .text-red-800 { color: #991b1b; }
        .bg-yellow-100 { background-color: #fef3c7; }
        .text-yellow-800 { color: #92400e; }
        .bg-green-100 { background-color: #d1fae5; }
        .text-green-800 { color: #065f46; }

        .due-date {
          color: #6b7280;
          display: flex;
          align-items: center;
        }

        .due-date.overdue {
          color: #ef4444;
        }

        .task-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 1rem;
        }

        .action-btn.delete {
          color: #ef4444;
        }

        .action-btn.delete:hover {
          background: #fee2e2;
        }

        .action-btn.more {
          color: #6b7280;
        }

        .action-btn.more:hover {
          background: #f3f4f6;
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

        .secondary-btn {
          background: none;
          color: #e43e32;
          border: 1px solid #e43e32;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: rgba(228, 62, 50, 0.1);
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
          
          .main-content {
            margin-left: 0;
            padding: 1rem;
          }
          
          .tasks-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .primary-btn, .secondary-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default TasksPage;