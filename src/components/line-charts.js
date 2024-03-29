import React, { useEffect, useState } from "react";
import '../App.css';
import { Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Button } from "@mui/material";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
ChartJS.register(ChartDataLabels);
export const options = {
  responsive: true,
  tooltips: {
    mode: 'index',
    intersect: false
 },
 hover: {
    mode: 'index',
    intersect: false
 },
  elements: {
    line: {
      tension: 0.3,
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      suggestedMin: 27,
      suggestedMax: 35,
      grid: {
        display: false
      },
      border:{
        display: false,
      },
      ticks: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      formatter: Math.round,
      font: {
          weight: 'bold'
      }
  }
  },
};

function LineCharts() {
  const [selectedComponent, setSelectedComponent] = useState('temperature');

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

 
  const [userData1, setUserData1] = useState({
    labels: [],
    datasets: [
      {
        fill: 'start',
        data: [],
        backgroundColor: [
          "rgba(75,192,192,0.7)"
        ],
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1
      },
    ],
  });
  const [userData2, setUserData2] = useState({
    labels: [],
    datasets: [
      {
        fill: 'start',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      },
    ],
  });

  const [userData3, setUserData3] = useState({
    labels: [],
    datasets: [
      {
        fill: 'start',
        data: [],
        backgroundColor: "rgba(144, 238, 144, 0.8)",
        borderColor: 'rgb(0, 128, 0)',
        borderWidth: 1
      },
    ],
  });
  useEffect(() => {
    (async ()  => { 
      const data = await axios.get('https://kct-weather-api.azurewebsites.net/process/chart')
      const temp = data.data.chart.map(data => data.temperature)
      const hum = data.data.chart.map(data => data.humidity)
      const wind = data.data.chart.map(data => data.windSpeed)
      const day = data.data.chart.map(data => data.day)
      setUserData1((existing) => ({labels:day,datasets:[{data:temp,backgroundColor:existing.datasets[0].backgroundColor,borderColor:existing.datasets[0].borderColor,borderWidth:existing.datasets[0].borderWidth,fill:existing.datasets[0].fill,label:existing.datasets[0].label}]}))
      setUserData2((existing) => ({labels:day,datasets:[{data:hum,backgroundColor:existing.datasets[0].backgroundColor,borderColor:existing.datasets[0].borderColor,borderWidth:existing.datasets[0].borderWidth,fill:existing.datasets[0].fill,label:existing.datasets[0].label}]}))
      setUserData3((existing) => ({labels:day,datasets:[{data:wind,backgroundColor:existing.datasets[0].backgroundColor,borderColor:existing.datasets[0].borderColor,borderWidth:existing.datasets[0].borderWidth,fill:existing.datasets[0].fill,label:existing.datasets[0].label}]}))
    })()
  },[])
  return (
    <div className="graph-group">
      <div className="button-group-graph">
        <div className="button-group">
          <Button variant='contained' color="secondary" className="button" onClick={() => handleButtonClick('temperature')}>Temperature</Button>
          <Button variant='contained' color="secondary" className="button" onClick={() => handleButtonClick('humidity')}>Humidity</Button>
          <Button variant='contained' color="secondary" className="button" onClick={() => handleButtonClick('barometer')}>Barometer</Button>
        </div>
        <div className="button-graph">
          {selectedComponent === 'temperature' && <Line options={options} data={userData1} />}
          {selectedComponent === 'humidity' && <Line options={options} data={userData2} />}
          {selectedComponent === 'barometer' && <Line options={options} data={userData3} />}
        </div>
        <div className="graph-text">
          {selectedComponent === 'temperature' && <p className="graph-text">Temperature</p>}
          {selectedComponent === 'humidity' && <p className="graph-text">Humidity</p>}
          {selectedComponent === 'barometer' && <p className="graph-text">Barometer</p>}
        </div>
      </div>
    </div>
  );
}

export default LineCharts;