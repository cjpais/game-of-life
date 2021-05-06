type Cell = {
  id: number
  row: number
  col: number
  alive: boolean
}

interface BoardOptions {
  periodic: boolean
  rows: number
  columns: number
}

type Board = {
  options: BoardOptions
  cells: Cell[][]
}