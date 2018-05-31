import React from 'react';
import classes from '../Burger/Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    //object.keys outputs an array of keys as strings
    let transformedIngredients = Object
        .keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            });
        }).reduce ((arr,el)=>{
            //.reduce "flattens the array"
            return arr.concat(el) },[]);
        console.log(transformedIngredients);

        if(transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding your ingredients:</p>;
        }
    return (

        <div className={classes.Burger}>

            <BurgerIngredient type="bread-top"/>
             {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );

}

export default burger;