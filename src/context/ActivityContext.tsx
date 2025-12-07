import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activityReducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number,
    caloriesBurned: number,
    netCalories: number,
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)  // creacion del context con su type ActivityContextPRops

export const ActivityProvider = ({children}: ActivityProviderProps) => {                        // Provider, type de children declarado en ActivityProviderProps

    const [state, dispatch] = useReducer(activityReducer, initialState)                         // state y dispatch del reducer

    const {activities} = state

    //calorias consumidas
    const caloriesConsumed = useMemo( () => activities.reduce( (total, activity) => activity.category === 1 ? total + activity.calories : total, 0 ), [activities])
    //calorias quemadas
    const caloriesBurned = useMemo( () => activities.reduce( (total, activity) => activity.category === 2 ? total + activity.calories : total, 0 ), [activities])
    //calorias totales
    const netCalories = useMemo( () => caloriesConsumed - caloriesBurned, [activities])

    //useMemo para traer el name respectivo del id de categories
    const categoryName = useMemo(() =>                                      //toma al parámetro activity.category llamado aqui category
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')      // itera en categories hasta encontrar el id que corresponde con activity.category
    ,[activities])                      // cada que se modifica activities, se activa useMemo para traer la categoria correspondiente

    // useMemo para verificar que activities esté vacío
    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])  // retorna true o false 
    return (

        <ActivityContext.Provider
            value={{
                state,                                                                          // exportación de valores del Provider
                dispatch,
                caloriesConsumed,
                caloriesBurned,
                netCalories,
                categoryName,
                isEmptyActivities
            }}
        >
            {children}                                                                          {/** elementps hijos*/} 
        </ActivityContext.Provider>
    )
}