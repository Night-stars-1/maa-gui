/*
 * @Author: Night-stars-1 nujj1042633805@gmail.com
 * @Date: 2024-09-16 21:01:09
 * @LastEditors: Night-stars-1 nujj1042633805@gmail.com
 * @LastEditTime: 2024-09-17 21:43:48
 */
// by https://github.com/aj-r/2048-AI
import Grid from './grid'
import GameController from './gameController'

// 定义目标类的构造函数
class Goal {
  grid: Grid
  game: GameController
  // 定义智能AI类，并传入游戏实例
  constructor(game: GameController) {
    this.game = game
    this.grid = game.grid
  }

  /**
   * 通过主目标和子目标的策略进行决策
   * 1. 主目标：
   *    - 根据当前的棋盘状态确定目标，如将最高值方块提升至下一等级
   *    - 通过一系列子目标来实现主目标
   * 2. 计划前瞻：
   *    - 预测几步之后的状态，避免将棋盘陷入不利状态，如强制朝某个不理想方向移动
   * @returns 返回操作方向
   *  0: 'Up'
      1: 'Right'
      2: 'Down'
      3: 'Left'
   */
  nextMove() {
    // 计划前瞻：模拟未来几步的情况，分析棋局状态
    const originalQuality = this.gridQuality(this.grid) // 获取当前棋局的质量
    const results = this.planAhead(this.grid, 3, originalQuality) // 前瞻3步的结果
    // 选择最佳的结果， 根据最差得分和损失选择棋盘，避免走入不利状态
    const bestResult = this.chooseBestMove(results, originalQuality)

    return bestResult.direction // 返回最佳的移动方向
  }

  /**
   * 计算几步之后的棋盘状态，返回每个方向最差情况下的棋局得分及其发生概率
   * @param grid 进行中的棋盘
   * @param numMoves 推理的次数
   * @param originalQuality 进行中的棋盘的得分
   */
  planAhead(grid: Grid, numMoves: number, originalQuality: number) {
    const results: (PlanAhead | null)[] = new Array(4) // 存储每个方向的结果

    // 尝试每个方向的移动，模拟效果, 并计算最差得分
    for (let d = 0; d < 4; d++) {
      const testGrid = grid.clone() // 克隆棋局以避免修改原始棋局
      const testGame = new GameController(testGrid)
      const moved = testGame.moveTiles(d) // 模拟方向d的移动
      if (!moved) {
        // 如果没有移动发生，跳过该方向
        results[d] = null
        continue
      }
      // 假设新方块在所有可能的位置生成
      const result: PlanAhead = {
        quality: -1, // 棋局质量
        probability: 1, // 发生的概率
        qualityLoss: 0, // 质量损失（乘以概率后的总损失）
        direction: d // 当前方向
      }
      const availableCells = testGrid.availableCells() // 获取空白格
      for (let i = 0; i < availableCells.length; i++) {
        // 假设最坏情况：新方块生成在靠近现有方块的位置，只测试邻近已有方块的格子
        let hasAdjacentTile = false
        for (let d2 = 0; d2 < 4; d2++) {
          const vector = testGame.getVector(d2) // 获取方向向量
          const adjCell = {
            x: availableCells[i].x + vector.x,
            y: availableCells[i].y + vector.y
          }
          if (testGrid.cellContent(adjCell)) {
            // 如果是有效移动
            hasAdjacentTile = true
            break
          }
        }
        if (!hasAdjacentTile) continue // 如果不是有效移动，跳过该格子

        const testGrid2 = testGrid.clone() // 克隆棋局
        const testGame2 = new GameController(testGrid2)
        testGame2.addTile(availableCells[i]) // 添加一个新的“2”棋子
        let tileResult: PlanAhead
        if (numMoves > 1) {
          // 递归计划下一步
          const subResults = this.planAhead(testGrid2, numMoves - 1, originalQuality)
          tileResult = this.chooseBestMove(subResults, originalQuality) // 选择子结果中最优的移动
        } else {
          /** 计算克隆棋局(模拟棋局)的得分 */
          const tileQuality = this.gridQuality(testGrid2)
          tileResult = {
            quality: tileQuality, // 棋盘得分
            probability: 1,
            qualityLoss: Math.max(originalQuality - tileQuality, 0) // 损失的得分，损失越高棋局质量越低
          } as PlanAhead
        }
        // 比较其他可能生成方块的位置，选择最差的情况
        if (result.quality == -1 || tileResult.quality < result.quality) {
          result.quality = tileResult.quality
          result.probability = tileResult.probability / availableCells.length
        } else if (tileResult.quality == result.quality) {
          // 当前棋盘的得分等于最差棋盘的得分时，该棋盘出现的概率加在最佳棋盘上
          result.probability += tileResult.probability / availableCells.length
        }
        result.qualityLoss += tileResult.qualityLoss / availableCells.length // 更新质量损失
      }
      results[d] = result
    }
    return results // 返回每个方向的结果
  }

  /**
   * 选择最佳的移动方向
   * @param results 每个方向最差情况下的棋局得分及其发生概率
   * @param originalQuality 当前棋盘得分
   */
  chooseBestMove(results: (PlanAhead | null)[], originalQuality: number) {
    // 选择质量损失最小的移动
    let bestResult: PlanAhead | null = null
    for (let i = 0; i < results.length; i++) {
      const result = results[i]

      if (result == null) continue
      if (
        !bestResult ||
        result.qualityLoss < bestResult.qualityLoss || // 损失最小，说明棋盘质量更高
        (result.qualityLoss == bestResult.qualityLoss && result.quality > bestResult.quality) || // 棋盘损失相同，棋盘得分高于最佳棋盘，说明棋盘质量更高
        (result.qualityLoss == bestResult.qualityLoss &&
          result.quality == bestResult.quality &&
          result.probability < bestResult.probability) // 棋盘损失相同，棋盘得分相同，概率更低，说明棋盘质量更高
      ) {
        bestResult = result
      }
    }
    // 如果没有最佳结果，返回默认方向
    if (!bestResult) {
      bestResult = {
        quality: -1,
        probability: 1,
        qualityLoss: originalQuality,
        direction: 0
      }
    }
    return bestResult
  }

  // 计算当前棋局的质量
  gridQuality(grid: Grid) {
    // 通过计算每行和每列的单调性来确定棋局质量
    let monoScore = 0 // 单调性得分
    const matrix = grid.buildMatrix()
    let prevValue = -1
    let incScore = 0, // 递增序列得分
      decScore = 0 // 递减序列得分
    /**
     * 在棋子中，每一列或者一行保持递增或者递减局势的时候，其单调性高
     * 单调性越高，代表其附近的数字更容易合成一个更大的数字
     * 例如，如果数值从一端到另一端递增或递减，玩家可以使用策略来最大限度地合并方块。
     * 1 2 3 4 <-> 2 1 3 1
     * 1 2 4       1 5 4
     * 请者比后者更易合成
     */

    const scoreCell = function (tile: number) {
      incScore += tile
      if (tile <= prevValue || prevValue == -1) {
        decScore += tile
        if (tile < prevValue) {
          incScore -= prevValue
        }
      }
      prevValue = tile
    }

    // 遍历每一列
    matrix.x.forEach(function (tiles) {
      prevValue = -1
      incScore = 0
      decScore = 0
      tiles.forEach(function (tile) {
        scoreCell(tile) // 计算当前格子的得分
      })
      monoScore += Math.max(incScore, decScore)
    })

    // 遍历每一行
    matrix.y.forEach(function (tiles) {
      prevValue = -1
      incScore = 0
      decScore = 0
      tiles.forEach(function (tile) {
        scoreCell(tile) // 计算当前格子的得分
      })
      monoScore += Math.max(incScore, decScore)
    })

    // 计算空格的数量，空格越多得分越高
    const availableCells = grid.availableCells()
    const emptyCellWeight = 8 // 空格得分
    const emptyScore = availableCells.length * emptyCellWeight

    // 总分 = 单调性得分 + 空格得分, 加上空格得分，鼓励合成
    const score = monoScore + emptyScore
    return score
  }
}

export default Goal
