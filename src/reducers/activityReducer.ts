import { Activity } from "../types"

// Aqui se agrega los actions
// El payload son los datos que toma el action
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } } | 
    { type: 'save-activeId', payload: { id : Activity['id'] } } | 
    { type: 'delete-activity', payload: { id : Activity['id'] } }

// Este es el state del reducer
export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}


const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// El state inicial es este, se le asocia ActivityState
export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}


// Este reducer conecta a ambos states para poder hacer la lógica
// En el if se evalua cual de las lógicas se va a ejecutar
export const activityReducer = (
    state : ActivityState = initialState,
    action : ActivityActions
) => {
    if (action.type === 'save-activity') {
        // Este código maneja la lógica para actualizar el state
        let updatedActivities: Activity[] = []
        if (state.activeId){
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if (action.type === 'save-activeId'){
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if (action.type === 'delete-activity'){ 
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id )
        }
    }

    return state
}