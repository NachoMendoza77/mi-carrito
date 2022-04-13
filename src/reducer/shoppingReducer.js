
import { TYPES } from "../actions/shoppingActions";


export const shoppingInitialState = {
products: [
{ id: 1 , nam: "Producto A", price: 10 },
{ id: 2 , nam: "Producto B", price: 50 },
{ id: 3 , nam: "Producto C", price: 100 },
{ id: 4 , nam: "Producto D", price: 150 },
{ id: 5 , nam: "Producto E", price: 200 },
],

cart: [],
};



export function shoppingReducer (state , action ) {
    switch ( action.type ) {
        case TYPES.ADD_TO_CART: {
                let newItem = state.products.find((product) => product.id === action.payload); //OK
            
                let ItemInCart = state.cart.find((item) => item.id === newItem.id);//OK

                return ItemInCart 
                ? {
                    ...state,
                    cart: state.cart.map(item => item.id === newItem.id //OK
                    ? {...item, quantity: item.quantity + 1}
                    :item
                    ), 
                }

                : {
                    ...state,
                    cart: [...state.cart, { ...newItem, quantity: 1}], //OK
                }
                }
            

        case TYPES.REMOVE_ONE_PRODUCT: {
                let itemToDelete = state.cart.find(item => item.id === action.payload);

                return itemToDelete.quantity > 1
                ? {
                    ...state,
                    cart: state.cart.map((item) => item.id === action.payload
                    ? {...item, quantity: item.quantity - 1}
                    : item 
                    ),
                }
                : {
                    ...state, 
                    cart: state.cart.filter(item => item.id !== action.payload)
                }

        }
        case TYPES.REMOVE_ALL_PRODUCTS: {
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        }
        case TYPES.CLEAR_CART: {
            return shoppingInitialState
        }
        default:
        return state;
    
    }
}