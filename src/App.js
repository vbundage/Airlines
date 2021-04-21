import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import Select from './components/Select';
import Map from './components/Map';
import { getAirlineById, getAirportByCode } from './data';
import data from './data';

const { routes, airlines, airports } = data;
const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

const PAGE_LIMIT = 25;

const App = () => {
  const [airline, setAirline] = useState('all');
  const [airport, setAirport] = useState('all');

  const formatValue = (property, value) => {
    switch (property) {
      case 'airline':
        return getAirlineById(value).name;
      case 'src':
      case 'dest':
      default:
        return getAirportByCode(value).name;
    }
  };

  const filterRoutes = () => {
    let filteredRoutes = routes;
    if (airline === 'all'  && airport === 'all') return filteredRoutes;
    filteredRoutes = filteredRoutes.filter(route => {
      if (airline === 'all') return true;
      return route.airline === Number(airline);
    });

    filteredRoutes = filteredRoutes.filter(route => {
      if (airport === 'all') return true;
      return (route.src === airport || route.dest === airport);
    });

    return filteredRoutes;
  };

  const handleAirlineChange = (event) => {
    setAirline(event.target.value);
  };

  const handleAirportChange = (event) => {
    setAirport(event.target.value);
  };

  const handleAllRoutesClick = () => {
    setAirline('all');
    setAirport('all');
  };

  const filteredRoutes = filterRoutes();
  
  const filteredAirlines = airlines.map(airline => {
    if (filteredRoutes.find(route => route.airline === airline.id)) {
      airline = {
        ...airline,
        active: true
      };
    }
    return Object.assign({}, airline);
  });

  const filteredAirports = airports.map(airport => {
    if (filteredRoutes.find(route =>
      route.src === airport.code || route.dest === airport.code)) {
      airport = {
        ...airport,
        active: true
      };
    }
    return Object.assign({}, airport);
  });

  return (
    <div className="app">
      <Header />
      <section>
        <Map routes={filteredRoutes} getAirport={getAirportByCode} />
        <p>
          Show routes on
          <Select
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={airline}
            onSelect={handleAirlineChange}
          />
          flying in or out of
          <Select
            options={filteredAirports}
            valueKey="code"
            titleKey="name"
            allTitle="All Airports"
            value={airport}
            onSelect={handleAirportChange}
          />
          <button onClick={handleAllRoutesClick} disabled={airline === 'all' && airport === 'all'}>Show All Routes</button>
        </p>
        <Table className="routes-table" columns={columns} rows={filteredRoutes} format={formatValue} perPage={PAGE_LIMIT} />
      </section>
    </div>
  )
};

export default App;