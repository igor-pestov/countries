import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Country.scss"

export function Country(props: any) {
    const { closeFunc, country } = props
    const [countryInfo, setCountryInfo] = useState<any>()

    useEffect(() => {

        !!country && selectCountry(country)
    }, [props])
    async function http(
        request: RequestInfo
    ): Promise<any> {
        const response = await fetch(request);
        const body = await response.json();
        return body;
    }
    async function selectCountry(str: any) {
        const data = str && await http(
            `https://restcountries.eu/rest/v2/alpha/${str}`
        );
        setCountryInfo(data)
    }
    return createPortal(
        country && <div className="pelena" onClick={(e:any) => {
            if (e.target.className === "pelena") {
                closeFunc()
                setCountryInfo(undefined)
            }
        }}>
            <div className="modal" hidden={country ? false : true}
            >
                {countryInfo ?
                    <div className="info">

                        <h2>{countryInfo?.name}</h2>
                        <div className="info__country">
                            <div className="info__country__block">
                                <div className="info__country__block__1">
                                    <h3>Region: <span>  {countryInfo?.region}</span>   </h3>
                                    <h3>Capital: <span> {countryInfo?.capital}</span></h3>
                                    <h3>Area: <span> {countryInfo?.area} km²</span></h3>
                                    <h3>Population:<span>  {countryInfo?.population} </span></h3>
                                </div>
                                <div>
                                    <img src={countryInfo?.flag} alt={`flag`} />
                                </div>
                            </div>

                            <div className="info__country__block__2" >
                                <div>
                                    <h3>Currencies: </h3>
                                    {countryInfo?.currencies.map((e: any) => {
                                        const { name, symbol ,code} = e
                                        return (

                                            <span key={name}> {name && name} {symbol && " / " + symbol} {code && " / " + code}</span>

                                        )
                                    })}
                                </div>
                                <div>
                                    <h3>Languages: </h3>
                                    {countryInfo?.languages.map((e: any) => {
                                        const { name } = e

                                        return (
                                            <span key={name}> {name}</span>
                                        )
                                    })}
                                </div>
                                <div>
                                    <h3>Timezones: </h3>
                                    {countryInfo?.timezones.map((e: any) => {
                                        return (
                                            <span key={e}> {e}</span>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>

                    </div>
                    : <div className="loader"></div>}
                <input className="button__info__country" type="button" value="X" onClick={() => {
                    closeFunc()
                    setCountryInfo(undefined)
                }} />

            </div>
        </div>, document.body

    )
}