import React from 'react';
import Aux from '../../Hoc/Aux';
import classes from '../Layout/Layout.css'; 

const layout = (props) => (

    <Aux>
    <div>  Toolbar, Sidedrawer, Backdrop </div>
    <main className={classes.Content}>
        {props.children}
    </main>
    </Aux>
);
export default layout;