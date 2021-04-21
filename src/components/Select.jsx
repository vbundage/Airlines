import React from 'react';

const Select = ({ options, valueKey, titleKey, allTitle, value, onSelect }) => {
  options.sort((optionA, optionB) => optionA.name > optionB.name);
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
            {obj[titleKey]} ({obj.count})
          </option>
        )
      })}
    </select>
  );
};

export default Select;