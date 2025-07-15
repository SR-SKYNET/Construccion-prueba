import React, { useRef, useEffect } from 'react';
import '../App.css';

const getDayDifference = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e - s) / (1000 * 60 * 60 * 24));
};

const getOffset = (start, baseDate) => {
  const s = new Date(start);
  const b = new Date(baseDate);
  return Math.floor((s - b) / (1000 * 60 * 60 * 24));
};

const getDateRange = (start, days) => {
  const base = new Date(start);
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(base);
    date.setDate(date.getDate() + i);
    return date.toISOString().slice(5, 10);
  });
};

const renderBars = (tasks, baseDate, mostrarTexto, level = 0, yOffset = { y: 0 }) => {
  return tasks.flatMap((task) => {
    const duration = getDayDifference(task.start, task.end);
    const offset = getOffset(task.start, baseDate);

    const bar = (
      <div
        key={task.id}
        className="bar"
        style={{
          left: `${offset * 70}px`,
          width: `${duration * 70}px`,
          top: `${yOffset.y}px`,
          zIndex: level + 1
        }}
      >
        <div className="bar-frame" style={{ opacity: 1 - (level * 0.1) }}>
          {mostrarTexto && <span className="bar-text">{task.name}</span>}
        </div>
      </div>
    );

    yOffset.y += 44;
    const children = task.children ? renderBars(task.children, baseDate, mostrarTexto, level + 1, yOffset) : [];
    return [bar, ...children];
  });
};

const GanttChart = ({ tasks, mostrarTexto }) => {
  const chartRef = useRef(null);
  const baseDate = "2024-02-26";
  const totalDays = 14;
  const headers = getDateRange(baseDate, totalDays);

  useEffect(() => {
    const bars = chartRef.current.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
      bar.style.animationDelay = `${index * 0.05}s`;
    });
  }, []);

  return (
    <div className="gantt-wrapper">
      <div className="gantt-header">
        {headers.map((date, index) => (
          <div key={index} className="gantt-cell">{date}</div>
        ))}
      </div>
      <div className="gantt-chart" ref={chartRef}>
        {renderBars(tasks, baseDate, mostrarTexto)}
      </div>
    </div>
  );
};

export default GanttChart;
