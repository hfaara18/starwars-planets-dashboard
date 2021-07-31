import React from 'react';

import BarChart from '../visualization/BarChart';
import Table from '../visualization/Table';

function DashBoard() {
  return (
    <div className="container">
      <BarChart />
      <Table />
    </div>
  )
}

export default DashBoard;
