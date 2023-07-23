// App.js
import React, {useState} from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import './App.css'
import NavBar from './Components/NavBar/NavBar';


const App = () => {

  const Tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      deadline: '2023-07-31',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      deadline: '2023-08-15',
    },
  ];


  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div className='App'>
      {/* <h1 className='headermain'>TRACKER-JET</h1> */}
      <NavBar></NavBar>
      <br></br>
      <br></br>
      <br></br>

      <div>
      <button style={{color:"goldenrod"}} onClick={handleButtonClick}>
        {isButtonClicked ? 'CANCEL' : 'Add a new task'}
      </button>

      {isButtonClicked && <TaskForm onTaskAdded={() => window.location.reload()}  />}
    </div>
    <hr style={{color:"goldenrod"}}></hr>
    <br></br>
      <br></br>
      <br></br>
      <TaskList Tasks={Tasks}></TaskList>
    <h2 style={{color:"goldenrod", textDecoration:"underline"}}>LIST OF TASKS</h2>
      
    </div>
  );
};

export default App;
