// src/components/todo.tsx

'use client'
import { useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from '../shared/Task'

const taskRepo = remult.repo(Task)

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    taskRepo.find({
        limit:20,
        orderBy:{createdAt:"desc"},
        //where:{completed:true}
    }).then(setTasks)
  }, [])
  return (
    <div>
      <h1>Todos</h1>
      <main>
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <input type="checkbox" checked={task.completed} />
              {task.title}
            </div>
          )
        })}
      </main>
    </div>
  )
}