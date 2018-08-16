import React , {Component} from 'react';
import Aux from '../../Hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/OderSummary/OrderSummary';
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component  {
     
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }
    updatePurchaseState (ingredients) {
      
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el)=> {
            return sum + el;
        },0);
        this.setState({purchaseable: sum >0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
        
    }

     purchaseHandler = () => {
        this.setState({purchasing: true});
     }
     purchaseCancelHandler = () => {
         this.setState({purchasing: false});
     }
     purchaseContinueHandler = () => {
         //alert ('You may continue!');
         const order = {
             ingredients: this.state.ingredients,
             price: this.state.totalPrice,
             customer: {
                 name: "Fernz",
                 address: {
                     street: "Test Street 123", 
                     zipcode: 90129,
                     country: "USA"
                 },
                 email: "fernz.email.com"
             },
             deliveryMethod: "fastest"
         }
         axios.post('/orders.json',order)
         .then(response => console.log(response))
         .catch(error => console.log(error));
     }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients = {this.state.ingredients}
                    purchaseCanceled = {this.purchaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler}
                    price = {this.state.totalPrice} />
                </Modal>
                 <Burger ingredients = {this.state.ingredients}/>
                 <BuildControls 
                 ingredientAdded = {this.addIngredientHandler}
                 ingredientRemoved = {this.removeIngredientHandler}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}
                 purchaseable={this.state.purchaseable}
                 ordered={this.purchaseHandler}
            
                 />
            </Aux>
        );
    }
}
export default BurgerBuilder; 