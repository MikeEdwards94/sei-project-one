function init() {

  const grid = document.querySelector('.grid')

  const width = 20
  const height = 10
  const cellCount = width * height

  const cells = []

  const playerClass = 'player'
  const playerStartPosition = (cellCount) - (width / 2)
  let playerCurrentPosition = 190

  const alienClass = 'alien'
  const aliensStartingPosition = [0, 1, 2, 3, 4, 20, 21 ,22, 23, 24, 40, 41, 42, 43, 44, 60, 61, 62, 63, 64]
  let aliensCurrentPosition = [0, 1, 2, 3, 4, 20, 21 ,22, 23, 24, 40, 41, 42, 43, 44, 60, 61, 62, 63, 64]
  

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
    aliensCurrentPosition.forEach(position => addAlien(position))
  }
  function removeAllAliens() {
    aliensCurrentPosition.forEach(position => removeAlien(position))
  }

  function addAlien(position) {
    cells[position].classList.add(alienClass)
  }
  function removeAlien(position) {
    cells[position].classList.remove(alienClass)
  }

  const wallArray = [19, 39, 59, 79, 99, 20, 40, 60, 80]






  function aliensMove() {
    function aliensPlusOne() {
      for (let i = 0; i < aliensCurrentPosition.length; i++) {
        aliensCurrentPosition[i] += 1
      }
    }
    function aliensMinusOne() {
      for (let i = 0; i < aliensCurrentPosition.length; i++) {
        aliensCurrentPosition[i] -= 1
      }
    }

    function aliensPlusWidth() {
      for (let i = 0; i < aliensCurrentPosition.length; i++) {
        aliensCurrentPosition[i] += width
      }
    }
    

    function moveRight() {
      let timerIdRight = null
      timerIdRight = setInterval(() => {
        removeAllAliens(aliensCurrentPosition)
        aliensPlusOne()
        addAllAliens(aliensCurrentPosition)
        if (aliensCurrentPosition.includes(19) || aliensCurrentPosition.includes(59)) {
          console.log('wall hit')
          clearInterval(timerIdRight)
          moveDownToLeft()
        }
      }, 1000)
    }
    function moveDownToLeft() {
      let timerIdDown = null
      timerIdDown = setInterval(() => {
        removeAllAliens(aliensCurrentPosition)
        aliensPlusWidth()
        addAllAliens(aliensCurrentPosition)
        clearInterval(timerIdDown)
        moveLeft()
      }, 1000)
    }
    function moveLeft() {
      let timerIdLeft = null
      timerIdLeft = setInterval(() => {
        removeAllAliens(aliensCurrentPosition)
        aliensMinusOne()
        addAllAliens(aliensCurrentPosition)
        if (aliensCurrentPosition.includes(20)) {
          console.log('wall hit')
          clearInterval(timerIdLeft)
          moveDownToRight()
        }
      }, 1000)
    }
    function moveDownToRight() {
      let timerIdDown = null
      timerIdDown = setInterval(() => {
        removeAllAliens(aliensCurrentPosition)
        aliensPlusWidth()
        addAllAliens(aliensCurrentPosition)
        clearInterval(timerIdDown)
        moveRight()
      }, 1000)
    }
    moveRight()
  }
  aliensMove()














}

window.addEventListener('DOMContentLoaded', init)

