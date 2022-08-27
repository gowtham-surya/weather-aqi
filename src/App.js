import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './App.css';
import './assets/css/grid.css';
import treeHappy from './assets/images/tree-happy.png';
import Header from './components/Header';

const App = () => {
  const [entry, setEntry] = useState('No');

  const weatherTitle = [
    {
      name: 'Temperature',
      image: 'bx bxs-hot temp-color',
      value: '25°C',
    },
    {
      name: 'Humidity',
      image: 'bx bx-cloud-rain rain-color',
      value: '78%',
    },
    {
      name: 'Ozone level',
      image: 'bx bx-wind rain-color',
      value: '18%',
    },
  ];

  var radialBar = {
    options: {
      colors: ['#095d14'],
      plotOptions: {
        radialBar: {
          startAngle: -120,
          endAngle: 120,
          track: {
            background: '#333',
            startAngle: -120,
            endAngle: 120,
          },
          hollow: {
            margin: 15,
            size: '50%',
          },
          dataLabels: {
            name: {
              show: true,
              color: '#000',
              fontSize: '16px',
            },
            value: {
              color: '#111',
              fontSize: '16px',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          colorStops: [
            {
              offset: 0,
              color: '#095d14',
              opacity: 1,
            },
            {
              offset: 60,
              color: '#c4db15',
              opacity: 1,
            },
            {
              offset: 100,
              color: '#e02222',
              opacity: 1,
            },
          ],
        },
      },
      stroke: {
        lineCap: 'round',
      },
      labels: ['PM 2.5'],
    },
  };

  const airPollutants = [
    {
      name: 'PM 2.5',
      value: 15,
    },
    {
      name: 'VoC',
      value: 18,
    },
    {
      name: 'SO2',
      value: 6,
    },
    {
      name: 'NO2',
      value: 17,
    },
    {
      name: 'CO',
      value: 10,
    },
    {
      name: 'NH3',
      value: 14,
    },
  ];

  const [weather, setWeather] = useState(weatherTitle);
  const [pollution, setPollution] = useState(airPollutants);
  const [axdata, setaxdata] = useState();

  useEffect(() => {
    setInterval(() => {
      axios
        .get('https://exploremychoice.in/sih/evolvers/getdata.php')
        .then((response) => {
          setaxdata(response.data[0]);
        });

      setWeather([
        {
          name: 'Temperature',
          image: 'bx bxs-hot temp-color',
          value: `${axdata.temperature}°C`,
        },
        {
          name: 'Humidity',
          image: 'bx bx-cloud-rain rain-color',
          value: `${axdata.humidity}%`,
        },
        {
          name: 'Ozone level',
          image: 'bx bx-wind rain-color',
          value: `${axdata.ozone}%`,
        },
      ]);

      setPollution([
        {
          name: 'PM 2.5',
          value: axdata.pm2,
        },
        {
          name: 'VoC',
          value: axdata.voc,
        },
        {
          name: 'SO2',
          value: axdata.so2,
        },
        {
          name: 'NO2',
          value: axdata.no2,
        },
        {
          name: 'CO',
          value: axdata.co,
        },
        {
          name: 'NH3',
          value: axdata.nh3,
        },
      ]);
    }, 10000);
  }, [axdata]);

  return (
    <div>
      <Header />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="card-container">
                <h4>Chennai Port Air Quality Index</h4>
                <h5>Real-time air pollution in Port</h5>
                <div className="card-details row">
                  <div className="flexbox fdir-col col-6">
                    <h5>Last Update: 27 Aug 2022, 04:00pm</h5>
                    <button className="btn">Satisfactory</button>
                  </div>
                  <div className="flexbox col-6">
                    <h1>98</h1>
                    <img src={treeHappy} width="200px" alt="Tree Happy"></img>
                  </div>
                </div>
              </div>
              <div className="row">
                {weather.map((lists, index) => (
                  <div className="col-4" key={index}>
                    <div className="status-card flexbox fdir-col">
                      <h4>{lists.name}</h4>
                      <div className="flexbox">
                        <i className={lists.image}></i>
                        <h5>{lists.value}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="card-container col-4"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '430px',
              }}
            >
              <h5 style={{ marginBottom: '2rem' }}>AQI Calculator</h5>
              <label htmlFor="will-container">Is Ship Entry?</label>
              <div
                className="will-container"
                onChange={(e) => setEntry(e.target.value)}
              >
                <input type="radio" name="will" value="Yes"></input>
                <label htmlFor="Yes">Yes</label>
                <input type="radio" name="will" value="No"></input>
                <label htmlFor="No">No</label>
              </div>
              {entry === 'Yes' ? (
                <form className="form-container">
                  <label htmlFor="dropDown">Type of Shipment:</label>
                  <datalist id="suggestions">
                    <option value="Coal">Coal</option>
                    <option value="Iron Ore">Iron Ore</option>
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="POL">POL</option>
                  </datalist>
                  <input
                    autoComplete="on"
                    type="text"
                    list="suggestions"
                    className="dropDown"
                  />
                  <label htmlFor="fromDate">Staying From:</label>
                  <input
                    type="date"
                    name="ship-details"
                    width="100%"
                    className="fromDate"
                  ></input>
                  <label htmlFor="toDate">Staying Upto:</label>
                  <input
                    type="date"
                    name="ship-details"
                    width="100%"
                    className="toDate"
                  ></input>
                  <button type="submit">Calculate</button>
                </form>
              ) : (
                <p style={{ marginTop: '1rem' }}>
                  Select \'Yes\' to enter ship details
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="row">
                {pollution.map((lists, index) => (
                  <div className="col-2" key={index}>
                    <div className="status-card status-card-bar flexbox fdir-col">
                      <div className="flexbox">
                        <Chart
                          series={[lists.value]}
                          options={{
                            ...radialBar.options,
                            labels: [lists.name],
                          }}
                          type="radialBar"
                          height="200px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card-container col-12">
            <iframe
              src="https://public.tableau.com/views/final-2_16608840188550/Dashboard2?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true"
              title="Graph"
              width="100%"
              height="600px"
            ></iframe>
          </div>
          <div className="card-container col-12">
            <iframe
              src="https://public.tableau.com/views/final_16608805948390/MainDashboard?:language=en-US&:display_count=n&:origin=viz_share_link:showVizHome=no&:embed=true"
              title="Graph"
              width="100%"
              height="600px"
            ></iframe>
          </div>
        </div>
        <div className="body_background"></div>
      </div>
    </div>
  );
};

export default App;
