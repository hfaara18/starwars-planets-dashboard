import React, { Component } from 'react';

import { API_PLANETS_ENDPOINT } from '../../common/Variables';
import BarChart from '../visualization/BarChart';
import Table from '../visualization/Table';

class DashBoard extends Component {
  // initializing state variables
  constructor(props) {
    super(props);
    this.state = {
      barChartData: [],
      tableData: null,
      hasPrev: false,
      hasNext: false
    }
  }

  // a function thtat retrieves barchart data from SWAPI endpoint
  async getBarChartDataFromAPI(endPoint) {
    // fetching data from endpoint
    const responseData = await fetch(endPoint)
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.error(error));

    // updating state variable to store newly retrieved planet information
    this.setState({
      barChartData: [...this.state.barChartData, ...responseData.results.map((planetData) => {
        const data = {
        name: planetData.name,
        population: planetData.population
      }
        return data;
      })]
    });

    // fetching next page of results if it exists
    if (responseData.next != null) {
      this.getBarChartDataFromAPI(responseData.next);
    }
  }

  // a function thtat retrieves table data from SWAPI endpoint
  async getTableDataFromAPI(endPoint) {
    // fetching data from endpoint
    const responseData = await fetch(endPoint)
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.error(error));

    // updating state variable to store newly retrieved planet information
    this.setState({
      tableData: responseData,
      hasPrev: responseData.previous !== null,
      hasNext: responseData.next !== null
    });
  }

  // a function that updates table data based on which button
  // is clicked
  handleClick(buttonText) {
    if (buttonText === 'Prev') {
      this.getTableDataFromAPI(this.state.tableData.previous)
    } else if (buttonText === 'Next') {
      this.getTableDataFromAPI(this.state.tableData.next)
    }
  }

  // a function that renders a navigation button
  renderButton(buttonText, canClick, clickAction) {
    const button = canClick ? <button onClick={() => this.handleClick(buttonText)}>{buttonText}</button> : <button disabled>{buttonText}</button>;
    return button;
  }

  // helper function that renders previous and next buttons for data table
  renderButtons() {
    return (
      <>
        {this.renderButton('Prev', this.state.hasPrev)}
        {this.renderButton('Next', this.state.hasNext)}
      </>
    )
  }

  // a function that initially populates table and bar chart data
  componentDidMount() {
    this.getBarChartDataFromAPI(API_PLANETS_ENDPOINT);
    this.getTableDataFromAPI(API_PLANETS_ENDPOINT);
  }

  // rendering visualizations to page
  render() {
    return (
      <div className="container">
        <div>
          <h1>Starwars Planets Dashboard</h1>
        </div>
        <BarChart data={this.state.barChartData} />
        <Table data={this.state.tableData} />
        {this.renderButtons()}
      </div>
    )
  }
}

export default DashBoard;
