/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-09 20:10:04
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-09 22:36:59
 */
import localforage from 'localforage'

async function addTask(name: string, taskData: Task[]) {
  if (!name || taskData.length === 0) return
  const tasksStr = await localforage.getItem<string>('tasks')
  const tasks = tasksStr ? JSON.parse(tasksStr) : {}

  tasks[name] = taskData
  await localforage.setItem('tasks', JSON.stringify(tasks))
}

async function setTask(name: string, taskData: Task[]) {
  if (!name) return {}
  const tasksStr = await localforage.getItem<string>('tasks')
  const tasks: { [key: string]: Task[] } = tasksStr ? JSON.parse(tasksStr) : {}

  if (taskData.length === 0) {
    delete tasks[name.toString()]
    await localforage.setItem('tasks', JSON.stringify(tasks))
  } else if (Object.hasOwn(tasks, name)) {
    tasks[name] = taskData
    await localforage.setItem('tasks', JSON.stringify(tasks))
  }
  return tasks
}

async function getTasks(): Promise<{ [key: string]: Task[] }> {
  // 获取所有的任务，如果没有任务，则返回一个空数组
  const tasks = await localforage.getItem<string>('tasks')
  return tasks ? JSON.parse(tasks) : {}
}

export { addTask, getTasks, setTask }
