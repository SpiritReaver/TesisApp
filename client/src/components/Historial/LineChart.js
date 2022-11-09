import React from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart } from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function LineChart({ chartData }) {
  return (
    <Line
      data={chartData}
      options={{
        chartArea: {
          backgroundColor: "rgba(251, 85, 85, 0.4)",
        },
        fillStyle: "",
        responsive: true,
        transitions: {
          show: {
            animations: {
              x: {
                from: 0,
              },
              y: {
                from: 0,
              },
            },
          },
          hide: {
            animations: {
              x: {
                to: 0,
              },
              y: {
                to: 0,
              },
            },
          },
        },
        maintainAspectRatio: true,
        plugins: {
          fillStyle:'green',
          legend: {
            position: "top",
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: true,
            text: "Historico de precios",
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      }}
    />
  );
}

export default LineChart;
