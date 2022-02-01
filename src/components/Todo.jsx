import React, { useState } from "react";
import "./Todo.scss";
import { Error } from "./Error";
import Task from "./Task";

export function Todo() {
  const [id, setId] = useState(0);

  const [tasks, setTasks] = useState([]);

  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");

  const [currValue, setCurrValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [currIndex, setCurrIndex] = useState(null);

  function isValueValid(value) {
    if (value === "") {
      editMode
        ? setEditError("Please enter in a task")
        : setError("Please enter in a task");

      return false;
    } else if (
      !editMode &&
      tasks.length !== 0 &&
      tasks.some((el) => el.name === value)
    ) {
      setError("The task already exists");

      return false;
    }

    return true;
  }

  const onClickHandle = () => {
    if (isValueValid(currValue)) {
      setTasks([...tasks, { id: id, name: currValue, isDone: false }]);
      setCurrValue("");
      setError("");
      setId(id + 1);
    }
  };

  const onCheck = (id) => {
    let newTasks = [...tasks]; //shallow copy vs deep copy?!

    let index = newTasks.findIndex((el) => el.id === id);
    newTasks[index].isDone = !tasks[index].isDone;

    setTasks(newTasks);
  };

  const moveDown = (id) => {
    let index = tasks.findIndex((el) => el.id === id);

    let swapIndex = index + 1;
    if (swapIndex === tasks.length) {
      swapIndex = 0;
    }
    move(index, swapIndex);
  };

  const moveUp = (id) => {
    let index = tasks.findIndex((el) => el.id === id);
    let swapIndex = index - 1;
    if (index === 0) {
      swapIndex = tasks.length - 1;
    }
    move(index, swapIndex);
  };

  const move = (index, swapIndex) => {
    console.log("move");
    let temp = tasks[index];
    let tempTasks = [...tasks];
    tempTasks[index] = tempTasks[swapIndex];
    tempTasks[swapIndex] = temp;

    console.log(tempTasks);
    setTasks(tempTasks);

    console.log(tasks);
  };

  const onEdit = (id) => {
    setEditMode(true);
    let index = tasks.findIndex((el) => el.id === id);
    setCurrIndex(index);
    setEditValue(tasks[index].name);
  };

  const onEditHandle = (e) => {
    setEditValue(e.target.value);
  };

  const onEditClick = () => {
    if (isValueValid(editValue)) {
      let newTasks = tasks;
      newTasks[currIndex].name = editValue;

      setEditMode(false);
      setCurrIndex(null);
      setEditValue("");
      setTasks(newTasks);
      setEditError("");
    }
  };

  return (
    <div className="container">
      <div className="input">
        <input
          type="text"
          placeholder="Enter your task here..."
          value={currValue}
          onChange={(e) => {
            setCurrValue(e.target.value);
          }}
        />
        <button onClick={onClickHandle}>Add</button>
      </div>
      <Error error={error} />
      <div className="additianal-btns">
        <button className="btn-2" onClick={() => setTasks([])}>
          Delete All
        </button>
        <button
          className="btn-2"
          onClick={() => setTasks(tasks.filter((el) => el.isDone === false))}
        >
          Delete Done
        </button>
        <button
          className="btn-2"
          onClick={() => setTasks(tasks.filter((el) => el.isDone === true))}
        >
          Delete Not Done
        </button>
      </div>
      <p className="counter">
        Completed tasks : {tasks.filter((el) => el.isDone === true).length} /{" "}
        {tasks.length}
      </p>
      <div className="tasks-container">
        {editMode === true && (
          <div className="black">
            <div className="overlay">
              <input type="text" value={editValue} onChange={onEditHandle} />
              <Error error={editError} />
              <button onClick={onEditClick}>Edit</button>
              <button
                className="btn-2"
                onClick={() => {
                  setEditMode(false);
                  setEditError("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <ul>
          {tasks.map((task, index) => (
            <li key={"task" + index}>
              <Task
                task={task}
                onCheck={(id) => onCheck(id)}
                onEdit={(id) => onEdit(id)}
                onDeleteTask={(id) =>
                  setTasks(tasks.filter((el) => el.id !== id))
                }
                moveUp={(id) => {
                  moveUp(id);
                }}
                moveDown={(id) => {
                  moveDown(id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
