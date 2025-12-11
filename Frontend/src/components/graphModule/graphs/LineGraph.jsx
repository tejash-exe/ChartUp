import { forwardRef, useContext, useEffect } from "react";
// Context
import AppContext from "../../../context/AppContext";
// Chart
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = forwardRef(({ graph }, ref) => {

  const { theme } = useContext(AppContext);

  const labels = graph.map((g) => g.label);
  const values = graph.map((g) => g.value);

  useEffect(() => {
    const chart = ref.current;
    if (!chart) return;

    if (typeof chart.reset === "function") chart.reset();

    chart.update();
  }, [ref]);

  const baseFill = theme === "dark" ? "rgba(59, 160, 246, 1)" : "rgba(59, 130, 246, 0.6)";
  const accentFill = theme === "dark" ? "rgba(249, 115, 22, 1)" : "rgba(249, 115, 22, 0.6)";

  const backgroundColors = values.map((_, idx) =>
    idx === values.length - 1 ? accentFill : baseFill
  );

  const data = {
    labels,
    datasets: [
      {
        data: values,
        fill: false,
        tension: 0.3,
        borderWidth: 2,
        borderColor: theme === "dark" ? "rgba(59, 160, 246, 1)" : "rgba(59, 130, 246, 0.6)",
        pointBackgroundColor: backgroundColors,
        pointBorderColor: "#ffffff",
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
          font: (ctx) => {
            const w = ctx.chart.width;
            return { size: w < 480 ? 7 : 12 };
          },
          callback: function (value, index, ticks) {
            const label = this.getLabelForValue(value);
            return label.length > 8 ? label.slice(0, 8) + "…" : label;
          },
        },
        border: {
          color: theme === "dark"
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(0, 0, 0, 0.6)",
          width: 1,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
          beginAtZero: true,
          font: (ctx) => {
            const w = ctx.chart.width;
            return { size: w < 480 ? 9 : 12 };
          },
          callback: function (value, index, ticks) {
            const label = this.getLabelForValue(value);
            return label.length > 8 ? label.slice(0, 8) + "…" : label;
          },
        },
        border: {
          color: theme === "dark"
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(0, 0, 0, 0.6)",
          width: 1,
        },
      },
    },
  };

  return <Line ref={ref} data={data} options={options} />;
});

export default LineGraph;