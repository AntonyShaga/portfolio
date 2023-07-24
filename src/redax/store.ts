import {createStore} from "redux";
import {portfolioReducer} from "./redax";

export const store = createStore(portfolioReducer)

export type RootStoreType = ReturnType<typeof portfolioReducer>