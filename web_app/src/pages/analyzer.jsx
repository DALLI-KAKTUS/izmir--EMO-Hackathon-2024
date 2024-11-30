import React, { useState, useEffect } from 'react';
import DrawPieChart from '../components/piechart';
import './analyzer.css';

export default function Analyzer() {
  const [classCounts, setClassCounts] = useState({});
  const [TotalGarbage, setTotalGarbage] = useState(0);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();

  useEffect(() => {
    // Fixed dummy data
    const dummyData = {
      plastic: 5,
      electronic: 3,
      metal: 2,
      glove: 4,
      tire: 6,
    };

    // Set the dummy data to state
    setClassCounts(dummyData);

    // Calculate the total garbage count
    const totalGarbageCount = Object.values(dummyData).reduce((acc, count) => acc + count, 0);
    setTotalGarbage(totalGarbageCount);

  }, []); // Empty dependency array to run once on component mount

  const pieChartData = Object.entries(classCounts).map(([className, count]) => ({
    className,
    count
  }));

  return (
    <div className="wrapper"> 
      <div className="analyzer-container">
        <h1 className="title">Deniz Kirliliği Analizi</h1>
        <div className="date-container">Tarih: {day}/{month}/{year}</div>
        
        <div className="stats-pie-container">
          <div className="stats-container">
            <div className="stat-box">
              <p>Bugün Tespit Edilen Toplam Çöp Miktarı</p>
              <p>{TotalGarbage}</p>
            </div>
            
            <div className="horizontal-divider"></div>
          </div>

          <div className="pie-chart-card"> 
            <h2 className='pie-title'>Günlük Deniz Kirliliği</h2>
            <DrawPieChart newData={pieChartData} />
          </div>
        </div>
      </div>
    </div>
  );
}
