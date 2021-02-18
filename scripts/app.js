function init() {

  const grid = document.querySelector('.grid')

  const width = 10
  const height = 10
  const cellCount = width * height

  const cells = []

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }


  createGrid()

}

window.addEventListener('DOMContentLoaded', init)