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

  const scoreDisplay = document.querySelector('#scoreDisplay')
  let score = 0
  const lifeDisplay = document.querySelector('#lifeDisplay')
  let lifeRemaining = 100


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
      let timerIdMissile = null
      
      timerIdMissile = setInterval(() => {
        if (aliensCurrentPosition.includes(currentMissilePosition)) {
          clearInterval(timerIdMissile)
          removeMissile(currentMissilePosition)
          return
        } else if (currentMissilePosition >= width) {
          removeMissile(currentMissilePosition)
          currentMissilePosition -= width
          addMissile(currentMissilePosition)
        } else {
          clearInterval(timerIdMissile)
          removeMissile(currentMissilePosition)
          return
        }
        console.log(currentMissilePosition)
        console.log(aliensCurrentPosition)
      }, 500)
    }
  }

  document.addEventListener('keydown', fireMissile)

  if (cell.classList.contains('missile') && cells.classList.contains('alien')) {
    console.log('wowowow')
  }


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
        if (aliensCurrentPosition.includes(19) || aliensCurrentPosition.includes(39) || aliensCurrentPosition.includes(59) || aliensCurrentPosition.includes(79) || aliensCurrentPosition.includes(99) || aliensCurrentPosition.includes(119) || aliensCurrentPosition.includes(139) || aliensCurrentPosition.includes(159) || aliensCurrentPosition.includes(179) || aliensCurrentPosition.includes(199)) {
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
        if (aliensCurrentPosition.includes(180) || aliensCurrentPosition.includes(181) || aliensCurrentPosition.includes(182) || aliensCurrentPosition.includes(183) || aliensCurrentPosition.includes(184) || aliensCurrentPosition.includes(185) || aliensCurrentPosition.includes(186) || aliensCurrentPosition.includes(187) || aliensCurrentPosition.includes(188) || aliensCurrentPosition.includes(189) || aliensCurrentPosition.includes(190) || aliensCurrentPosition.includes(191) || aliensCurrentPosition.includes(192) || aliensCurrentPosition.includes(193) || aliensCurrentPosition.includes(194) || aliensCurrentPosition.includes(195) || aliensCurrentPosition.includes(196) || aliensCurrentPosition.includes(197) || aliensCurrentPosition.includes(198) || aliensCurrentPosition.includes(199)) {
          clearInterval(timerIdDown)
        } else {
          clearInterval(timerIdDown)
          moveLeft()
        }
      }, 1000)
    }
    function moveLeft() {
      let timerIdLeft = null
      timerIdLeft = setInterval(() => {
        removeAllAliens(aliensCurrentPosition)
        aliensMinusOne()
        addAllAliens(aliensCurrentPosition)
        if (aliensCurrentPosition.includes(20) || aliensCurrentPosition.includes(40) || aliensCurrentPosition.includes(60) || aliensCurrentPosition.includes(80) || aliensCurrentPosition.includes(100) || aliensCurrentPosition.includes(120) || aliensCurrentPosition.includes(140) || aliensCurrentPosition.includes(160) || aliensCurrentPosition.includes(180)) {
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
        if (aliensCurrentPosition.includes(180) || aliensCurrentPosition.includes(181) || aliensCurrentPosition.includes(182) || aliensCurrentPosition.includes(183) || aliensCurrentPosition.includes(184) || aliensCurrentPosition.includes(185) || aliensCurrentPosition.includes(186) || aliensCurrentPosition.includes(187) || aliensCurrentPosition.includes(188) || aliensCurrentPosition.includes(189) || aliensCurrentPosition.includes(190) || aliensCurrentPosition.includes(191) || aliensCurrentPosition.includes(192) || aliensCurrentPosition.includes(193) || aliensCurrentPosition.includes(194) || aliensCurrentPosition.includes(195) || aliensCurrentPosition.includes(196) || aliensCurrentPosition.includes(197) || aliensCurrentPosition.includes(198) || aliensCurrentPosition.includes(199)) {
          clearInterval(timerIdDown)
        } else {
          clearInterval(timerIdDown)
          moveRight()
        }
      }, 1000)
    }
    moveRight()
  }
  aliensMove()












}

window.addEventListener('DOMContentLoaded', init)

//aliensCurrentPosition.includes(19) || aliensCurrentPosition.includes(39) || aliensCurrentPosition.includes(59) || aliensCurrentPosition.includes(79) || aliensCurrentPosition.includes(99) || aliensCurrentPosition.includes(119) || aliensCurrentPosition.includes(139) || aliensCurrentPosition.includes(159) || aliensCurrentPosition.includes(179) || aliensCurrentPosition.includes(199)
//aliensCurrentPosition.includes(20) || aliensCurrentPosition.includes(40) || aliensCurrentPosition.includes(60) || aliensCurrentPosition.includes(80) || aliensCurrentPosition.includes(100) || aliensCurrentPosition.includes(120) || aliensCurrentPosition.includes(140) || aliensCurrentPosition.includes(160) || aliensCurrentPosition.includes(180)

//aliensCurrentPosition.includes(180) || aliensCurrentPosition.includes(181) || aliensCurrentPosition.includes(182) || aliensCurrentPosition.includes(183) || aliensCurrentPosition.includes(184) || aliensCurrentPosition.includes(185) || aliensCurrentPosition.includes(186) || aliensCurrentPosition.includes(187) || aliensCurrentPosition.includes(188) || aliensCurrentPosition.includes(189) || aliensCurrentPosition.includes(190) || aliensCurrentPosition.includes(191) || aliensCurrentPosition.includes(192) || aliensCurrentPosition.includes(193) || aliensCurrentPosition.includes(194) || aliensCurrentPosition.includes(195) || aliensCurrentPosition.includes(196) || aliensCurrentPosition.includes(197) || aliensCurrentPosition.includes(198) || aliensCurrentPosition.includes(199)