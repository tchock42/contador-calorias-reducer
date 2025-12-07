import { Activity } from "../types"

export type ActivityActions =      //type del action, contiene el type de acciones y type del payload (datos del formulario)
    { type: 'save-activity', payload: {newActivity: Activity}} |    // primer action guardar actividades
    { type: 'set-activeId', payload: {id: Activity['id']}} |        // segunda action editar el id seleccionado
    { type: 'delete-activity', payload: {id: Activity['id']}} |     // tercer action eliminar
    { type: 'restart-app'}

export type ActivityState = {          // definicion del type del estado inicial activityState 
    activities: Activity[]      // activities definido como array de Activity
    activeId: Activity['id']    // type de activeId
}

/**Local Storage */
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activitiesCT')
    return activities ? JSON.parse(activities) : []             // evalua activities, si existe lo transforma a un arreglo, si no, inicializa como []
}

export const initialState: ActivityState = {    //estado inicial. constante initialState con tipado de ActivityState. Objeto con un array activities
    activities: localStorageActivities(),  // inicializa como LS o arreglo vacío
    activeId: ''    // id del elemento a editar inicia como ''
}

export const activityReducer = (                // definicion del reducer, su type y su state y action
        state: ActivityState = initialState,    // define el state con type Activitystate y valor inicial
        action: ActivityActions                 // define el action
    ) => {
    //guardar
    if(action.type === 'save-activity'){
        //Este codigo maneja la lógica para actualizar el state

        let updatedActivities: Activity[] = []

        if(state.activeId){                     // si existe un activeId es una edicion de actividad
            // itera sobre activities para actualizar con el payload.newAction
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        }else{                                  // si no existe un activeID es una nueva actividad
            // crea un nueva actividad junto con las actividades ya existentes
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {                                // retorna un objeto
            ...state,                           // copia de todo el state
            activities: updatedActivities,      // actualiza propiedad activities con la nueva actividad del payload
            activeId: ''
        }                                       // si no es un save-activity, retorna sin cambios state
    }
    //editar
    if(action.type ==='set-activeId'){          //action para seleccionar id para editar

        return{
            ...state,                           // copia el state para mantenerlo
            activeId: action.payload.id         // agrega el atributo activeId con el id del payload
        }
    }
    //eliminar
    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)  // filtra excluyendo el id seleccionado en el form
        }
    }
    //reiniciar
    if(action.type === 'restart-app'){

        return{
            activities: [],
            activeId: ''
        }
    }

    return state                                // retorna el state
}    