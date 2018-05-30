import React from 'react';

const layout = (props) => (
    <div>  Toolbar, Sidedrawer, Backdrop </div>
    <main>
        {props.children}
    </main>
);