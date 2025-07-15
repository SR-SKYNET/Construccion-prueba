import React, { useState } from 'react';
import '../App.css';

const GanttTable = ({ tasks }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderRows = (tasks, level = 0) => {
    return tasks.map(task => (
      <React.Fragment key={task.id}>
        <tr className={`row-level-${level}`}>
          <td>
            {task.children && (
              <button 
                onClick={() => toggleExpand(task.id)} 
                className="expand-btn"
                aria-label={expanded[task.id] ? 'Contraer' : 'Expandir'}
              >
                {expanded[task.id] ? '➖' : '➕'}
              </button>
            )}
            {task.name}
          </td>
          <td>{task.start}</td>
          <td>{task.end}</td>
          <td className="crud">
            <button className="edit-btn" aria-label="Editar">✏️</button>
            <button className="delete-btn" aria-label="Eliminar">🗑️</button>
          </td>
        </tr>
        {task.children && expanded[task.id] && renderRows(task.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="table-responsive">
      <table className="gantt-table">
        <thead>
          <tr>
            <th>Rubro</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(tasks)}
        </tbody>
      </table>
    </div>
  );
};

export default GanttTable;