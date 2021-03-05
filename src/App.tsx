import React, { useEffect, useState } from 'react';
import './App.scss';
import CountriesList from './CountriesList/CountriesList';
import { Switch, Route } from "react-router-dom";
import { Region } from './Region/Region';
import NotPage from './404/404';
interface IDataRegion {
  dataRegion: Array<Object>,
}
function App() {
  const [dataRegion, setDataRegion] = useState<IDataRegion>()
  const [strRegion, setStrRegion] = useState('')
  const [error, setError] = useState<Boolean>()
  async function http(
    request: RequestInfo
  ): Promise<any> {
    const response = await fetch(request);

    if (response?.status === 404 || !response) {
      setError(true)
    } else {
      setError(false)
      const body = await response.json();
      return body;
    }
  }
  async function selectRegion(str: string) {

    setStrRegion(str)
    const data = await http(
      `https://restcountries.eu/rest/v2/region/${str}`
    );
    data && setDataRegion(data)

  }
  useEffect(() => {
    (async function () {
      const data = !!window.location.pathname.slice(1) && await http(
        `https://restcountries.eu/rest/v2/region/${window.location.pathname.slice(1)}`
      );
      data && setDataRegion(data)
    })();
  }, [])

  return (
    <div data-testid="App" className="App">
      <div className="header"><h1>Countries</h1></div>
      <Region selectRegion={selectRegion} />

      {error ? < NotPage /> : <Switch>
        <Route exact path="/">
          <div>
            Select region
          </div>
        </Route>
        <Route path={`/${strRegion}`} >
          <CountriesList data={dataRegion} />
        </Route>
      </Switch>}

    </div>
  );
}

export default App;
