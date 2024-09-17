/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-17 13:21:51
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-17 23:14:25
 */
import * as maa from '@nekosu/maa-node'
import Goal from './2048/goal'
import Grid from './2048/grid'
import GameController from './2048/gameController'
import { log } from '../utils/logger'

const tileList = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
const grid = new Grid(tileList)
const game = new GameController(grid)
const goal = new Goal(game)
// let direction: number
// for (let i = 0; i < 10; i++) {
//   direction = goal.nextMove()
//   console.log(goal.game.getDirection(direction))
//   goal.game.moveTiles(direction)
//   grid.show()
// }

/**
 * 获取棋子在棋盘上的坐标
 * @param box 棋子box
 * @returns
 */
function getChessboardPos(box: number[]): {
  x: number
  y: number
} {
  const centerX = box[0] + box[2] / 2
  const centerY = box[1] + box[3] / 2
  let x = 0,
    y = 0
  if (centerX <= 502) {
    x = 0
  } else if (centerX <= 640) {
    x = 1
  } else if (centerX <= 779) {
    x = 2
  } else {
    x = 3
  }
  if (centerY <= 246) {
    y = 0
  } else if (centerY <= 385) {
    y = 1
  } else if (centerY <= 525) {
    y = 2
  } else {
    y = 3
  }
  return { x, y }
}

async function getChessboard(context: maa.Context, image: ArrayBuffer) {
  const result: {
    [key: number]: {
      name: string
      algorithm: string
      hit: boolean
      box: maa.api.Rect
      detail: string
      raw: ArrayBuffer
      draws: ArrayBuffer[]
    } | null
  } = {}
  const chessboard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  result[2] = await context.run_recognition('2048_1_2', image)
  result[4] = await context.run_recognition('2048_1_4', image)
  result[8] = await context.run_recognition('2048_1_8', image)
  result[16] = await context.run_recognition('2048_1_16', image)
  result[32] = await context.run_recognition('2048_1_32', image)
  result[64] = await context.run_recognition('2048_1_64', image)
  result[128] = await context.run_recognition('2048_1_128', image)
  result[256] = await context.run_recognition('2048_1_256', image)
  result[512] = await context.run_recognition('2048_1_512', image)
  result[1024] = await context.run_recognition('2048_1_1024', image)
  result[2048] = await context.run_recognition('2048_1_2048', image)
  for (const key in result) {
    const data = result[key]
    if (!data || data.detail == 'null') continue
    const detail = JSON.parse(data.detail)
    const filtered: { box: number[]; score: number }[] = detail.filtered
    filtered.forEach((item) => {
      const pos = getChessboardPos(item.box)
      chessboard[pos.y][pos.x] = Number(key)
    })
  }
  return chessboard
}

async function swipe(controller: maa.ControllerBase, type: number) {
  switch (type) {
    case 0:
      // 向上
      return controller.post_swipe(632, 665, 630, 110, 200).wait()
    case 1:
      // 向右
      return controller.post_swipe(359, 387, 911, 388, 200).wait()
    case 2:
      // 向下
      return controller.post_swipe(630, 110, 632, 665, 200).wait()
    case 3:
      // 向左
      return controller.post_swipe(911, 388, 359, 387, 200).wait()
    default:
      // 向右
      return controller.post_swipe(200, 400, 845, 425, 200).wait()
  }
}

const challenge2048: maa.CustomRecognizerCallback = async (self) => {
  const controller = self.context.tasker.controller
  if (!controller) return null
  const result = await getChessboard(self.context, self.image)
  goal.grid.setTiles(result)
  log(goal.grid.show() + '-----------------')
  const nextMove = goal.nextMove()
  await swipe(controller, nextMove)
  return [{ x: 0, y: 0, width: 0, height: 0 }, '2048']
}

export default (res: maa.Resource): Record<string, unknown> => {
  res.register_custom_recognizer('challenge2048', challenge2048)
  return {
    'combine-swiping-one': {
      next: ['challenge2048']
    },
    challenge2048: {
      recognition: 'Custom',
      custom_recognition: 'challenge2048',
      post_wait_freezes: 10,
      next: ['challenge2048']
    }
  }
}
