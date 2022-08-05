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

const dataTotalAmount = (data) => {
  return data.map(item => item.total);
};

const dayDataTotalAmount =(data) => {
  return data.map(dayArray => 
    (dayArray.map(day => day ? day.total : null))
  );
};

export const weekdayDataTotal = (weekdayData) => {
  let data = {};
  weekdayData.forEach(item => { data[item.date] = item.total; });
  return {
    datasets: [{
      label: 'Total de ventas',
      data: dataTotalAmount(sortWeekdayData(weekdayData)),
      ...barChartStyles,
    }],
    labels: weekDayLabels,
  };
};

export const monthDataTotal = (monthData) => {
  return {
    datasets: [{
      label: 'Total de ventas',
      data: dataTotalAmount(sortMonthData(monthData)),
      ...barChartStyles,
    }],
    labels: monthLabels,
  }
};

export const dayDataTotal = (dayData) => {
  const data = dayDataTotalAmount(sortDayData(dayData));
  return {
    datasets: data.map((dayArrayData, idx) => ({
      label: idx.toString(),
      data: dayArrayData,
      ...barChartStyles,
    })),
    labels: monthLabels,
  };
};
