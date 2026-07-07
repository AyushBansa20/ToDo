import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import Footer from './components/Footer';


function App() {
  const [todo, setToDo] = useState("")

  const [TODOS, setToDos] = useState(() => {
    try {
      const rawTodos = localStorage.getItem("List");

      if (!rawTodos) return [];

      return JSON.parse(rawTodos);
    } catch (error) {
      console.error("Invalid localStorage data:", error);
      localStorage.removeItem("List");
      return [];
    }
  });

  const [isDark, setisDark] = useState(false)
  const [finished, setfinished] = useState("All")

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(TODOS));
  }, [TODOS]);

  useEffect(() => {
    let darkMode = localStorage.getItem("isDark")
    if (darkMode) {
      setisDark(darkMode === "true")
    }
  }, [])



  const handleChange = (e) => {
    setToDo(e.target.value)

  }
  const handleDelete = (e) => {
    let id = e.target.name
    let newTODOS = TODOS.filter(item => {
      return item.id !== id
    });

    setToDos(newTODOS)

  }
  const handleUpdate = (e) => {
    let id = e.target.name
    let t = TODOS.filter(item => {
      return item.id === id
    })

    setToDo(t[0].todo)


    let newTODOS = TODOS.filter(item => {
      return item.id !== id
    });

    setToDos(newTODOS)

  }
  const handleAdd = () => {
    setToDos([...TODOS, { id: uuidv4(), todo, isCompleted: false }])
    setToDo("")
    console.log(TODOS)



  }
  const mode = () => {
    setisDark(!isDark)
    localStorage.setItem("isDark", !isDark)

  }
  const handleCheck = (e) => {
    let id = e.target.name
    let index = TODOS.findIndex(item => {
      return item.id === id;


    })
    let newTODOS = [...TODOS];
    newTODOS[index].isCompleted = !newTODOS[index].isCompleted;
    setToDos(newTODOS)

  }

  const toggleFinished = (e) => {
    setfinished(e.target.value)

  }

  let filteredTODOS = TODOS
  if (finished === "finished") {
    filteredTODOS = TODOS.filter(item => item.isCompleted)
  }
  else if (finished === "unfinished") {
    filteredTODOS = TODOS.filter(item => !item.isCompleted)
  } else {
  }
  return (
    <>

      <div className={` min-h-screen pb-8 ${isDark ? 'bg-black ' : ''}`}>
        <Navbar isDark={isDark} />
        <div className={`flex justify-center font-medium mt-7 lg:text-3xl sm:text-2xl text-2xl  ${isDark ? 'text-white' : ''}`}> TODO LIST </div>
        <div className={`flex justify-center mt-10 w-full gap-1 sm:gap-2 ${isDark ? 'text-white' : ''}`}>
          <input onChange={handleChange} value={todo} className={`border-2 border-black w-[80%] rounded-3xl ${isDark ? 'border-white' : ''}`} type="text" />
          <button onClick={handleAdd} disabled={todo.length < 1} className={`bg-blue-200 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 rounded-2xl hover:bg-blue-100 cursor-pointer ${isDark ? 'bg-gray-500 hover:text-black' : ''}`}>Add</button>
          <button onClick={mode} className={`bg-blue-200 text-xs sm:text-sm lg:text-base px-2 sm:px-3 lg:px-4 rounded-2xl hover:bg-blue-100 cursor-pointer ${isDark ? 'bg-gray-500' : ''}`}>{isDark ? '☀️' : '🌙'}</button>
        </div>
        <div className={`flex justify-between w-[80%] sm:w-[60%] lg:w-[50%] m-auto mt-6 text-xs sm:text-sm lg:text-base ${isDark ? 'text-white' : ''}`}>
          <label> <input type="radio" name='choice' onChange={toggleFinished} value="All" checked={finished === "All"} /> All </label>
          <label> <input type="radio" name='choice' onChange={toggleFinished} value="finished" checked={finished === "finished"} /> Finished </label>
          <label> <input type="radio" name='choice' onChange={toggleFinished} value="unfinished" checked={finished === "unfinished"} /> Unfinished </label>
        </div>

        <div className={`w-[95%] sm:w-[88%] lg:w-[80%] m-auto mt-5 bg-blue-200 gap-6 min-h-[60vh] pt-2 rounded-2xl py-2 ${isDark ? 'bg-gray-500' : ''}`}>
          {TODOS.length === 0 && <div className={`flex justify-between w-[95%] my-4 m-auto ${isDark ? '' : ''}`}>No To-Do to display</div>}


          {filteredTODOS.map(item => {
            return (
              <div key={item.id} className={`flex justify-between w-[95%] my-4 m-auto ${isDark ? '' : ''}`}>
                <input type="checkbox" onChange={handleCheck} name={item.id} checked={item.isCompleted} id="" />
                <div className={`text-xs sm:text-sm lg:text-base ${item.isCompleted ? 'line-through w-[50%] sm:w-[60%] lg:w-[70%] text-justify' : 'w-[50%] sm:w-[60%] lg:w-[70%] text-justify'}`}> {item.todo} </div>
                <div>
                  <button onClick={handleUpdate} name={item.id} className={`mx-1 sm:mx-3 lg:mx-5 bg-purple-300 text-xs sm:text-sm lg:text-base px-1 sm:px-2 lg:px-4 rounded-lg hover:bg-blue-400 cursor-pointer ${isDark ? '' : ''}`}>Update</button>
                  <button onClick={handleDelete} name={item.id} className={`mx-1 sm:mx-3 lg:mx-5 bg-purple-300 text-xs sm:text-sm lg:text-base px-1 sm:px-2 lg:px-4 rounded-lg hover:bg-blue-400 cursor-pointer ${isDark ? '' : ''}`}>Delete</button>
                </div>
              </div>)
          })}

        </div>
        <hr className={`mt-20 ${isDark ? 'border-white' : ''} `} />

      </div>


      <Footer isDark={isDark} />

    </>
  )
}

export default App
