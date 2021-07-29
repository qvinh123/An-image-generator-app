import React from 'react'

import classes from "./AlpacaImage.module.css"

export default function AlpacaImage({ propsImageAlpaca }) {
    return (
        <>
            <img src={propsImageAlpaca.background} alt="Background" className={classes['alpaca__image--background']} />
            <img src={propsImageAlpaca.neck} alt="Neck" className={classes['alpaca__image--neck']} />
            <img src={propsImageAlpaca.nose} alt="Nose" className={classes['alpaca__image--nose']} />
            <img src={propsImageAlpaca.mouth} alt="Mouth" className={classes['alpaca__image--mouth']} />
            <img src={propsImageAlpaca.eyes} alt="eyes" className={classes['alpaca__image--eyes']} />
            <img src={propsImageAlpaca.hair} alt="hair" className={classes['alpaca__image--hair']} />
            <img src={propsImageAlpaca.leg} alt="leg" className={classes['alpaca__image--leg']} />
            <img src={propsImageAlpaca.ears} alt="ears" className={classes['alpaca__image--ears']} />
            <img src={propsImageAlpaca.accessories} alt="accessories" className={classes['alpaca__image--accessories']} />
        </>
    )
}
