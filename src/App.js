import React, {useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import './app.css';
import { v4 as uuidv4 } from 'uuid';
//import uuid from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

useEffect(() => {
const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) 
if (storedTodos) setTodos(storedTodos)
},[])



  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

function toggleTodo(id){
  const newTodos =[...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete =!todo.complete
  setTodos(newTodos)
}

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null

  }
function handleClearTodos() {
  const newTodos= todos.filter(todo => !todo.complete)
  setTodos(newTodos)

}




  return (
    <>
    <h1> My Todo List</h1>
    
    <TodoList todos={todos} toggleTodo={toggleTodo} />
     <input placeholder="Enter todo" ref={todoNameRef} type="text" className= "input"/>
     <button type="button" className="btn btn-success" onClick={handleAddTodo}>Add Todo</button>
     <button type="button" className="btn btn-success" onClick ={handleClearTodos}>Clear Completed Todos</button>
     <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
    </>

  )
    
}

export default App;
