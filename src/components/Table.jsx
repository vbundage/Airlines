import React, { useState } from 'react';
import generateId from '../helpers/generateId';

const Row = ({ columns, format, route }) => (
  <tr>
    {columns.map(column => (
      <td key={generateId()}>{format(column.property, route[column.property])}</td>
    ))}
  </tr>
);

const Table = ({ className, columns, rows, format, perPage }) => {
  const [pages, setPages] = useState({ startIdx: 0, endIdx: 0 + perPage});

  const handleNextClick = () => {
    setPages({
      startIdx: pages.startIdx + perPage,
      endIdx: pages.endIdx + perPage
    });
  };

  const handlePrevClick = () => {
    setPages({
      startIdx: pages.startIdx - perPage,
      endIdx: pages.endIdx - perPage
    });
  };

  return (
    <>
      <table className={className}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={generateId()}>{column.name}</th>  
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(route =>
            <Row key={generateId()} format={format} route={route} columns={columns} />
          ).slice(pages.startIdx, pages.endIdx)}
        </tbody>
      </table>
      <div className="pagination">
          <p>Showing {pages.startIdx + 1}-{pages.endIdx > rows.length ? rows.length : pages.endIdx} of {rows.length} routes.</p>
          <div>
            <button onClick={handlePrevClick} disabled={pages.startIdx === 0}>Previous Page</button>
            <button onClick={handleNextClick} disabled={pages.endIdx >= rows.length}>Next Page</button>
          </div>
      </div>
    </>
  );
};

export default Table;