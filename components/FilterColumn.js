import React from "react";
import { Button} from '@mantine/core';
import { DateRangePicker} from '@mantine/dates';


function FilterColumn({filterOptions, filterSelection, 
  setFilterSelection, selectedPeriodChange}) {

  return (<div>
    <h2>Filters</h2>
    <b>Show data by: </b> {filterSelection.period}
    <div>
      {filterOptions.period.map((period) => (
        <Button key={period} size="xs"
          onClick={() => selectedPeriodChange(period)}>
          {period}
        </Button>
      ))}
      {filterSelection.period === 'specific' &&
      <div>
        <DateRangePicker placeholder="Pick dates range"
          value={filterSelection.dateRange} onChange={dateRange => setFilterSelection({...filterSelection, dateRange})} />
        <Button size="xs" color="orange">Update Date Range</Button>
      </div>}
    </div>
    <b>Filter by: </b> {filterSelection.filter}
    <div>
      {filterOptions.filter.map((filter) => (
        <Button key={filter} size="xs"
          onClick={() => setFilterSelection({...filterSelection, filter})}>
          {filter}
        </Button>
      ))}
    </div>
    {filterSelection.filter !== 'all' && 
      <div>
        <b>Options: </b>{filterSelection[filterSelection.filter]}
        <div>
          {filterOptions[filterSelection.filter].map((option) => (
            <Button key={option} size="xs"
              onClick={() => setFilterSelection({...filterSelection, [filterSelection.filter]: option})}>
              {option}
            </Button>
          ))} 
        </div>
      </div>}
    <b>Indicator: </b> {filterSelection.indicator}
    <div>
      {filterOptions.indicator.map((indicator) => (
        <Button key={indicator} size="xs" color="cyan"
          onClick={() => setFilterSelection({...filterSelection, indicator})}>
          {indicator}
        </Button>
      ))}
    </div>
  </div>)
}

export default FilterColumn;
