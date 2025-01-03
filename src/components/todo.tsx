// src/components/todo.tsx

'use client'
import { FormEvent, useEffect, useState } from 'react'
import { remult } from 'remult'
import { Task } from '../shared/Task'
import { TasksController } from '@/shared/TasksController'

const taskRepo = remult.repo(Task)

export default function Todo() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState("")
  

const setAllCompleted = async (completed: boolean) => {
    await TasksController.setAllCompleted(completed)
  }

    const addTask = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const newTask = await taskRepo.insert({ title: newTaskTitle })
            setTasks([...tasks, newTask])
            setNewTaskTitle("")
        } catch (error: unknown) {
            alert((error as { message: string }).message)
        }
    }


    useEffect(() => {
        taskRepo.find({
            limit: 20,
            orderBy: { createdAt: "desc" },
            //where:{completed:true}
        }).then(setTasks)
    }, [])
    return (
        <div>
            <h1>Todos</h1>
            <main>
            {taskRepo.metadata.apiInsertAllowed() && (
                <form onSubmit={addTask}>
                    <input
                        value={newTaskTitle}
                        placeholder='What needs to be done?'
                        onChange={e => setNewTaskTitle(e.target.value)} />
                    <button>ADD</button>
                </form>
            )}
                {tasks.map((task) => {
                    const setTask = (value: Task) =>
                        setTasks(tasks => tasks.map(t => (t === task ? value : t)))
                    const setCompleted = async (completed: boolean) =>
                        setTask(await taskRepo.save({ ...task, completed }))
                    const setTitle = (title: string) => setTask({ ...task, title })
                    const saveTask = async () => {
                        try {
                            setTask(await taskRepo.save(task))
                        } catch (error: unknown) {
                            alert((error as { message: string }).message)
                        }
                    }
                    const deleteTask = async () => {
                        try {
                            await taskRepo.delete(task)
                            setTasks(tasks.filter(t => t !== task))
                        } catch (error: unknown) {
                            alert((error as { message: string }).message)
                        }
                    }
                   
                    return (
                        <div key={task.id}>
                            <input type="checkbox" checked={task.completed} onChange={e => setCompleted(e.target.checked)} />
                            <input value={task.title} onChange={e => setTitle(e.target.value)} />
                            <button onClick={saveTask}>Save</button>
                            {taskRepo.metadata.apiDeleteAllowed(task) && (
                            <button onClick={deleteTask}>Delete</button>
                            )}
                        </div>
                        
                    )
                })}
                
                <div>
                <button onClick={() => setAllCompleted(true)}>Set All Completed</button>
                <button onClick={() => setAllCompleted(false)}>Set All Uncompleted</button>
                </div>
            </main>
        </div>
    )
}