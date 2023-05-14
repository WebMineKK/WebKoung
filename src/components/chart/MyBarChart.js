import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { contextType } from "react-autosuggest";

function MyBarChart({ chartData }) {

  let delayed;

  return (
    <div>
      <Line
        data={chartData}
        options={{
          hitRadius: 30,
          hoverRadius: 8,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "ສະແດງປະເພດເບີເປັນກຣາຟ",
            }
          },
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return value + " k";
                }
              }
            }
          },
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 100 + context.datasetIndex * 100;
              }
              return delay;
            },
          },
        }}
      />
    </div>
  );
}

export default MyBarChart;
