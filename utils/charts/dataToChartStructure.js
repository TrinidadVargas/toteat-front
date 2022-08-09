import { barChartStyles } from './barChartColorOptions.js';

const monthLabels = ['Jan', 'Feb', 'Mar'];
const weekDayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


const sortWeekdayData = (weekdayData) => {
  let data = {};
  weekdayData.forEach(item => { data[item.date] = item; });
  return [data.Monday, data.Tuesday, data.Wednesday, data.Thursday, data.Friday, data.Saturday, data.Sunday]
};

const sortMonthData = (monthData) => {
  let data = {};
  monthData.forEach(item => { data[item.date] = item; });
  return [data.Jan, data.Feb, data.Mar];
};

const isDateString = (date, day, month) => {
  const dateArray = date.split('-');
  return Number(dateArray[2]) === day && Number(dateArray[1]) === month;
};

const sortDayData = (dayData) => {
  let data = [];
  for (let day = 1; day <= 31; day++) {
    data.push([]);
    for (let month = 1; month <= 3; month++) {
      const thisDayData = dayData.find(item => isDateString(item.date, day, month));
      data[day - 1].push(thisDayData);
    }
  }
  return data;
};

const dataTotalAmount = (data, filter, indicator) => {
  if (indicator === 'mean') {
    return data.map(item => 
      item[filter]['num_sales'] !== 0 ? item[filter]['total'] / item[filter]['num_sales'] : 0);
  }
  return data.map(item => item[filter][indicator]);
};

const dayDataAllAmount =(data, filter, indicator) => {
  if (indicator === 'mean') {
    return data.map(dayArray => 
      (dayArray.map(day => day ?
        (day[filter]['num_sales'] !== 0 ? day[filter]['total'] / day[filter]['num_sales'] : 0) 
        : null))
    );
  }
  return data.map(dayArray => 
    (dayArray.map(day => day ? day[filter][indicator] : null))
  );
};

export const weekdayDataFilter = (weekdayData, filter, indicator) => {
  return {
    datasets: [{
      label: 'Total de ventas',
      data: dataTotalAmount(sortWeekdayData(weekdayData), filter, indicator),
      ...barChartStyles,
    }],
    labels: weekDayLabels,
  };
};

export const monthDataFilter = (monthData, filter, indicator) => {
  return {
    datasets: [{
      label: 'Total de ventas',
      data: dataTotalAmount(sortMonthData(monthData), filter, indicator),
      ...barChartStyles,
    }],
    labels: monthLabels,
  }
};

export const dayDataFilter = (dayData, filter, indicator) => {
  const data = dayDataAllAmount(sortDayData(dayData), filter, indicator);
  return {
    datasets: data.map((dayArrayData, idx) => ({
      label: idx.toString(),
      data: dayArrayData,
      ...barChartStyles,
    })),
    labels: monthLabels,
  };
};
