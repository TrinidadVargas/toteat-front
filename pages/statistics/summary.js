import React, {useState, useEffect} from "react";
import Head from 'next/head'
import { Button, Container, Popover, SegmentedControl, Stack, Text} from '@mantine/core';
import statisticsApi from '../../api/statistics';
import Summary from "../../components/SummaryTable";

function Summaries({}) {
  const [data, setData] = useState(null);
  const [summaryType, setSummaryType] = useState('people');

  const getData = async (filters) => {
    await statisticsApi.getSummary()
      .then((res) => {
        setData(res.data.data);
      }).catch((err) => {});
  }

  useEffect(() => {
    if (data === null)
      getData(null);
  },[data]);

  return (
    <div>
      <Head>
        <title>Summary</title>
      </Head>
      <Container style={{ padding: '4px', paddingBottom: '16px' }}>
        <h1>Summaries</h1>
        <Popover width={500} position="right" withArrow shadow="md"
          style={{ width: 200, marginBottom: '16px' }}>
        <Popover.Target>
              <Button style={{width: '150px', marginBottom: '10px'}}>Help</Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm">This is a detailed summary of the metrics of the restaurant. 
              You can see de data by waiter and cashier or by zone and table</Text>
            </Popover.Dropdown> 
        </Popover>
        <Stack styles={{margin: '50px'}}>
          <SegmentedControl
            value={summaryType}
            onChange={setSummaryType}
            data={[
              { label: 'Summary by waiter and cashier', value: 'people' },
              { label: 'Summary by zone and tables', value: 'tables' }
            ]}
          />
        </Stack>
        {data && <Summary data={data} type={summaryType} details={data.details}/>}
      </Container>
    </div>
  );
};

export default Summaries;
