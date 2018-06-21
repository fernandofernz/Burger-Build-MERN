import React from 'react';
import Aux from '../../Hoc/Aux';

const orderSummary = (props) => {

    //Object.keys transforms object into an array of keys
    const ingredientSummary= Object.keys(props.ingredients).map(igKey =>{
        return(
        //span wrapper makes first letter capital
        <li key={igKey}> <span style = {{textTransform: 'capitalize'}}> {igKey} </span> :  {props.ingredients[igKey]}
        </li>);
    });
 

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients!</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    );
};





export default orderSummary;