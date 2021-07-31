import React, { Component } from 'react';

import { API_PLANETS_ENDPOINT } from '../../common/Variables';
import BarChart from '../visualization/BarChart';
import Table from '../visualization/Table';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartData: [],
      tableData: null
    }
  }

  async getBarChartDataFromAPI(endPoint) {
    const responseData = await fetch(endPoint)
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.error(error));

    this.setState({
      barChartData: [...this.state.barChartData, ...responseData.results.map((planetData) => {
        const data = {
        name: planetData.name,
        population: planetData.population
      }
      return data;
      })]
    });

    if (responseData.next != null) {
      this.getBarChartDataFromAPI(responseData.next);
    }
  }

  async getTableDataFromAPI(endPoint) {
    const responseData = await fetch(endPoint)
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.error(error));

    this.setState({
      tableData: responseData
    });
  }

  componentDidMount() {
    this.getBarChartDataFromAPI(API_PLANETS_ENDPOINT);
    this.getTableDataFromAPI(API_PLANETS_ENDPOINT);
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Starwars Planets Dashboard</h1>
        </div>
        <BarChart data={this.state.barChartData} />
        <Table data={this.state.tableData} />
      </div>
    )
  }
}

export default DashBoard;
