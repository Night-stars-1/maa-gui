import { logger } from '../../utils/logger'

/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-17 13:18:40
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-18 18:39:26
 */
class Grid {
  /** [y, x] */
  tileList: number[][]
  size: number
  constructor(tileList: number[][]) {
    this.tileList = tileList
    if (tileList.length !== tileList[0].length) {
      throw new Error('tileList is not a square matrix')
    }
    this.size = tileList.length
  }

  /**
   * 将x轴和y轴翻转
   */
  transpose(tileList: number[][]) {
    const transposed: number[][] = []
    for (let x = 0; x < tileList[0].length; x++) {
      const column: number[] = []
      for (let y = 0; y < tileList.length; y++) {
        column.push(tileList[y][x])
      }
      transposed.push(column)
    }
    return transposed
  }

  /**
   * 获取每一列和每一行的棋子
   */
  buildMatrix() {
    return {
      x: this.transpose(this.tileList),
      y: this.tileList
    }
  }

  /**
   * 计算可用单元格(2048中的2格子)
   */
  availableCells() {
    const zeroCoordinates: Position[] = []
    for (let y = 0; y < this.tileList.length; y++) {
      for (let x = 0; x < this.tileList[y].length; x++) {
        if (this.tileList[y][x] === 0) {
          zeroCoordinates.push({
            x,
            y
          })
        }
      }
    }
    return zeroCoordinates
  }

  /**
   * 判断是否在棋盘内
   */
  private withinBounds(position: Position) {
    return position.x >= 0 && position.x < this.size && position.y >= 0 && position.y < this.size
  }

  /**
   * 判断是否在棋盘内，并返回坐标
   */
  cellContent(cell: Position) {
    if (this.withinBounds(cell)) {
      return this.tileList[cell.x][cell.y]
    } else {
      return null
    }
  }

  clone() {
    return new Grid(this.tileList.map((tiles) => [...tiles]))
  }

  show() {
    const message: string[] = []
    this.tileList.forEach((item) => {
      // 对每个数字进行填充，使其与最长数字长度一致
      const paddedNumbers = item.map((num) => num.toString().padEnd(4, ' '))
      message.push(paddedNumbers.join(' '))
    })
    message.push('-----------------')
    message.forEach((item) => logger.info(item))
    return message
  }

  /**
   * 设置棋盘
   */
  setTiles(tileList: number[][]) {
    this.tileList = tileList
  }
}

export default Grid
