function init() {

  const grid = document.querySelector('.grid')

  const width = 20
  const height = 10
  const cellCount = width * height

  const cells = []

  const playerClass = 'player'
  const playerStartPosition = (height * width) - (width / 2)
  let playerCurrentPosition = 190

  const alienClass = 'alien'
  const aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  let aliensCurrentPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  

  function createGrid(playerStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addPlayer(playerStartPosition)
    addAllAliens()
  }
  createGrid(playerStartPosition)



  //!PLAYER MOVEMENT
  function addPlayer(position) {
    cells[position].classList.add(playerClass)
  }

  function removePlayer(position) {
    cells[position].classList.remove(playerClass)
  }

  function handleKeyDown(event) {
    const key = event.keyCode

    removePlayer(playerCurrentPosition)

    if (key === 39 && playerCurrentPosition % width !== width - 1) {
      playerCurrentPosition++
    }
    if (key === 37 && playerCurrentPosition % width !== 0) {
      playerCurrentPosition--
    }

    addPlayer(playerCurrentPosition)
    
  }

  document.addEventListener('keydown', handleKeyDown)



  //! Player Projectile
  const missileClass = 'missile'


  function addMissile(position) {
    cells[position].classList.add(missileClass)
  }

  function removeMissile(position) {
    cells[position].classList.remove(missileClass)
  }

  function fireMissile(event) {
    const startingMissilePosition = playerCurrentPosition - width
    let currentMissilePosition = playerCurrentPosition - width
    const key = event.keyCode

    if (key === 38) {
      cells[startingMissilePosition].classList.add('missile')
      setInterval(() => {
        if (currentMissilePosition >= width) {
          removeMissile(currentMissilePosition)
          currentMissilePosition -= width
          addMissile(currentMissilePosition)
        } else {
          clearInterval
          removeMissile(currentMissilePosition)
        }
      }, 500)
    }
  }

  document.addEventListener('keydown', fireMissile)

  //! ALIENS


  function addAllAliens() {
    aliens.forEach(position => addAlien(position))
  }
  function removeAllAliens() {
    aliens.forEach(position => removeAlien(position))
  }


  function addAlien(position) {
    cells[position].classList.add(alienClass)
  }
  function removeAlien(position) {
    cells[position].classList.remove(alienClass)
  }

  function aliensMove() {
    console.log(aliensCurrentPosition)
  }
  aliensMove()














}

window.addEventListener('DOMContentLoaded', init)