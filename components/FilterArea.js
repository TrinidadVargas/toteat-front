import React from "react";
import { Button, Container, Chip, Group, Select, SegmentedControl, Popover, Text, Stack, ScrollArea } from '@mantine/core';
import { capitalizeFirstLetter } from '../utils/formatValues/formatText';


function FilterArea({filterOptions, filterSelection, 
  setFilterSelection, selectedPeriodChange}) {
  return (<div>
    <Container>
      <h1>Sales</h1>
        <Popover width={500} withArrow shadow="md" position="right">
          <Popover.Target>
            <Button style={{width: '150px', marginBottom: '10px'}}>Help</Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm">See the data per different periods and filter by waiter, cashier, zone or time. 
            Lunch is before 5pm and dinner is after 5 pm.</Text>
          </Popover.Dropdown>
        </Popover>
        <Group dir="horizontal" style={{ padding: '4px', paddingBottom: '16px' }}>
          <Select
            placeholder="Total sales / Metric"
            value={filterSelection.indicator}
            onChange={(indicator) => setFilterSelection({...filterSelection, indicator})}
            data={[
              { label: 'Total sales', value: 'total' },
              { label: 'Average sales', value: 'mean' },
              { label: 'Max sale', value: 'max' },
              { label: 'Min sale', value: 'min' },
              { label: 'Total tickets', value: 'quantity' }
            ]}
          />
          <SegmentedControl
            value={filterSelection.period}
            onChange={(period) => selectedPeriodChange(period)}
            data={[
              { label: 'Month', value: 'month' },
              { label: 'Week day', value: 'weekday' },
              { label: 'Day', value: 'day' }
            ]}
          />
          {filterSelection.filter !== 'all' && 
            <Button size="xs" variant="light" radius="xl" rightIcon="X"
              onClick={() => setFilterSelection({...filterSelection, filter: 'all'})}>
              {capitalizeFirstLetter(filterSelection.filter)}
              : {capitalizeFirstLetter(filterSelection[filterSelection.filter])}
            </Button>
          }
        </Group>
        <Stack>
          <SegmentedControl
            value={filterSelection.filter}
            onChange={filter => setFilterSelection({...filterSelection, filter})}
            data={[
              { label: 'All', value: 'all' },
              { label: 'Waiter', value: 'waiter' },
              { label: 'Cashier', value: 'cashier' },
              { label: 'Zone', value: 'zone' },
              { label: 'Time', value: 'time' }
            ]}
          />
          <ScrollArea style={{width: '100%', height: '45px'}} scrollbarSize={2} scrollHideDelay={500}>
            <Group spacing="xs" noWrap style={{ marginBottom: '15px'}}>
              {filterSelection.filter !== 'all' && 
                filterOptions[filterSelection.filter].map((item) => (
                  <Chip key={item} size="xs" variant="filled" radius="xl"
                    checked={filterSelection[filterSelection.filter] === item}
                    onClick={() => setFilterSelection({...filterSelection, [filterSelection.filter]: item})}>
                    {capitalizeFirstLetter(item)}</Chip>
                ))}
            </Group>
          </ScrollArea>
        </Stack>
      </Container>    
  </div>)
}

export default FilterArea;
