import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle, Circle, Clock, Layout, ListTodo } from 'lucide-react'
import './App.css'

function App() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'Medium' })
    const [loading, setLoading] = useState(true)

    // Mock API - Simulate fetching from Day 4 API
    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true)
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800))

            const initialTasks = [
                { id: 1, title: 'Complete Day 12 Challenge', description: 'Build a React Task Manager UI', priority: 'High', status: 'Completed' },
                { id: 2, title: 'Review Database Schema', description: 'Check normalization for Day 10 project', priority: 'Medium', status: 'In Progress' },
                { id: 3, title: 'Post on LinkedIn', description: 'Share Day 12 progress with the network', priority: 'High', status: 'In Progress' },
            ]
            setTasks(initialTasks)
            setLoading(false)
        }
        fetchTasks()
    }, [])

    const handleAddTask = (e) => {
        e.preventDefault()
        if (!newTask.title.trim()) return
        const task = {
            ...newTask,
            id: Date.now(),
            status: 'In Progress'
        }
        setTasks([task, ...tasks])
        setNewTask({ title: '', description: '', priority: 'Medium' })
    }

    const toggleTask = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, status: t.status === 'Completed' ? 'In Progress' : 'Completed' } : t
        ))
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo">
                    <ListTodo size={32} color="#6366f1" />
                    <h1>TaskFlow <span className="badge">v2.0</span></h1>
                </div>
                <p className="subtitle">Enterprise Task Management Interface</p>
            </header>

            <main className="dashboard">
                {/* Task Form */}
                <section className="form-card">
                    <h3><Plus size={18} /> Create New Task</h3>
                    <form onSubmit={handleAddTask}>
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <div className="form-footer">
                            <select
                                value={newTask.priority}
                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                            <button type="submit" className="btn-primary">Add Task</button>
                        </div>
                    </form>
                </section>

                {/* Task List */}
                <section className="list-container">
                    <div className="list-header">
                        <h3><Layout size={18} /> Active Tasks</h3>
                        <span className="count-pill">{tasks.length} Total</span>
                    </div>

                    {loading ? (
                        <div className="loader">Optimizing workspace...</div>
                    ) : (
                        <div className="task-grid">
                            {tasks.length === 0 ? (
                                <div className="empty-state">No tasks found. Your plate is clean!</div>
                            ) : (
                                tasks.map(task => (
                                    <div key={task.id} className={`task-card ${task.status === 'Completed' ? 'done' : ''}`}>
                                        <div className="task-main">
                                            <div className="status-icon" onClick={() => toggleTask(task.id)}>
                                                {task.status === 'Completed' ? <CheckCircle className="icon-success" /> : <Circle />}
                                            </div>
                                            <div className="task-info">
                                                <h4>{task.title}</h4>
                                                <p>{task.description}</p>
                                                <div className="task-meta">
                                                    <span className={`priority-tag ${task.priority.toLowerCase()}`}>
                                                        {task.priority}
                                                    </span>
                                                    <span className="status-text">
                                                        <Clock size={12} /> {task.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-icon delete" onClick={() => deleteTask(task.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </section>
            </main>

            <footer className="app-footer">
                <p>Day 12 of 30-Day Challenge | Developed by Meghana Mareedu</p>
            </footer>
        </div>
    )
}

export default App
