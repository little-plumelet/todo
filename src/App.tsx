import './App.css'
import { ITodo, Todo } from './components/todo/Todo'
import { TodoList } from './components/todoList/TodoList'

const mockData: ITodo = { 
  "userId": 1,
  "title": "delectus aut autem delectus aut autem delectus aut autem delectus aut autem delectus aut autem delectus aut autem delectus aut autem delectus aut autem delectus aut autem delectus aut autem delectus aut autem ",
  "completed": true,
  description: 'description descriptiondescription descriptiondescriptiondescription ghjklkjhgf',
  startDate: '11 02 2020',
  endDate: '31 12 2024',
  tagOne: 'frontend',
  tagTwo: 'entity title',
}

function App() {
  return (
    <div style={{width: '400px'}}>
      <TodoList />
    </div>
  )
}

export default App
