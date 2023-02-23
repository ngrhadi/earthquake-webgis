import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// function createGradient(ctx, area) {
//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)
//   gradient.addColorStop(0, 'rgba(255, 255, 255, 0.86)');
//   gradient.addColorStop(1, '#dc143c');
//   return gradient;
// }

// function createBorder(ctx, area) {
//   const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)
//   gradient.addColorStop(0, 'rgba(255, 255, 255, 0.86)');
//   gradient.addColorStop(1, '#dc143c');
//   return gradient;
// }

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    //frist data set
    {
      label: "Earthquakes Trends",
      // fill: true,
      data: [3, 5, 5, 6, 4, 3, 4, 6, 4, 5, 3, 4], //data for each month Y
      // borderColor: ["#4BAE67"],
      // pointBackgroundColor: "#249D57", // for style data point
      // pointBorderColor: "#249D57",
      // border: '0.2px solid #4BAE67',
      tension: 0.5,
    },
  ],
};
function ChartShalesTrend() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  // for yAxes step size and title
  const config = {
    type: 'bar',
    data: data,
    options: {
      // scales: {
      //   myScale: {
      //     type: 'logarithmic',
      //     position: 'right', // `axis` is determined by the position as `'y'`
      //   }
      // },
      legend: {
        display: true
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 12,
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            fontSize: 12,
            beginAtZero: true
          }
        }]
      },
    },
    plugins: {
      tooltip: {

      }
    }
  };
  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        // backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);


  return (
    <div className='absolute bottom-0 w-full left-0 z-50'>
      <div className="canvas_chart" style={{
        minWidth: '100%',
        maxWidth: '100%',
        overflowX: 'scroll',
      }}>
        <Line
        // className="overflow-x-scroll"
        ref={chartRef}
        data={chartData}
        width={'100vw'}
        height={'10rem'}
        options={config}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          backgroundColor: 'white'
        }}
        ></Line>
        </div>
    </div>
  );
}

export default ChartShalesTrend;
