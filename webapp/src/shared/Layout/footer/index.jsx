import React from 'react';
import classes from './Footer.module.css';

export default function Footer() {
    const current_year = new Date().getFullYear()
    return (
        <footer className={classes.footer}>
            <div className={ [classes.container, 'p-1'].join(' ') } >Контакты:</div>
            <div className="text-center p-1">
                © {current_year} Copyright: КГТУ им. И.Раззакова
            </div>
        </footer>
    );
}
