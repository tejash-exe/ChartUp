import { forwardRef, useContext, useEffect } from "react";
// Context
import AppContext from "../../../context/AppContext";
// Chart
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

const BarGraph = forwardRef(({ graph }, ref) => {

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
    const baseBorder = theme === "dark" ? "rgba(37, 99, 235, 1)" : "rgba(37, 99, 235, 0.6)";

    const accentFill = theme === "dark" ? "rgba(249, 115, 22, 1)" : "rgba(249, 115, 22, 0.6)";
    const accentBorder = theme === "dark" ? "rgba(234, 88, 12, 1)" : "rgba(234, 88, 12, 0.5)";

    const backgroundColors = values.map((_, idx) =>
        idx === values.length - 1 ? accentFill : baseFill
    );

    const borderColors = values.map((_, idx) =>
        idx === values.length - 1 ? accentBorder : baseBorder
    );

    const data = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 0.2,
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
        datasets: {
            bar: {
                barThickness: (ctx) => {
                    const w = ctx.chart.width;
                    if (w < 380) return 12;
                    if (w < 480) return 18;
                    return 24;
                },
                borderRadius: (ctx) => {
                    const w = ctx.chart.width;
                    if (w < 480) return 3;
                    return 4;
                },
            },
        },
    };

    return (
        <Bar ref={ref} data={data} options={options} />
    );
});

export default BarGraph;