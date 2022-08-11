import React, { useState, useEffect } from "react";
import Head from 'next/head'
import { Container } from '@mantine/core';
import FilterArea from "../../components/FilterArea";
import BarChart from '../../components/Chart';
import statisticsApi from '../../api/statistics';

const defaultFilterSelection = {
  period: 'day',
  dateRange: [new Date(2019, 1, 1), new Date(2019, 3, 31)],
  finishDate: null,
  filter: 'all',
  waiter: 'Diana Arevalo',
  cashier: 'Roberto Ortega',
  zone: 'Salón',
  time: 'dinner',
  indicator: 'mean',
};

const filterOptionsInit = {
  period: ['month', 'day', 'weekday'],
  indicator: ['total', 'mean', 'max', 'min', 'quantity'],
};

function Income() {
  const [allData, setAllData] = useState(null);
  const [data, setData] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [filterSelection, setFilterSelection] = useState(defaultFilterSelection);

  const getData = async (specificDate, dateRange) => {
    let getDataArgs = { waiter: '', cashier: '', zone: '', time: '' }
    if (specificDate) getDataArgs = { ...getDataArgs, specificDate, dateRange };
    await statisticsApi.getStatistics(getDataArgs)
      .then((res) => {
        setAllData(res.data.data);
        setData(res.data.data.day.data);
        setFilterOptions({
          ...filterOptionsInit,
          ...res.data.data.day.filters,
          filter: ['all', ...res.data.data.day.filters.filters],
        });
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (allData === null)
      getData(false, null);
  }, [allData]);

  const selectedPeriodChange = (newPeriod) => {
    if (newPeriod !== filterSelection.period) {
      setFilterSelection({ ...filterSelection, period: newPeriod });
      if (newPeriod !== 'specific')
        setData(allData[newPeriod].data);
    }
  };

  return (
    <div>
      <Head>
        <title>Statistics</title>
      </Head>
      <Container>
        {filterOptions &&
          <FilterArea filterOptions={filterOptions}
            filterSelection={filterSelection}
            selectedPeriodChange={selectedPeriodChange}
            setFilterSelection={setFilterSelection} />
        }
        {data && <BarChart periodData={data} period={filterSelection.period}
          filter={filterSelection.filter} indicator={filterSelection.indicator}
          option={filterSelection[filterSelection.filter]} />}
      </Container>
    </div>
  );
}

export default Income;
