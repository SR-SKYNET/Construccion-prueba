import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GanttTable from './components/GanttTable';
import GanttChart from './components/GanttChart';
import { tasks } from './data/tasks';
import articles from './data/article';
import './App.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function GanttPage() {
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
    <>
      <header className="header-bar depth-3">
        <h1 className="header-title">Software de construcción</h1>
        <nav>
          <Link to="/" className="nav-link">GANTT</Link>
          <Link to="/insumos" className="nav-link">INSUMOS</Link>
        </nav>
      </header>

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
    </>
  );
}

function InsumosPage() {
  const [items] = useState(articles); // <- Usando los datos importados
  const [seleccionados, setSeleccionados] = useState([]);

  const toggleItem = (item) => {
    const exists = seleccionados.find(i => i.id === item.id);
    if (exists) {
      setSeleccionados(seleccionados.filter(i => i.id !== item.id));
    } else {
      setSeleccionados([...seleccionados, item]);
    }
  };

  const exportarPDF = async () => {
    const input = document.querySelector('.tabla-insumos-seleccionados');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save('insumos.pdf');
  };

  const total = seleccionados.reduce((acc, item) => acc + item.precio, 0);

  return (
    <>
      <header className="header-bar depth-3">
        <h1 className="header-title">Software de construcción</h1>
        <nav>
          <Link to="/" className="nav-link">GANTT</Link>
          <Link to="/insumos" className="nav-link">INSUMOS</Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="gantt-table-container depth-2">
          <div className="table-responsive">
          <table className="gantt-table">
            <thead>
              <tr>
                <th>✓</th>
                <th>Descripción</th>
                <th>Unidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={seleccionados.some(i => i.id === item.id)}
                      onChange={() => toggleItem(item)}
                    />
                  </td>
                  <td>{item.descripcion}</td>
                  <td>{item.unidad}</td>
                  <td>${item.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        <div className="gantt-chart-container depth-2">
          <div className="tabla-insumos-seleccionados">
            <h3 className="titulo-invertido">Materiales Seleccionados</h3>
            <table className="gantt-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Unidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {seleccionados.map(item => (
                  <tr key={item.id}>
                    <td>{item.descripcion}</td>
                    <td>{item.unidad}</td>
                    <td>${item.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontWeight: 'bold', marginTop: '10px', color: 'black' }}>
              Total: ${total.toFixed(2)}
            </p>
            <button className="export-btn" onClick={exportarPDF}>Exportar PDF</button>
          </div>
        </div>
      </main>
    </>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GanttPage />} />
        <Route path="/insumos" element={<InsumosPage />} />
      </Routes>
    </Router>
  );
}

export default App;
