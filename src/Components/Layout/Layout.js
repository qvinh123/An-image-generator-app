import React from 'react'

import classes from "./Layout.module.css"

export default function Layout(props) {
    return (
        <div className={classes.alpaca}>
            <div className={classes.alpaca__title}>
                <h1>Alpaca Generator</h1>
            </div>
            <main>{props.children}</main>
        </div>
    )
}
