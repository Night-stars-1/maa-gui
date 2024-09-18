/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-17 13:21:51
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-18 22:50:34
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

async function getChessboard(context: maa.Context, image: ArrayBuffer, checkList: string[]) {
  const chessboard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  const recognitionPromises = checkList.map((item) => context.run_recognition(item, image))

  const results = await Promise.all(recognitionPromises)
  for (let i = 0; i < results.length; i++) {
    const data = results[i]
    if (!data || data.detail == 'null') continue
    const detail = JSON.parse(data.detail)
    const filtered: { box: number[]; score: number }[] = detail.filtered
    filtered.forEach((item) => {
      const pos = getChessboardPos(item.box)
      chessboard[pos.y][pos.x] = 2 * Math.pow(2, i)
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
  const checkList = self.param?.['checkList']
  if (!controller) return null
  const result = await getChessboard(self.context, self.image, checkList)
  goal.grid.setTiles(result)
  log(goal.grid.show())
  const nextMove = goal.nextMove()
  await swipe(controller, nextMove)
  return [{ x: 0, y: 0, width: 0, height: 0 }, '2048']
}

export default (res: maa.Resource): Record<string, unknown> => {
  res.register_custom_recognizer('challenge2048', challenge2048)
  return {
    'combine-swiping-one': {
      next: ['challenge2048_1']
    },
    'combine-swiping-two': {
      next: ['challenge2048_hh']
    },
    'combine-swiping-three': {
      next: ['challenge2048_cd']
    },
    challenge2048_1: {
      recognition: 'Custom',
      custom_recognition: 'challenge2048',
      custom_recognition_param: {
        checkList: [
          '2048_1_2',
          '2048_1_4',
          '2048_1_8',
          '2048_1_16',
          '2048_1_32',
          '2048_1_64',
          '2048_1_128',
          '2048_1_256',
          '2048_1_512',
          '2048_1_1024'
        ]
      },
      post_wait_freezes: 10,
      next: ['challenge2048_1']
    },
    challenge2048_hh: {
      recognition: 'Custom',
      custom_recognition: 'challenge2048',
      custom_recognition_param: {
        checkList: [
          '2048_hh_1',
          '2048_hh_2',
          '2048_hh_3',
          '2048_hh_4',
          '2048_hh_5',
          '2048_hh_6',
          '2048_hh_7',
          '2048_hh_8',
          '2048_hh_9',
          '2048_hh_10',
          '2048_hh_11'
        ]
      },
      post_wait_freezes: 10,
      next: ['challenge2048_hh']
    },
    challenge2048_cd: {
      recognition: 'Custom',
      custom_recognition: 'challenge2048',
      custom_recognition_param: {
        checkList: [
          '2048_cd_1',
          '2048_cd_2',
          '2048_cd_3',
          '2048_cd_4',
          '2048_cd_5',
          '2048_cd_6',
          '2048_cd_7',
          '2048_cd_8',
          '2048_cd_9',
          '2048_cd_10',
          '2048_cd_11',
          '2048_cd_12',
          '2048_cd_13',
          '2048_cd_14',
          '2048_cd_15'
        ]
      },
      post_wait_freezes: 10,
      next: ['challenge2048_cd']
    }
  }
}
