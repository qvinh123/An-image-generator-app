import React from 'react'

import classes from "./ButtonChoose.module.css"

export default function ButtonChoose(props) {
    return (
        <li className={classes.buttonChoose}>
            <a
                style={props.style?props.style:null}
                href
                onClick={props.click}
                className={`${classes['buttonChoose__link']} ${props.active ? `${classes.active}` : null}`}>
                {props.name}
            </a>
        </li>
    )
}
