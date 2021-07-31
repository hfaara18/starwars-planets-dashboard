import React from 'react';

// the list of attribute to displau
const planetAttributes = [
  "name",
  "population",
  "rotation_period",
  "orbital_period",
  "diameter",
  "climate",
  "surface_water"];

function Table(props) {
  // a function that renders the columns headers for each columns
  const renderTableHeader = () => {
    // processing the attribute names into more human-friendly text
    const headerStrings = planetAttributes.map((item) => {
      let attribute = item.replace("_", " ");
      attribute = attribute.replace(/^\w|\s\w/g, (c) => c.toUpperCase());
      return attribute;
    })

    // rendering the headers to page
    return (
      <tr>
        { headerStrings.map((header, i) => {
          return <th key={i}>{header}</th>})
        }
      </tr>
    )
  }

  // a functionn that renders a table row with planet data
  const renderTableRow = (planetData, row_i) => {
    return (
      <tr key={row_i}>
        { planetAttributes.map((attribute, i) => {
          return <td key={i}>{planetData[attribute]}</td>})
        }
      </tr>
    );
  }

  // a function that renders the entire data table
  const renderTable = () => {
    return (
      <div>
        <h3>Planet Attributes</h3>
        <table className="table">
          <thead>
            {renderTableHeader()}
          </thead>
          <tbody>
            {props.data.map((planetData, row_i) => renderTableRow(planetData, row_i))}
          </tbody>
        </table>
      </div>

    )
  }

  // handle the case for when the data isn't fetched yet
  if (props.data === null) {
    return null;
  }
  return renderTable();
}

export default Table;
