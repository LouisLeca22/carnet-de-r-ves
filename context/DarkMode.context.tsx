import React, { createContext, useReducer, useContext, useEffect } from "react";

type AppState = typeof initialState

type Action = 
| {type: 'SWITCH_MODE'}
| {type: "INIT_MODE", payload: boolean}

type DarkModeProviderProps = {
    children: React.ReactNode
}

const initialState = {
    mode : false
}

// reducer
const reducer = (state: AppState, action: Action) => {
    
    switch(action.type){
        case "SWITCH_MODE":
            return  {
                ...state,
                mode : !state.mode
            }

        case 'INIT_MODE':
            return {
                ...state,
                mode: action.payload
            }
        default:
            return state
    }
}


// Context 
export const DarkModeContext = createContext({...initialState, switchMode: () => {}});

// ContextProvider
export function DarkModeProvider({children}: DarkModeProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Action 
    const switchMode = () => {
        dispatch({type: "SWITCH_MODE"})
        localStorage.setItem("mode", JSON.stringify(!state.mode))
    }

    // retieve mode from local storage
    useEffect(() => {
        const modeFromStorage = JSON.parse(localStorage.getItem("mode") || 'null')
        dispatch({type: 'INIT_MODE', payload: modeFromStorage})
    }, [])

    return (
        <DarkModeContext.Provider value={{...state, switchMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}


// hook for DarkMode Context
export const useDarkModeContext = () => {
    return useContext(DarkModeContext)
}







