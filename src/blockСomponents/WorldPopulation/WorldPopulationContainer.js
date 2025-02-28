import React, {useEffect, useState} from "react";
import WorldPopulation from "./WorldPopulation";

let WorldPopulationContainer = (props) => {

    let interval = null;
    const [populationSize, setPopulationSize] = useState(7911135151);
    const [volatility, setVolatility] = useState(0)
    const population1970 = 3531865500;   /* the population of the earth on January 16, 1970 */
    const unixTime01161970 = 1320057000; /* January 16, 1970 Unix time */
    const growth = 2.66;                 /* average population growth per 1 second for 2018 (difference between birth rate and mortality) */
    const volatilityСoefficient = 10;    /* volatility coefficient */

    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    let date = new Date().toLocaleString("en-US", options);

    useEffect(
        () => {
            interval = setInterval(() => {
                let utc = new Date().getTime();
                let populationSize = Math.round((utc - unixTime01161970) * growth / 1000) + population1970 - volatility;
                setPopulationSize(dividedDigits(populationSize));
                setVolatility(Math.round(Math.random() * volatilityСoefficient));
            }, 200)
            return () => clearInterval(interval);
        }, [volatility]
    )

    const dividedDigits = (multitude) => {
        return multitude.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return <WorldPopulation populationSize={populationSize} date={date}/>
}

export default WorldPopulationContainer;