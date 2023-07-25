import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const Graph = () => {
  const leadPotData = [
    {
      leadPotential: "High",
      leads: 3,
      color: "#2a88c0",
    },
    {
      leadPotential: "Medium",
      leads: 1,
      color: "#A34BA7",
    },
    {
      leadPotential: "Low",
      leads: 3,
      color: "#E8142C",
    },
  ];
  const chartData = {
    labels: leadPotData.map((v) => v.leadPotential),
    datasets: [
      {
        label: "My First Dataset",
        data: leadPotData.map((v) => v.leads),
        backgroundColor: leadPotData.map((v) => v.color),
        hoverOffset: 3,
      },
    ],
  };

  return (
    <>
      <Doughnut data={chartData} />
    </>
  );
};

export default Graph;
