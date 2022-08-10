const getItemData = (item, filter, option, indicator) => {
  if (filter === 'all')
    return item[filter][indicator];
  return item[filter][option]?.[indicator];
};

export const dataValue = (data, filter, option, indicator) => {
  if (indicator === 'mean') {
    return data.map(item => 
      getItemData(item, filter, option, 'quantity') !== 0 ?
        getItemData(item, filter, option, 'total') / getItemData(item, filter, option, 'quantity') : 0);
  }
  return data.map(item => getItemData(item, filter, option, indicator));
};

export const dayDataValue =(data, filter, option, indicator) => {
  if (indicator === 'mean') {
    return data.map(dayArray => 
      (dayArray.map(day => day ?
        (getItemData(day, filter, option, 'quantity') !== 0 ?
          getItemData(day, filter, option, 'total') / getItemData(day, filter, option, 'quantity') : 0) 
        : null))
    );
  }
  return data.map(dayArray => 
    (dayArray.map(day => day ? getItemData(day, filter, option, indicator) : null))
  );
};
