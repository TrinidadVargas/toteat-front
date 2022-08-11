import React from "react";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);
import { Bar } from "react-chartjs-2";
import { weekdayDataFilter, monthDataFilter, dayDataFilter } from '../utils/charts/dataToChartStructure.js';


const BarChart = ({periodData, period, filter, option, indicator }) => {
  let data = {};
  if (period === 'month') {
    data = monthDataFilter(periodData, filter, option, indicator);
  } else if (period === 'weekday') {
    data = weekdayDataFilter(periodData, filter, option, indicator);
  } else if (period === 'day') {
    data = dayDataFilter(periodData, filter, option, indicator);
  }

  return (
    <div id='BarChart-Colors'>
      <Bar 
        data={data}
        options={{ plugins: {
            legend: { display: false, position: "bottom" }
        }}}
      />
    </div>
  );
};

export default BarChart;
