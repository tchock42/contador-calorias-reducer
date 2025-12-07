import { PencilSquareIcon, XCircleIcon} from '@heroicons/react/24/outline'   //se importa el icono de un lapiz
import { useActivity } from '../hooks/useActivity'


export default function ActivityList() {

    const { state, dispatch, isEmptyActivities, categoryName} = useActivity()
    const {activities} = state

    return (
        <>
            <h2 className='text-4xl font-bold text-slate-600 text-center'>Comida y Actividades</h2>

            {isEmptyActivities ? <p className='text-center my-5'>No hay Actividades aún...</p> :             // detecta si no hay actividades

                activities.map(activity => (                                       //itera para desplegar cada actividad
                    <div
                        key={activity.id} 
                        className="px-5 py-10 bg-white mt-5 flex justify-between"
                    >
                        <div className='space-y-2 relative'>                   {/* div para desplegar la actividad | posicion relativa */}      
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>                                         {/** posicion relativa */}
                                {categoryName(+activity.category)}              {/* pasa el id ingresado por el usuario para buscarlo en categories.tsx con useMemo */}
                            </p>
                            <p className="text-2xl font-bold pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-lime-500">
                                {activity.calories} {''}
                                <span>Calorias</span>
                            </p>
                        </div>
                        <div className="flex gap-5 items-center">                   {/* div para desplegar las acciones del usuario */}   
                            <button
                                onClick={() => dispatch({type: 'set-activeId', payload:{id: activity.id}})} //actualiza el state en activeId con el payload de activity.id
                            >
                                <PencilSquareIcon
                                    className="h-8 w-8 text-gray-800"
                                />
                            </button>
                            <button
                                onClick={() => dispatch({type: 'delete-activity', payload:{id: activity.id}})} //actualiza el state en activeId con el payload de activity.id
                            >
                                <XCircleIcon
                                    className="h-8 w-8 text-red-500"
                                />
                            </button>
                        </div>
                    </div>
                ))
            }
            

        </>
    )
}
