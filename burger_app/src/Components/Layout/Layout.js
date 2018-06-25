import React from 'react';
import Aux from '../../Hoc/Aux';
import classes from '../Layout/Layout.css'; 
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (

    <Aux>
<Toolbar/>
<SideDrawer/>
        <main className={classes.Content}>
        {props.children}
    </main>
    </Aux>
);
export default layout;