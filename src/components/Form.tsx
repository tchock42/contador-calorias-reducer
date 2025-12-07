import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"

import { Activity } from "../types"
import { useActivity } from "../hooks/useActivity"

const initialState: Activity = {
    id: uuidv4(),
    category: 1,                           // seleccion del input select 1 0 2
    name: '',                               // seleccion del nombre de la actividad
    calories: 0                             // cantidad de calorias
}
const Form = () => {

    const { state, dispatch } = useActivity()

    const [activity, setActivity] = useState<Activity>( initialState )                       // type de Activity 
    
    //useEffect para detectar un activeId para editar actividad
    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId]);

    //funcion para cambiar el state de Activity
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) =>{
        const isNumberField = ['category', 'calories'].includes(e.target.id)    //se revisa si se manipula category o calories       

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    //funcion para validar formulario
    const isValidActivity = () => {
        const {name, calories } = activity;
        
        return name.trim() !== '' && calories > 0   //retorna true si name es un string válido y calories mayor a 0
    }

    //funcion para el envío del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({type: "save-activity", payload: {newActivity: activity}})

        setActivity({               // resetea el state activity y borra el formulario
            ...initialState,        // copia el initialState
            id: uuidv4()            // genera un id nuevo
        })                  
        
    }

    return (

        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría</label>
                <select 
                    name="" 
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >{categories.map(category => (
                    <option 
                        value={category.id}
                        key={category.id}    
                    >{category.name}</option>
                ))}</select>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Activity:</label>
                <input 
                    type="text"
                    id="name"    
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input 
                    type="number"
                    id="calories"    
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias, ej. 300 0 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            <input 
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" 
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}            //disabled es true si
            />
        </form>
    )
}

export default Form
