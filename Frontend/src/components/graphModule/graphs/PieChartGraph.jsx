import { forwardRef, useContext, useEffect } from "react";
// Context
import AppContext from "../../../context/AppContext";
// Chart
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartGraph = forwardRef(({ graph }, ref) => {

  const { theme } = useContext(AppContext);

  const labels = graph.map((g) => g.label);
  const values = graph.map((g) => g.value);

  useEffect(() => {
    const chart = ref.current;
    if (!chart) return;

    if (typeof chart.reset === "function") chart.reset();

    chart.update();
  }, [ref]);

  const palette = [
    "rgba(59, 130, 246, 0.8)",   // blue
    "rgba(56, 189, 248, 0.8)",   // cyan
    "rgba(96, 165, 250, 0.8)",   // light blue
    "rgba(129, 140, 248, 0.8)",  // indigo
    "rgba(251, 191, 36, 0.8)",   // amber
    "rgba(248, 113, 113, 0.8)",  // red
    "rgba(52, 211, 153, 0.8)",   // emerald
  ];

  const backgroundColors = values.map((_, idx) => palette[idx % palette.length]);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: "#ffffff", // white
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: (ctx) => {
            const w = ctx.chart.width;
            return { size: w < 480 ? 9 : 12 };
          },
          generateLabels: (chart) => {
            const original = ChartJS.overrides.pie.plugins.legend.labels.generateLabels(chart);

            return original.map(label => ({
              ...label,
              text:
                label.text.length > 8
                  ? label.text.slice(0, 8) + "…"
                  : label.text,
            }));
          },
          color: theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
        },
      },
    },
  };

  return <Pie ref={ref} data={data} options={options} />;
});

export default PieChartGraph;