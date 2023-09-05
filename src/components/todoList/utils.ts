import { ITodo } from "../../interfaces/ITodo";
import { IPureTodo } from "./TodoList";
import { faker } from '@faker-js/faker';

export function enrichTodos(todos: IPureTodo[]): Array<ITodo> {
  const startDate = faker.date.past();
  const endDate = faker.date.future();
  return todos.map((todo) => ({
    ...todo,
    description: faker.lorem.lines(),
    startDate: startDate.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) + ' ' + startDate.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" }),
    endDate: endDate.toLocaleDateString(undefined, {month: 'short', day: 'numeric'}) + ' ' + endDate.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" }),
    tagOne: faker.word.noun(),
    tagTwo: faker.person.jobType()
  }))
}