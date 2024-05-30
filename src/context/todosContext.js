import { createContext , useReducer, useContext} from "react";
import todosReducer from "../reducers/todosReducer";

export const TodosContext = createContext([])

const TodosProvider = ({childern}) => {
    const [todos, todosDispatch] = useReducer(todosReducer, [])
    return (
        <TodosContext.Provider value={{todos: todos, dispatch: todosDispatch}}>
            {childern}
        </TodosContext.Provider>
    )
}

export const useTodos = () =>{
    return useContext(TodosContext)
}
export default TodosProvider;
// export const TodosContext = createContext([]);
