import React, {useState, useEffect} from "react";
import statisticsApi from '../../api/statistics';
import { Button } from '@mantine/core';
import BarChart from '../../components/Chart';



function Statistics() {

  const [statisticsData, setStatisticsData] = useState(null);
  const [periodData, setPeriodData] = useState('weekday');
  const [showData, setShowData] = useState(null);

  
  useEffect(() => {
    const getStatistics = async () => {
      await statisticsApi.getStatistics({ waiter: '', cashier: '', zone: '', time: '' })
        .then((res) => {
          setStatisticsData(res.data.data);
          setShowData(res.data.data.weekday);
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
        setShowData(statisticsData.month);
      } else if (period === 'day') {
        setShowData(statisticsData.day);
      } else if (period === 'weekday') {
        setShowData(statisticsData.weekday);
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
      <h3>Ventas por {periodData}</h3>
      {showData && <BarChart periodData={showData} period={periodData} filter='total' />}
    </div>
  );
}

export default Statistics;
