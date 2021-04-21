import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect }) => {
  return (
    <select onChange={onSelect} value={value}>
      <option value='all'>{allTitle}</option>
      {options.map(obj => {
        return (
          <option
            key={obj[valueKey]}
            value={obj[valueKey]}
            disabled={!obj['active']}
          >
            {obj[titleKey]}
          </option>
        )
      })}
    </select>
  );
};

export default Select;