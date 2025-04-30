import React, { useEffect, useState } from "react";



//create your first component
const Home = () => {
	const[todos, setTodos] = useState([])
	//fetching todos from API
	useEffect(() => {
		fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/AlexisRosePolowsky")
		.then((response) => response.json())
		.then((data) => setTodos([...data]))
	},[])
	const createTodo=(e)=>{
		e.preventDefault()
		let newTodo={
			"label":e.target.todoInput.value,
			"done":false
		}
		let currentTodos= todos
		let isNew= true
		todos.forEach((todo)=>{
			if(todo.label.toLowerCase()===newTodo.label.toLowerCase()){
				isNew=false
			}
		})
		//isNew ? setTodos([...todos,newTodo]) : alert("todo already exists")
		if(isNew===false){
			alert("todo already exisits") 
		} else{
			currentTodos.push(newTodo)
			fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/AlexisRosePolowsky",{
				method: "PUT",
				body: JSON.stringify(currentTodos),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				setTodos([...currentTodos])
			})
		}
		e.target.todoInput.value=""
	}
	const removeTodo = (e,index)=>{
		e.preventDefault()
		let filteredTodos= todos.filter((todo,i)=>{
			return i !== index
		})
		fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/AlexisRosePolowsky",{
			method: "PUT",
      		body: JSON.stringify(filteredTodos),
      		headers: {
          		"Content-Type": "application/json"
      		}
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data)
			setTodos(filteredTodos)
		})
		
	}

	return (
		<div className="text-center">
			<form onSubmit={createTodo}> 
				<input name="todoInput" type="text" placeholder="enter a todo"/>
			</form>
			<ul>
				{todos.map((todo,index)=>{
					return(
						<li key={index}>
							<span>{todo.label}</span>
							<button onClick={(e)=>removeTodo(e,index)}>del</button>
						</li>

					)
				})}
			</ul>
		</div>
	);
};

export default Home;
