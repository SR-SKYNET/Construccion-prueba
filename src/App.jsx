import React, { useState } from 'react';
import GanttTable from './components/GanttTable';
import GanttChart from './components/GanttChart';
import { tasks } from './data/tasks';
import './App.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [mostrarTexto, setMostrarTexto] = useState(true);

  const exportarPDF = async () => {
    const input = document.querySelector('.gantt-chart-container');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save('gantt.pdf');
  };

  return (
    <div className="app-container">
      <header className="header-bar depth-3">
        <h1 className="header-title">Gantt de Construcción</h1>
        <div className="header-actions">
          <label style={{ marginRight: '15px', fontWeight: 500 }}>
            <input
              type="checkbox"
              checked={mostrarTexto}
              onChange={(e) => setMostrarTexto(e.target.checked)}
              style={{ marginRight: '5px' }}
            />
            Mostrar texto en barras
          </label>
          <button className="export-btn" onClick={exportarPDF}>Exportar PDF</button>
        </div>
      </header>

      <main className="main-content">
        <div className="gantt-table-container depth-2">
          <GanttTable tasks={tasks} />
        </div>

        <div className="gantt-chart-container depth-2">
          <GanttChart tasks={tasks} mostrarTexto={mostrarTexto} />
        </div>
      </main>
    </div>
  );
}

export default App;
