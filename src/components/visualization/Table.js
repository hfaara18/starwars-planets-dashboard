import React from 'react';

const planetAttributes = ["name", "population", "rotation_period", "orbital_period", "diameter", "climate", "surface_water"];

function Table(props) {
  const renderTableHeader = () => {
    const headerStrings = planetAttributes.map((item) => {
      let attribute = item.replace("_", " ");
      attribute = attribute.replace(/^\w|\s\w/g, (c) => c.toUpperCase());
      return attribute;
    })
    return (
      <tr>
        { headerStrings.map((header, i) => {
          return <th key={i}>{header}</th>})
        }
      </tr>
    )
  }

  const renderTableRow = (planetData, row_i) => {
    return (
      <tr key={row_i}>
        { planetAttributes.map((attribute, i) => {
          return <td key={i}>{planetData[attribute]}</td>})
        }
      </tr>
    );
  }

  const renderTable = () => {
    return (
      <div>
        <h3>Planet Attributes</h3>
        <table className="table">
          <thead>
            {renderTableHeader()}
          </thead>
          <tbody>
            {props.data.results.map((planetData, row_i) => renderTableRow(planetData, row_i))}
          </tbody>
        </table>
      </div>

    )
  }

  if (props.data === null) {
    return null;
  }
  return renderTable();
}

export default Table;
