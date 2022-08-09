import React from "react";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
import { Bar } from "react-chartjs-2";
import { weekdayDataFilter, monthDataFilter, dayDataFilter } from '../utils/charts/dataToChartStructure.js';


const BarChart = ({periodData, period, filter, indicator }) => {
  let data = {};
  if (filter === 'all') {
    if (period === 'month') {
      data = monthDataFilter(periodData, filter, indicator);
    } else if (period === 'weekday') {
      data = weekdayDataFilter(periodData, filter, indicator);
    } else if (period === 'day') {
      data = dayDataFilter(periodData, filter, indicator);
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
