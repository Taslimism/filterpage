import React from 'react';
import style from './Footer.module.css'

const Footer = () => {
    return <div className={style["footer-container"]}>
        <h1 className={style["footer-title"]}>Created by <a href="https://github.com/Taslimism">Taslim</a></h1>
    </div>
}

export default Footer;