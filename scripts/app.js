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
  const alienStartingPosition = 0
  const alienCurrentPosition = 0

  function addAlien(position) {
    cells[position].classList.add(alienClass)
  }

  function removeAlien(position) {
    cells[position].classList.remove(alienClass)
  }

  document.addEventListener('keydown', fireMissile)

  function createGrid(playerStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addPlayer(playerStartPosition)
    addAlien(alienStartingPosition)
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
      console.log()
      console.log(startingMissilePosition)
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


  //! ALIENS

















}

window.addEventListener('DOMContentLoaded', init)