import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name :)',
                },
                value:'', 
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value:'', 
                validation: {
                    required: true
                },
                valid: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value:'', 
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value:'', 
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'e-mail',
                },
                value:'', 
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        //prevents form submission
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({loading: true});
        //pushing data
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        };
        //order to be passed
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios
            .post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this
                    .props
                    .history
                    .push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });

    }
   

    checkValidity (value, rules) {

        let isValid = true;

        if (rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        

        return isValid;
    }

    //inputIdentifier to reachout to state
    inputChangeHandler =  (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;

        //validation
        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
                console.log(updatedFormElement);
        //setState
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElementArray = [];
        for ( let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]

            });
        }
        let form = (
            <form>
                {formElementArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (

            <div className={classes.ContactData}>
                <h4>Enter your contact information</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;