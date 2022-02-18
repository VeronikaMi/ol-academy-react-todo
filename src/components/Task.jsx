import React from "react";
import "./Task.scss";

function Task(props) {
  return (
    <div className={props.task.isDone ? "task done" : "task"}>
      <div className="left-text">
        <input
          type="checkbox"
          onChange={() => {
            props.onCheck(props.task.id);
          }}
        />
        <p className="text">{props.task.name}</p>
      </div>

      <div className="btn-container">
        <p
          className="button"
          onClick={() => {
            props.onDone(props.task.id);
          }}
        >
          Done
        </p>
        <p
          className="button"
          onClick={() => {
            props.onEdit(props.task.id);
          }}
        >
          Edit
        </p>
        <p
          className="button delete"
          onClick={() => {
            props.onDeleteTask(props.task.id);
          }}
        >
          Delete
        </p>
        <p
          className="button arrow"
          onClick={() => {
            props.moveUp(props.task.id);
          }}
        >
          ↑
        </p>
        <p
          className="button arrow"
          onClick={() => {
            props.moveDown(props.task.id);
          }}
        >
          ↓
        </p>
      </div>
    </div>
  );
}

export default Task;
