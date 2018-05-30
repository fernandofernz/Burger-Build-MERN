import React from 'react';
import Aux from '../../Hoc/Aux'
const layout = (props) => (

    <Aux>
    <div>  Toolbar, Sidedrawer, Backdrop </div>
    <main>
        {props.children}
    </main>
    </Aux>
);