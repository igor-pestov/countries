import React, { memo, useEffect, useState, useMemo } from "react"
import { Country } from "../Country/Country"
import "./CountriesList.scss"
interface ISortConfig {
  key: string
  direction: string
}
const useSortableData = (items: Array<Object>, config = null) => {
  const [sortConfig, setSortConfig] = useState<ISortConfig | null>(config);

  useEffect(() => {

    items && document.getElementsByClassName("countries__list")[0].scrollTo(0, 0)
    setSortConfig(null)
  }, [items])
  const sortedItems = useMemo(() => {
    let sortableItems = items && [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const CountriesList =
  ({ data }: any) => {

    const [country, setCountry] = useState()
    const { items, requestSort, sortConfig } = useSortableData(data);


    const closeFunc = () => {
      setCountry(undefined)
    }

    const getClassNamesFor = (name: string) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
      <div data-testid="countries-list" className="countries__list">
        <Country country={country} closeFunc={closeFunc} />

        <table>
          <caption>
            <h2>
              {data && data[0].region}
            </h2>
          </caption>
          <thead className="table__head">
            <tr>
              <th className="name__item">
                <button
                  type="button"
                  onClick={() => requestSort('name')}
                  className={getClassNamesFor('name')}
                >
                  Name
                </button>
              </th>
              <th className="population__item">
                <button
                  type="button"
                  onClick={() => requestSort('population')}
                  className={getClassNamesFor('population')}
                >
                  Population
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item: any) => {
              const { name, alpha3Code, population } = item
              return (

                <tr key={name} onClick={() => {
                  setCountry(alpha3Code)
                }}>
                  <td>{name}</td>
                  <td>{population}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    );
  }
export default memo(CountriesList)