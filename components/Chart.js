import React from "react";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
import { Bar } from "react-chartjs-2";
import { weekdayDataTotal, monthDataTotal, dayDataTotal } from '../utils/charts/dataToChartStructure.js';


const BarChart = ({periodData, period, filter }) => {
  let data = {};
  if (filter === 'total') {
    if (period === 'month') {
      data = monthDataTotal(periodData);
    } else if (period === 'weekday') {
      data = weekdayDataTotal(periodData);
    } else if (period === 'day') {
      data = dayDataTotal(periodData);
    }
  }

  return (
    <div id='BarChart-Colors'>
      <Bar 
        data={data}
        options={{ plugins: {
            title: { display: true, text: 'ventas'},
            legend: { display: false, position: "bottom" }
        }}}
      />
    </div>
  );
};

export default BarChart;
