import React from 'react';
import { Bar } from 'react-chartjs-2';


// a function to process retrieve data from
// SWAPI into a format that can be used by Chart.js
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
  // processing the SWAPI data
  const data = processBarChartData(props.data);

  // rendering the bar chart to the page
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
