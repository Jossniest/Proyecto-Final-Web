import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers/rootReducer'


const configureStore = createStore(rootReducer);

export default configureStore;

