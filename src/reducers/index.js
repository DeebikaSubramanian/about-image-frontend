import { combineReducers } from "redux";
import posts from './Reducers_posts'
import auth from './auth1'
export const reducers= combineReducers({posts,auth});