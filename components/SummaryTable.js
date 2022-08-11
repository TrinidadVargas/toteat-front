import React from "react";
import { Table, ScrollArea, Container } from '@mantine/core';


function Summary({ data, type, details }) {
  const commonColumns = ['', 'Total $', 'Mean $', 'Max $', 'Min $', 'Num Tickets', 'Diners per day'];
  const columns = type === 'people' ? [...commonColumns, 'Minutes per ticket'] :
    [...commonColumns, 'Minutes per day'];

  const dataToRowData = (rData) => {
    const commonData = [rData.total, Math.round(rData.total / rData.quantity), rData.max,
    rData.min, rData.quantity, Math.round(rData.diners / details.days)];
    const peopleData = [...commonData, Math.round(rData.minutes / rData.quantity)];
    const tableData = [...commonData, Math.round(rData.minutes / details.days)];
    return type === 'people' ? peopleData : tableData;
  };

  const dataToTableRow = (data) => {
    return dataToRowData(data).map((d, idx) => <td key={idx}>{d}</td>)
  };

  const peopleDetailRow = (name) => {
    return (<tr>
      <td><b>{name}</b></td>
      {Array.from(' '.repeat(columns.length - 1)).map((_, idx) => <td key={idx}></td>)}
    </tr>);
  };

  const peopleDetailRows = (name, data) => {
    return (<>
      {peopleDetailRow(name)}
      {Object.entries(data).map(val =>
        <tr key={val[0]}>
          <td>{val[0]}</td>
          {dataToTableRow(val[1])}
        </tr>)}
    </>);
  };

  const zonesRows = (zoneData, tablesData, tablesDetail,) => {
    const zoneNames = ['Vip', 'Salón', 'Terraza'];
    return (<>
      {zoneNames.map(name => <>
        {zoneRow(name, zoneData)}
        {zoneRows(name, tablesData, tablesDetail)}
      </>)}
    </>);
  };

  const zoneRow = (zoneName, zoneData) => {
    return (<tr key={zoneName}>
      <td><>{zoneName}</></td>
      {dataToTableRow(zoneData[zoneName])}
    </tr>);
  };

  const zoneRows = (zoneName, tableData, tablesDetail) => {
    return (<>
      {tablesDetail[zoneName].map(name => <>
        {zoneRow(name, tableData)}
      </>)}
    </>)
  };

  return (
    <ScrollArea style={{ width: '100%' ,marginTop: '25px'}}>
      <Table highlightOnHover style={{ minWidth: '1000px', overflow: 'hidden' }}>
        <thead>
          <tr>{columns.map((col, idx) => <th key={idx}>{col}</th>)}</tr>
        </thead>
        <tbody>
          <tr>
            <td><b>All</b></td>
            {dataToTableRow(data.all)}
          </tr>
          {type === 'people' ? <>
            {peopleDetailRows('Waiters', data.waiter)}
            {peopleDetailRows('Cashiers', data.cashier)}
          </> : <>
            {zonesRows(data.zone, data.table, details.tables)}
          </>}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default Summary;
