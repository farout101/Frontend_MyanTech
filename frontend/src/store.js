// filepath: /d:/Programming Repos/MyanTech ERP/frontend/src/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/userReducer";
import ordersReducer from "./reducers/orderReducer";
import customersReducer from "./reducers/customerReducer";
import warehouseOrdersReducer from "./reducers/warehouseOrdersReducer";
import driversReducer from "./reducers/driverReducer";
import trucksReducer from "./reducers/truckReducer";
import saleDetailReducer from "./reducers/saleDetailReducer";
import allDriverReducer from "./reducers/allDriverReducer";
import deliveryReducer from "./reducers/deliveryReducer";
import allTruckReducer from "./reducers/allTruckReducer";
import returnInfoReducer from "./reducers/returnInfoReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  orders: ordersReducer,
  customers: customersReducer,
  warehouseOrders: warehouseOrdersReducer,
  drivers: driversReducer,
  trucks: trucksReducer,
  saleDetails: saleDetailReducer,
  allDrivers: allDriverReducer,
  allTrucks: allTruckReducer,
  deliveries: deliveryReducer,
  returnInfo: returnInfoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
