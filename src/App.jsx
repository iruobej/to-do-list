import { useState, useEffect } from 'react'
import './App.css'
import Card from './Components/Card.jsx'
 //Flow: App -> Card -> App, reflecting new change
function App() {
  const[tasks, setTasks] = useState([]); //starting with an empty array of tasks

  //For changing (ANY) existing task, using the index to identify which one is being changed
  const handleChange = (index, newValue) => {
    const updated = [...tasks];
    updated[index].text = newValue;
    setTasks(updated);
  }
  //For adding a new task
  const handleAdd = () => {
    setTasks([...tasks, 
      {text: "", completed: false}
    ]); //adding a new taskbox with an empty value (at the end of the array of tasks)
  }

  const handleToggle = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed; //Changing boolean value
    setTasks(updated);
  } 

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);//_, i means skipping the element parameter and focusing on the index
    setTasks(updated);
  }
  //x.filter takes the first argument (task) as the iterable of x
  const completedCount = tasks.filter(task => task.completed).length;

  const ratio = completedCount/tasks.length;
  const stage = 
    ratio === 1 ? "all" :
    ratio > 0.5 ? "some" : "none";

  //Putting class on body so it can CSS everything
  useEffect(() => {
    document.body.classList.remove("stage-none", "stage-some", "stage-all");
    document.body.classList.add(`stage-${stage}`); //${} + backticks are used to insert variables into text
  }, [stage]);

  return (
    <div className="container">
      <h1>To-do list</h1>
      <p>An interactive to-do list to help you keep on top of your day!</p>
      <h2>{tasks.length === 0 ? 
        "No tasks":
        `${completedCount}/${tasks.length} completed`}</h2>
      <p>
        {tasks.length === 0 ? "Add a task!" : 
          stage === "all" ? "Congratulations!" : 
          stage === "some" ? "Almost there!" : "Push through!"} 
      </p>
      <div className="taskList">
        {tasks.map((task, index) => (
        <Card 
          key={index} 
          value={task.text}
          //the newValue argument makes sure the state only rerenders when a new value has been added by the user, not immediately
          //when the page opens.
          onTaskUpdate={(newValue) => handleChange(index, newValue)} 
          completed={task.completed}
          onToggle = {() => handleToggle(index)} //tick toggle
          onDelete = {() => handleDelete(index)}
        />
      ))}
      </div>
      <button onClick={handleAdd} className="addButton">+ Task</button>
    </div>
  )
}

export default App
