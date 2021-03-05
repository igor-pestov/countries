import React from 'react';
import { NavLink } from "react-router-dom";
import "./Region.scss"

interface IDataRegion {
    selectRegion: Function,
}

export function Region(props: IDataRegion) {
    const { selectRegion } = props

    const region = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

    return (
        <div data-testid="regions" key="regions" className="regions" >
            {region.map(e => {
                return (
                        <NavLink to={`/${e}`} key={e}>
                            <input key={e + "region__button"} className="region__button" type="button" value={e} onClick={(e:any ) => {
                                selectRegion(e.target.value)
                            }} />
                        </NavLink>
                )
            })}
        </div>
    );
}

