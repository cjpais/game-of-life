import { step } from "./gol"

// https://stackoverflow.com/questions/57550082/creating-a-16x16-grid-using-javascript
function initBoard(options: BoardOptions): Board {
  var cells = []

  const container = document.getElementById("gol");

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

function draw(board: Board) {
  board.cells.map(row => row.map(cell => {
    drawCell(cell)
  }))
}

function stepDraw() {
  gol = step(gol)
  draw(gol)
}

function getCellFromID(id: number): Cell {
  return gol.cells[Math.floor(id / gol.options.columns)][id % gol.options.columns]
}

function cellClick(e: any) {
  var cell = getCellFromID(e.target.id)

  // Flip the state of the cell
  cell.alive = (cell.alive) ? false : true
  drawCell(cell)
}

function drawCell(cell: Cell) {
  var cellElem = document.getElementById(`${cell.id}`)
  cellElem.style.background = (cell.alive) ? "blueviolet" : "white"
}

// Setup the page for the first time
document.getElementById("step").addEventListener("click", () => stepDraw())
var gol = initBoard({rows: 15, columns: 15, periodic: true})