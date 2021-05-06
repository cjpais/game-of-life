export function step(board: Board): Board {
  var newBoard = deepCopy(board)

  for (var r = 0; r < board.options.rows; r++) {
    for (var c = 0; c < board.options.columns; c++) {
      var cell = newBoard.cells[r][c]

      cell.alive = isCellAlive(cell, board)
    }
  }

  return newBoard
}

function isCellAlive(cell: Cell, board: Board): boolean {
  var alive = false

  let numAlive = countAliveNeighbors(cell, board)

  if (cell.alive && (numAlive == 2 || numAlive == 3) ) {
    alive = true
  } else if (!cell.alive && numAlive == 3) {
    alive = true
  }

  return alive 
}

function countAliveNeighbors(cell: Cell, board: Board): number {
  var numAlive = 0

  for (var r = cell.row - 1; r <= cell.row + 1; r++) {
    for (var c = cell.col - 1; c <= cell.col + 1; c++) {

      if (r == cell.row && c == cell.col) {
        continue
      } else {
        if (board.options.periodic) {
          let rowIndex = getIndex(r, board.options.rows, board.options.periodic)
          let colIndex = getIndex(c, board.options.columns, board.options.periodic)
          if (board.cells[rowIndex][colIndex].alive) numAlive++

          // Alternatively can do. TODO this is wrong. Come back after IPFS deploy
          // let rowIndex = (r + board.options.rows) % board.options.rows
          // let colIndex = (c + board.options.columns) % board.options.columns
        }
      }
    }
  } 

  return numAlive
}

function getIndex(index: number, max: number, periodic: boolean): number {
  if (periodic) {

    if (index < 0) {
      return max - 1
    } else if (index == max) {
      return 0
    }

  } else {
    if (index < 0 || index == max) return 0
  }

  return index
} 

function deepCopy(c: any): any {
  return JSON.parse(JSON.stringify(c))
}
