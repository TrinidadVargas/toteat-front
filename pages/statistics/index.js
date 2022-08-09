import React, {useState, useEffect} from "react";
import statisticsApi from '../../api/statistics';
import { Button } from '@mantine/core';
import BarChart from '../../components/Chart';



function Statistics() {

  const [statisticsData, setStatisticsData] = useState(null);
  const [showData, setShowData] = useState(null);
  const [periodData, setPeriodData] = useState('weekday');
  const [filterTags, setFilterTags] = useState();
  const [filter, setFilter] = useState('all');
  const [indicator, setIndicator] = useState('total');

  useEffect(() => {
    const getStatistics = async () => {
      await statisticsApi.getStatistics({ waiter: '', cashier: '', zone: '', time: '' })
        .then((res) => {
          setStatisticsData(res.data.data);
          setShowData(res.data.data.weekday.data);
          setFilterTags(res.data.data.weekday.filters);
        })
        .catch((err) => {});
      };
    if (statisticsData === null) {
      getStatistics();
    }
  }, [statisticsData]);

  const handlePeriodChange = (period) => {
    if (period !== periodData) {
      setPeriodData(period);
      if (period === 'month') {
        setShowData(statisticsData.month.data);
      } else if (period === 'day') {
        setShowData(statisticsData.day.data);
      } else if (period === 'weekday') {
        setShowData(statisticsData.weekday.data);
      }
    }
  };

  return (
    <div>
      <h1>Estadísticas</h1>
      <h3> Ver datos </h3>
        <Button onClick={() => handlePeriodChange('month')}> Mensual </Button>{' '}
        <Button onClick={() => handlePeriodChange('day')}> Día </Button>{' '}
        <Button onClick={() => handlePeriodChange('weekday')}> Día de la Semana </Button>{' '}
      <h3>Filtro</h3>
        <Button onClick={() => setFilter('all')}> Todos </Button>{' '}
        {filterTags ? filterTags.filters.map((filter) => (
          <><Button onClick={() => setFilter(filter)}> {filter} </Button>{' '}</>
        )): null}
      {filter !== 'all' ? (
        <div>
          <h4>Filtrar por: </h4>
          {filterTags[filter].map((tag) => (
          <><Button>{tag}</Button>{' '}</>))}
        </div>
      ) : null}

      <h3>Indicador</h3>
        <Button onClick={() => setIndicator('total')}>Total</Button>{' '}
        <Button onClick={() => setIndicator('mean')}>Promedio</Button>{' '}
        <Button onClick={() => setIndicator('max')}>Máximo</Button>{' '}
        <Button onClick={() => setIndicator('min')}>Mínimo</Button>{' '}
        <Button onClick={() => setIndicator('num_sales')}>Número de tickets</Button>{' '}
      <h3>Ventas por {periodData}, indicador: {indicator}</h3>
      {showData && <BarChart periodData={showData} period={periodData} filter={'all'} indicator={indicator} />}
    </div>
  );
}

export default Statistics;
