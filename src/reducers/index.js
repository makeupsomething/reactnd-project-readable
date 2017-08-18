import {
  ADD_POST,
  REMOVE_POST,
  SHOW_CATEGORIES,
} from '../actions';
import * as API from '../utils/api';


function categories(state = { }, action) {
  switch (action.type) {
    case SHOW_CATEGORIES :
      console.log(action)
      const { categories } = action;
      return {
        ...state,
        [categories]: categories,
      };
    default :
      return state;
  }
}

export default categories;
