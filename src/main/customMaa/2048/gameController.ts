import Grid from './grid'

class GameController {
  grid: Grid
  constructor(grid: Grid) {
    this.grid = grid
  }

  getDirection(direction: number): string {
    const map = {
      0: 'Up',
      1: 'Right',
      2: 'Down',
      3: 'Left'
    }
    return map[direction]
  }

  tilesEqual(tile1: number[], tile2: number[]) {
    // 检查数组长度是否相等
    if (tile1.length !== tile2.length) return false

    // 检查每个元素是否相等
    for (let i = 0; i < tile1.length; i++) {
      if (tile1[i] !== tile2[i]) {
        return false // 只要有一个元素不相等，返回 false
      }
    }

    // 所有元素都相等
    return true
  }

  /**
   * 滑动并合并
   */
  slideAndMerge(row: number[]): [tile: number[], status: boolean] {
    // 过滤掉所有的0，留下非0数字
    let nonZeroNumbers = row.filter((num) => num !== 0)

    // 合并相同的数字
    for (let i = 0; i < nonZeroNumbers.length - 1; i++) {
      if (nonZeroNumbers[i] === nonZeroNumbers[i + 1]) {
        nonZeroNumbers[i] *= 2 // 将相同的数字合并为2倍
        nonZeroNumbers[i + 1] = 0 // 合并后，后一个位置置0
      }
    }

    // 移动数字，去掉合并后的0
    nonZeroNumbers = nonZeroNumbers.filter((num) => num !== 0)

    // 填充剩余位置为0
    while (nonZeroNumbers.length < row.length) {
      nonZeroNumbers.push(0)
    }

    return [nonZeroNumbers, !this.tilesEqual(row, nonZeroNumbers)]
  }

  moveTiles(direction: number) {
    let status = false
    switch (direction) {
      case 0: {
        // 将列转为行
        const transposedGrid = this.grid.transpose(this.grid.tileList)

        // 对每一行（实际上是原来的列）进行向左滑动
        for (let i = 0; i < transposedGrid.length; i++) {
          const [tile, _status] = this.slideAndMerge(transposedGrid[i])
          transposedGrid[i] = tile
          if (_status) status = _status
        }

        // 再将行转回列
        this.grid.tileList = this.grid.transpose(transposedGrid)
        break
      }
      case 1:
        for (let i = 0; i < this.grid.tileList.length; i++) {
          const [tile, _status] = this.slideAndMerge(this.grid.tileList[i].reverse())
          this.grid.tileList[i] = tile.reverse()
          if (_status) status = _status
        }
        break
      case 2: {
        // 将列转为行
        const transposedGrid = this.grid.transpose(this.grid.tileList)

        // 对每一行（实际上是原来的列）进行向左滑动
        for (let i = 0; i < transposedGrid.length; i++) {
          const [tile, _status] = this.slideAndMerge(transposedGrid[i].reverse())
          transposedGrid[i] = tile.reverse()
          if (_status) status = _status
        }

        // 再将行转回列
        this.grid.tileList = this.grid.transpose(transposedGrid)
        break
      }
      case 3:
        for (let i = 0; i < this.grid.tileList.length; i++) {
          const [tile, _status] = this.slideAndMerge(this.grid.tileList[i])
          this.grid.tileList[i] = tile
          if (_status) status = _status
        }
        break
    }
    return status
  }

  getVector(direction: number) {
    const map = {
      0: { x: 0, y: -1 }, // Up
      1: { x: 1, y: 0 }, // Right
      2: { x: 0, y: 1 }, // Down
      3: { x: -1, y: 0 } // Left
    }

    return map[direction]
  }

  addTile(position: Position) {
    this.grid.tileList[position.y][position.x] = 2
  }
}

export default GameController
