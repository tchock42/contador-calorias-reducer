import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"


const CalorieTracker = () => {

    const {caloriesBurned, caloriesConsumed, netCalories} = useActivity()               // importa el state del Provider

    return (
        <>
            <h2 className="text-4xl font-black text-center">Resumen de Calorias</h2>

            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">     {/* mq > 768 en fila, menor en columna  */} 
                <CalorieDisplay
                    calories = {caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories = {caloriesBurned}
                    text="Quemadas"
                />
                <CalorieDisplay
                    calories = {netCalories}
                    text="Diferencia"
                />
            </div>
            
        </>
    )
}

export default CalorieTracker
