export default function Card({ value, onTaskUpdate, completed, onToggle, onDelete }) {
    //EVERY INSTANCE OF CARD WILL HAVE ITS OWN 'COMPLETED' STATE- THATS HOW REACT COMPONENTS WORK!
    return (
        <div className="card">
            {/*value={task} means the input box will always show what the user entered (task variable)*/}
            {/*The second onChange is the parent's/App.jsx's onChange*/}
            <input 
                type="text"
                className={completed ? 'done' :  ""}
                value={value}
                //Calling the event handler of the parent(App.jsx) to handle the change
                //We pass the new value back to App becuase it is the one that owns the state! Therefore App needs it to 
                //rerender the website with the new value!
                onChange={({target}) => onTaskUpdate(target.value)} 
                placeholder='Enter a task' 
            />
            <button className="tickButton" onClick={onToggle}>
                <i className={completed ? 
                 "fa-solid fa-square-check fa-2x" : "fa-regular fa-square fa-2x"}>
                </i>
            </button>
            <button className="deleteBtn" onClick={onDelete}><i class="fa-solid fa-trash"></i></button>
        </div> 
    );
}