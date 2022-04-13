
import { shoppingReducer, shoppingInitialState } from "../components/reducer/shoppingReducer";
import { TYPES } from "./actions/shoppingActions";
import { useReducer } from "react";
import CartItem from "./CartItem";
import Product from "./Product";


const ShoppingCart = () => {

    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)

    const {products, cart} = state

    const addToCart = (id) => {
        dispatch({type: TYPES.ADD_TO_CART, payload: id})
    }

    const deleteFromCart = (id, all = false) => {
        if (all) {
            dispatch({type: TYPES.REMOVE_ALL_PRODUCTS, payload: id})
        } else {
            dispatch({type: TYPES.REMOVE_ONE_PRODUCT, payload: id})
        }
  
    }

    const clearCart = () => {
        dispatch({types: TYPES.CLEAR_CART})
    }

return (
    <>
    <h2>Carrito de Compras</h2>
    <h3>Productos</h3>
        <div >
            {products.map(product => <Product 
                key={product.id}
                data={product}
                addToCart={addToCart}
                />)}
        </div>
        <h3>Carrito</h3>
    <div >
        {cart.map((item, index) => <CartItem 
        key={index}
        data={item} deleteFromCart={deleteFromCart}/>
        )} 

    </div>
    <button onClick={() => clearCart()} className="btn">Limpiar Carrito</button>
    </>
    );
};
export default ShoppingCart;