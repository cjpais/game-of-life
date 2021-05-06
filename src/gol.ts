type Cell = {
  id: number
  row: number
  col: number
  alive: boolean
}

type BoardOptions = {
  periodic: boolean
  rows: number
  columns: number
}

type Board = {
  options: BoardOptions
  cells: Cell[][]
}

const container = document.getElementById("gol");

function getCellFromID(id: number): Cell {
  return gol.cells[Math.floor(id / gol.options.columns)][id % gol.options.columns]
}

function cellClick(e: any) {
  var cell = getCellFromID(e.target.id)

  // Flip the state of the cell
  cell.alive = (cell.alive) ? false : true
  drawCell(cell)
}

function getIndex(index: number, max: number, periodic: boolean): number {
  if (gol.options.periodic) {

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

function countAliveNeighbors(cell: Cell, board: Board): number {
  var numAlive = 0

  for (var r = cell.row - 1; r <= cell.row + 1; r++) {
    for (var c = cell.col - 1; c <= cell.col + 1; c++) {

      if (r == cell.row && c == cell.col) {
        continue
      } else {
        if (gol.options.periodic) {
          let rowIndex = getIndex(r, board.options.rows, board.options.periodic)
          let colIndex = getIndex(c, board.options.columns, board.options.periodic)
          if (gol.cells[rowIndex][colIndex].alive) numAlive++
        }
      }
    }
  } 

  return numAlive
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

// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
function initBoard(options: BoardOptions): Board {
  var cells = []

  container.style.setProperty('--grid-rows', `${options.rows}`);
  container.style.setProperty('--grid-cols', `${options.columns}`);

  for (var row = 0; row < options.rows; row++) {
    var rowArr: Cell[] = []
    for (var col = 0; col < options.columns; col++) {
      var cellElem = document.createElement("div");

      let num = (row * options.columns) + col
      let cell: Cell = {id: num, row: row, col: col, alive: false}

      cellElem.innerText = `${(cell.id + 1)}`;
      cellElem.id = `${cell.id}`;
      cellElem.className = "grid-item";
      cellElem.addEventListener("click", (e) => cellClick(e))
      container.appendChild(cellElem);

      rowArr.push(cell)
    }

    cells.push(rowArr)
  }

  return {options: options, cells: cells}
}

function step(board: Board): Board {
  var newBoard = deepCopy(board)

  for (var r = 0; r < board.options.rows; r++) {
    for (var c = 0; c < board.options.columns; c++) {
      var cell = newBoard.cells[r][c]

      cell.alive = isCellAlive(cell, board)
    }
  }

  return newBoard
}

function drawCell(cell: Cell) {
  var cellElem = document.getElementById(`${cell.id}`)
  cellElem.style.background = (cell.alive) ? "blueviolet" : "white"
}

function draw(board: Board) {
  board.cells.map(row => row.map(cell => {
    drawCell(cell)
  }))
}

function stepDraw() {
  gol = step(gol)
  draw(gol)
}

function deepCopy(c: any): any {
  return JSON.parse(JSON.stringify(c))
}

// Setup the page for the first time
document.getElementById("step").addEventListener("click", () => stepDraw())
var gol = initBoard({rows: 15, columns: 15, periodic: true})