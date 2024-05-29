import { categories } from "../data/categories";
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";
import { v4 as uuidv4 } from 'uuid'


// Se traen las activity actions porque el dispatch es de ese reducer 
type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state} : FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumber = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumber ? +e.target.value : e.target.value
        })
    }


    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }


  return (
    <form 
        className=" space-y-5 bg-white shadow p-10 rounded-lg"
        onSubmit={handleSubmit}
    >

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className=" font-bold">Categoría:</label>
            <select     
                name="category" 
                id="category"
                className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option 
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className=" font-bold">Actividad:</label>
            <input 
                type="text"
                className="border border-salate-300 rounded-lg p-2"
                id="name"
                placeholder='Comida, Jugo de naranja, Ensalada, Trote'
                value={activity.name}
                onChange={handleChange}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className=" font-bold">Calorías:</label>
            <input 
                type="number"
                className="border border-salate-300 rounded-lg p-2"
                id="calories"
                placeholder="300"
                value={activity.calories}
                onChange={handleChange}
            />
        </div>

        <input 
            type="submit"
            className=" bg-gray-800 hover:bg-gray-900 text-white cursor-pointer w-full font-bold uppercase p-2 disabled:opacity-10"
            value={activity.category === 1 ? 'Guardar comida' : 'Guarda ejercicio' }
            disabled={!isValidActivity()}
        />
    </form>
  )
}
