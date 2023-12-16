import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) {
  return (
      // everytime our todo changes, it will re-render every single todo
      // only re-render the ones that change, set key of ones to change
   todos.map(todo => { 
    return <Todo key = {todo.id} toggleTodo = {toggleTodo} todo={todo} />
    })
  )
}