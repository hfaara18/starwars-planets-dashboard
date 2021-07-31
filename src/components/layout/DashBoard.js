// import React, { Component } from 'react';
import React, { useState, useEffect, useReducer } from 'react';

import { API_PLANETS_ENDPOINT, NUM_ENTRIES_PER_PAGE } from '../../common/Variables';
import BarChart from '../visualization/BarChart';
import Table from '../visualization/Table';

function DashBoard(props) {
  // initializing action types
  const ACTIONS = {
    GET_DATA: 'GET_DATA',
  };

  // a reducer to handles differently dispached actions
  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.GET_DATA:
        const updatedData = [...state.data, ...action.payload];
        updatedData.sort((a, b) => a.name > b.name);
        return {data: updatedData};
      default:
        return state;
    }
  }

  // initializing the state and page variables
  const [state, dispatch] = useReducer(reducer, {data: []});
  const [page, setPage] = useState(1);

  // a function that updates table data based on which button
  // is clicked
  const handleClick = (buttonText) => {
    if (buttonText === 'Prev') {
      setPage(page - 1);
    } else if (buttonText === 'Next') {
      setPage(page + 1);
    }
  }

  // a function that renders a navigation button
  const renderButton = (buttonText, canClick, clickAction) => {
    const button = canClick ? <button onClick={() => handleClick(buttonText)}>{buttonText}</button> : <button disabled>{buttonText}</button>;
    return button;
  }

  // helper function that renders previous and next buttons for data table
  const renderButtons = () => {
    return (
      <>
        {renderButton('Prev', page > 1)}
        {renderButton('Next', page < state.data.length / NUM_ENTRIES_PER_PAGE)}
      </>
    )
  }

  useEffect(()=> {
    const getPlanetsDataFromAPI = async (endPoint) => {
      // fetching data from endpoint
      const responseData = await fetch(endPoint)
          .then((response) => response.json())
          .then((responseJson) => responseJson)
          .catch((error) => console.error(error));
      // updating state variable to store newly retrieved planet information
      dispatch({type: ACTIONS.GET_DATA, payload: responseData.results});

      // fetching next page of results if it exists
      if (responseData.next != null) {
        getPlanetsDataFromAPI(responseData.next);
      }
    }

    getPlanetsDataFromAPI(API_PLANETS_ENDPOINT);
  }, [ACTIONS.GET_DATA])

  // rendering visualizations to page
  return (
    <div className="container">
      <div>
        <h1>Starwars Planets Dashboard</h1>
      </div>
      <BarChart data={state.data} />
      <Table data={state.data.slice((page-1)*NUM_ENTRIES_PER_PAGE, page*NUM_ENTRIES_PER_PAGE)} />
      {renderButtons()}
    </div>
  )
}

export default DashBoard;
