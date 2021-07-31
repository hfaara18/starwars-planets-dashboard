import React from 'react';
import { Bar } from 'react-chartjs-2';


const processBarChartData = (barChartData) => {
  const processedBarChartData = {
    labels: barChartData.map((item) => item.name),
    datasets: [
      {
        label: 'Population',
        data: barChartData.map((item) => item.population),
        borderWidth: 1,
      },
    ],
  };
  return processedBarChartData;
}


function BarChart(props) {
  const data = processBarChartData(props.data);

  return (
    <>
    <h3>Bar Chart of Planet Populations</h3>
    <div>
      <Bar
        data={data}
        height={500}
        width={600}
        options={{maintainAspectRatio: false}}
      />
    </div>
    </>
  )
}


export default BarChart;
