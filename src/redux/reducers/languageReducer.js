import {SET_LANGUAGE} from '../actionTypes';
const initState = {
    language: localStorage.getItem('language') || 'en'
}
export default function languageReducer(state = initState, action)
{
    switch(action.type)
    {
        case SET_LANGUAGE: 
            return {...state, language: action.payload}
        default: 
            return state;    
    }
}