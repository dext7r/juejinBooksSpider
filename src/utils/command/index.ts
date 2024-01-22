import { ChildProcess, spawn } from 'node:child_process'
import { logger } from '@/utils'

export type QueueTask = () => Promise<void>
export let runningProcesses = 0
export const processQueue: QueueTask[] = []
export const maxConcurrentProcesses = 4

export async function runDevCommand1(
  juejinBookSectionUrl: string,
  bookletId: string | number,
  title: string,
): Promise<void> {
  const command = `npm run dev:all ${juejinBookSectionUrl + bookletId}`
  logger.info(`开始爬取小册：${title}`)

  // 包装 spawn 调用为一个 promise
  function spawnProcess(): Promise<void> {
    runningProcesses++
    const childProcess: ChildProcess = spawn(command, [], { shell: true, stdio: 'inherit' })

    return new Promise((resolve, reject) => {
      // 监听进程退出事件
      childProcess.on('exit', (code) => {
        runningProcesses--
        if (code === 0) {
          logger.info(`小册：${title}，爬取成功`)
        } else {
          logger.error(`小册：${title}，爬取失败，退出码：${code}`)
          reject(new Error(`进程退出码为 ${code}`))
        }
        checkQueue() // 检查队列以启动下一个进程
        resolve()
      })

      // 监听进程启动失败事件
      childProcess.on('error', (err) => {
        runningProcesses--
        logger.error(`小册：${title}，启动失败：${err.message}`)
        checkQueue() // 检查队列以启动下一个进程
        reject(err)
      })
    })
  }

  // 检查队列并启动新的进程（如果有空间）
  function checkQueue(): void {
    if (processQueue.length > 0 && runningProcesses < maxConcurrentProcesses) {
      const nextTask = processQueue.shift()
      if (nextTask) {
        nextTask()
      }
    }
  }

  // 将任务加入队列或立即执行
  if (runningProcesses < maxConcurrentProcesses) {
    await spawnProcess()
  } else {
    processQueue.push(spawnProcess)
  }
}
export async function runDevCommand(
  juejinBookSectionUrl: string,
  bookletId: string | number,
  title: string,
) {
  const command = `npm run dev:all ${juejinBookSectionUrl + bookletId}`
  logger.info(`开始爬取小册：${title}`)

  // 包装 spawn 调用为一个 promise
  function spawnProcess() {
    runningProcesses++
    const childProcess = spawn(command, [], { shell: true, stdio: 'inherit' })

    return new Promise<void>((resolve) => {
      childProcess.on('exit', () => {
        runningProcesses--
        checkQueue() // 检查队列，看是否可以启动新的进程
        resolve()
      })
    })
  }

  // 检查队列并启动新的进程（如果有空间）
  function checkQueue() {
    if (processQueue.length > 0 && runningProcesses < 3) {
      const nextTask = processQueue.shift()
      if (nextTask) nextTask()
    }
  }

  // 将任务加入队列或立即执行
  if (runningProcesses < 3) {
    await spawnProcess()
  } else {
    processQueue.push(spawnProcess)
  }
}
