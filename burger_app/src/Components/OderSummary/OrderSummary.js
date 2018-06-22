import React from 'react';
import Aux from '../../Hoc/Aux';
import Button from '../UI/Button/Button';

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
            <p><strong>Total price: {props.price.toFixed(2)}  </strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>

            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
};





export default orderSummary;