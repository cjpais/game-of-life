type Cell = {
  id: number
  row: number
  col: number
  alive: boolean
}

type GOLOptions = {
  periodic: boolean
}

const container = document.getElementById("gol");

var numRows: number = 6
var numCols: number = 6

var cells: Cell[][] = []
var cellsNext: Cell[][] = []

function setAlive(cell: Cell) {
  cell.alive = true
  var cellElem = document.getElementById(`${cell.id}`)
  cellElem.style.background = "blueviolet"
}

function setDead(cell: Cell) {
  cell.alive = false
  var cellElem = document.getElementById(`${cell.id}`)
  cellElem.style.background = "white"
}

function getCellFromID(id: number): Cell {
  return cells[Math.floor(id / numCols)][id % numCols]
}

function cellClick(e: any) {
  var cell = getCellFromID(e.target.id)

  if (cell.alive) {
    setDead(cell)
  } else {
    setAlive(cell)
  }
}

function getCellStatus(row: number, col: number, periodic: boolean) {
  var numAlive = 0
  var alive = false
  let currCell = cells[row][col]

  for (var r = row - 1; r <= row + 1; r++) {
    for (var c = col - 1; c <= col + 1; c++) {

      if (r == row && c == col) {
        continue
      } else {
        var rowIndex = 0
        var colIndex = 0

        if (r < 0) {
          rowIndex = numRows - 1
        } else if (r == numRows) {
          rowIndex = 0
        } else {
          rowIndex = r
        }

        if (c < 0) {
          colIndex = numCols - 1
        } else if (c == numCols) {
          colIndex = 0
        } else {
          colIndex = c
        }

        if (cells[rowIndex][colIndex].alive) numAlive++

      }

    }
  } 

  // var numa = 0
  // cells.map(row => row.map(cell => {
  //   if (cell.alive) numa++
  // }))
  // console.log(cells, numa)
  // console.log(`cell ${currCell.id + 1} num alive ${numAlive}`)


  if (currCell.alive && (numAlive == 2 || numAlive == 3) ) {
    alive = true
  } else if (!currCell.alive && numAlive == 3) {
    alive = true
  }

  return alive 
}

function run(options: GOLOptions) {

  for (var r = 0; r < numRows; r++) {
    let row = cells[r]

    for (var c = 0; c < numCols; c++) {
      var cell = row[c]
      var cellNext = cellsNext[r][c]

      let alive = getCellStatus(r, c, options.periodic)

      if (alive) {
        setAlive(cellNext)
      } else {
        setDead(cellNext)
      }

    }
  }

  cells = deepCopy(cellsNext)

}

// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
function makeRows(rows: number, cols: number): Cell[][] {
  var cells = []

  container.style.setProperty('--grid-rows', `${rows}`);
  container.style.setProperty('--grid-cols', `${cols}`);

  for (var row = 0; row < rows; row++) {
    var rowArr: Cell[] = []
    for (var col = 0; col < cols; col++) {
      var cellElem = document.createElement("div");

      let num = (row * cols) + col
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

  return cells
}

function deepCopy(c: any): any {
  return JSON.parse(JSON.stringify(c))
}

document.getElementById("step").addEventListener("click", () => run({periodic: true}))

cells = makeRows(numRows, numCols);
cellsNext = deepCopy(cells)