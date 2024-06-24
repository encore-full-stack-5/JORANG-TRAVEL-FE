import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { getChartData } from "../config/postApi";
import ChartDataLabels from "chartjs-plugin-datalabels";

const DonutChart = (props) => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const getChartDataApi = async () => {
    try {
      const responses = await getChartData(props.postId);
      console.log(responses);
      const newLabels = [];
      const newData = [];
      responses.forEach((response) => {
        newLabels.push(response.category);
        newData.push(response.cost);
      });

      setLabels(newLabels);
      setData(newData);
    } catch {
      console.log("error in getAllByPostIdApi");
    }
  };
  useEffect(() => {
    getChartDataApi();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: labels.map(
          () =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 0.2)`
        ),
        borderColor: labels.map(
          () =>
            `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ${value} 원`;
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (acc, val) => acc + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(0) + "%";
          return percentage;
        },
        color: "#606060", // 데이터 라벨의 색상
        font: {
          weight: "bold",
          size: 14,
        },
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
    scales: {},
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[ChartDataLabels]}
      />
    </div>
  );
};

export default DonutChart;
