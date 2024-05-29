import Form from "./components/Form"
import { useEffect, useReducer } from "react"
import { activityReducer, initialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList"


function App() {

  // const [state, dispatch] = useReducer(reducer, initialState)
  // reducer: cual es el reducer a utilizar 
  // state: el estado del reducer a utilizar 
  // dispatch: funciones de ese reducer a utilizar
  // initialState: estado inicial del reducer a utilizar 
  // dispatch es una fución especial que nos va a permitir ejecutar las ActivitiActions(en este proyecto se llaman asi), esta función es para que react sepa cuando va a llamar a disparar la acción
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white  uppercase">
            Contador de calorías
          </h1>
          <button className=" bg-slate-500 p-2 rounded-lg hover:bg-slate-600 text-white">Reiniciar contador</button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

    </>
    
  )
}

export default App
