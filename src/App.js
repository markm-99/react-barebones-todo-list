import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const LOCAL_STORAGE_KEY = 'todoApp.todos'
// useRef (hook) allows us to reference elements in our html
// useState (hooks) allows us to use state in our functional components
// useEffect (hook) allows us to run code when the app first renders (takes one function as param as another function)
// React is a library that allows us to create components
// components are like functions that return html
  // set state to variable
  // todos: all todo items
  // setTodos: function to update todos
  // complete: will make checkbox unchecked or checked
function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  // load our todos from local storage so even with browser refresh, will hold state
  // set todo state to value retrieved in local storage

  // storing todos
  useEffect(() => {
    // load storedTodos from string to array of stored
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  // grabbing todos
  // PASS ARRAY of properties
  // when anything changes, run useEffect function to save todos when changes occur
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

function toggleTodo(id) {
  const newTodos = [...todos]
  // neverm odify state variable directly, make a copy instead
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}
// access input variable
function handleAddTodo(e) {
  const name = todoNameRef.current.value
  if (name === '') return
  setTodos(prevTodos => {
    return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
  // todo will be added to console
  // clear the input after adding todo
  })
  todoNameRef.current.value = null
// set todos to be an array of objects
}

function handleClearTodos() {
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}
  // leave todos empty by default, only add when onclick AddToDo
  return (
    // return elements in a fragment to return 2 things at once
    <>
    {/* jsx below --> embed components one at a time, can't have 2 components returned at same time */}
    {/* todos: props that allows us to pass todos */}
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    {/* now write the 'html' or jsx syntax for our todo app */}
    {/* create input for each todo */}
    <input ref = {todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo=> !todo.complete).length} items total</div>
    </>
    )
}

export default App;