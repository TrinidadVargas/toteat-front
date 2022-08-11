import { barChartStyles } from './barChartColorOptions.js';
import {dataValue, dayDataValue} from './filterValues.js';

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

export const weekdayDataFilter = (weekdayData, filter, option, indicator) => {
  return {
    datasets: [{
      label: `${indicator} of ticket`,
      data: dataValue(sortWeekdayData(weekdayData), filter, option, indicator),
      ...barChartStyles,
    }],
    labels: weekDayLabels,
  };
};

export const monthDataFilter = (monthData, filter, option, indicator) => {
  return {
    datasets: [{
      label: `${indicator} of ticket`,
      data: dataValue(sortMonthData(monthData), filter, option, indicator),
      ...barChartStyles,
    }],
    labels: monthLabels,
  }
};

export const dayDataFilter = (dayData, filter, option, indicator) => {
  const data = dayDataValue(sortDayData(dayData), filter, option, indicator);
  return {
    datasets: data.map((dayArrayData, idx) => ({
      label: `${indicator} ticket of day ${(idx + 1).toString()}`,
      data: dayArrayData,
      ...barChartStyles,
    })),
    labels: monthLabels,
  };
};
