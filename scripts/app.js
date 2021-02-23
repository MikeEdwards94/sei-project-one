function init() {

  const startButton = document.querySelector('#start')
  const seperator = document.querySelector('.seperator')
  const menu = document.querySelector('.menu')
  const title = document.querySelector('h1')


  startButton.addEventListener('click', startGame)

  function startGame() {

    seperator.classList.remove('hidden')
    title.classList.remove('hidden')
    startButton.classList.add('hidden')
    menu.classList.add('hidden')

    

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
    let currentScore = 0
    const lifeDisplay = document.querySelector('#lifeDisplay')
    let lifeRemaining = 25


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

      if (lifeRemaining !== 0) {
        removePlayer(playerCurrentPosition)

        if (key === 39 && playerCurrentPosition % width !== width - 1) {
          playerCurrentPosition++
        }
        if (key === 37 && playerCurrentPosition % width !== 0) {
          playerCurrentPosition--
        }

        addPlayer(playerCurrentPosition)
      }
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

    function findIndex(value, array) {
      const indexOfVal = array.indexOf(value)
      return indexOfVal >= 0 ? indexOfVal : 'Not Found'
    }

    function fireMissile(event) {
      if (lifeRemaining !== 0) {

        const startingMissilePosition = playerCurrentPosition - width
        let currentMissilePosition = playerCurrentPosition - width
        const key = event.keyCode

        if (key === 38) {
          cells[startingMissilePosition].classList.add('missile')
          let timerIdMissile = null
      
          timerIdMissile = setInterval(() => {
            if (aliensCurrentPosition.includes(currentMissilePosition)) {
              console.log('hit', currentMissilePosition)
              spliceAlien(findIndex(currentMissilePosition, aliensCurrentPosition), 1)
              removeAlien(currentMissilePosition)
              clearInterval(timerIdMissile)
              removeMissile(currentMissilePosition)
              currentScore += 100
              scoreDisplay.innerHTML = currentScore
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
          }, 500)
        }
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
    function spliceAlien(position) {
      aliensCurrentPosition.splice(position, 1)
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
          if (lifeRemaining === 0) {
            clearInterval(timerIdRight)
            return
          }
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
          if (lifeRemaining === 0) {
            clearInterval(timerIdDown)
            return
          }
          removeAllAliens(aliensCurrentPosition)
          aliensPlusWidth()
          addAllAliens(aliensCurrentPosition)
          if (aliensCurrentPosition.includes(180) || aliensCurrentPosition.includes(181) || aliensCurrentPosition.includes(182) || aliensCurrentPosition.includes(183) || aliensCurrentPosition.includes(184) || aliensCurrentPosition.includes(185) || aliensCurrentPosition.includes(186) || aliensCurrentPosition.includes(187) || aliensCurrentPosition.includes(188) || aliensCurrentPosition.includes(189) || aliensCurrentPosition.includes(190) || aliensCurrentPosition.includes(191) || aliensCurrentPosition.includes(192) || aliensCurrentPosition.includes(193) || aliensCurrentPosition.includes(194) || aliensCurrentPosition.includes(195) || aliensCurrentPosition.includes(196) || aliensCurrentPosition.includes(197) || aliensCurrentPosition.includes(198) || aliensCurrentPosition.includes(199)) {
            clearInterval(timerIdDown)
            gameOver()
          } else {
            clearInterval(timerIdDown)
            moveLeft()
          }
        }, 1000)
      }
      function moveLeft() {
        let timerIdLeft = null
        timerIdLeft = setInterval(() => {
          if (lifeRemaining === 0) {
            clearInterval(timerIdLeft)
            return
          }
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
          if (lifeRemaining === 0) {
            clearInterval(timerIdDown)
            gameOver()
            return
          }
          removeAllAliens(aliensCurrentPosition)
          aliensPlusWidth()
          addAllAliens(aliensCurrentPosition)
          if (aliensCurrentPosition.includes(180) || aliensCurrentPosition.includes(181) || aliensCurrentPosition.includes(182) || aliensCurrentPosition.includes(183) || aliensCurrentPosition.includes(184) || aliensCurrentPosition.includes(185) || aliensCurrentPosition.includes(186) || aliensCurrentPosition.includes(187) || aliensCurrentPosition.includes(188) || aliensCurrentPosition.includes(189) || aliensCurrentPosition.includes(190) || aliensCurrentPosition.includes(191) || aliensCurrentPosition.includes(192) || aliensCurrentPosition.includes(193) || aliensCurrentPosition.includes(194) || aliensCurrentPosition.includes(195) || aliensCurrentPosition.includes(196) || aliensCurrentPosition.includes(197) || aliensCurrentPosition.includes(198) || aliensCurrentPosition.includes(199)) {
            clearInterval(timerIdDown)
            gameOver()
          } else {
            clearInterval(timerIdDown)
            moveRight()
          }
        }, 1000)
      }
      moveRight()
    }
    aliensMove()



    //!ALIEN BOMB

    const alienLength = aliensCurrentPosition.length

    const bombClass = 'bomb'


    function addBomb(position) {
      cells[position].classList.add(bombClass)
    }

    function removeBomb(position) {
      cells[position].classList.remove(bombClass)
    }


    let timerIdAlienBomb = null
    timerIdAlienBomb = setInterval(() => {

      const randomNumber = Math.floor(Math.random() * alienLength)
      const alienBombing = aliensCurrentPosition[randomNumber]
    
      function AlienBombs(event) {
        const startingBombPosition = alienBombing + width
        let currentBombPosition = alienBombing
      
        let timerIdBomb = null
  
        timerIdBomb = setInterval(() => {
          if (currentBombPosition === playerCurrentPosition) {
            removeBomb(currentBombPosition)
            clearInterval(timerIdBomb)
            lifeRemaining -= 25
            lifeDisplay.innerHTML = lifeRemaining
            if (lifeRemaining === 0) {
              clearInterval(timerIdAlienBomb)
              gameOver()
              return
            }
            console.log('player hit life remaining ->', lifeRemaining)
          } 
          if (currentBombPosition <= 179) {
            removeBomb(currentBombPosition)
            currentBombPosition += width
            addBomb(currentBombPosition)
          } else {
            clearInterval(timerIdBomb)
            removeBomb(currentBombPosition)
            return
          }
        }, 600)
      }
      AlienBombs()

    }, 3000)
  }



  const gridContainer = document.querySelector('.grid-container')
  const displayBox = document.querySelector('.displayInfo')
  const finalScore = document.querySelector('.finalScore')
  console.log(finalScore)

  function gameOver() {
    console.log('GAME OVER')
    gridContainer.classList.add('hidden')
    displayBox.classList.add('hidden')
    finalScore.classList.remove('hidden')
  }


}

window.addEventListener('DOMContentLoaded', init)

//aliensCurrentPosition.includes(19) || aliensCurrentPosition.includes(39) || aliensCurrentPosition.includes(59) || aliensCurrentPosition.includes(79) || aliensCurrentPosition.includes(99) || aliensCurrentPosition.includes(119) || aliensCurrentPosition.includes(139) || aliensCurrentPosition.includes(159) || aliensCurrentPosition.includes(179) || aliensCurrentPosition.includes(199)
//aliensCurrentPosition.includes(20) || aliensCurrentPosition.includes(40) || aliensCurrentPosition.includes(60) || aliensCurrentPosition.includes(80) || aliensCurrentPosition.includes(100) || aliensCurrentPosition.includes(120) || aliensCurrentPosition.includes(140) || aliensCurrentPosition.includes(160) || aliensCurrentPosition.includes(180)

//aliensCurrentPosition.includes(180) || aliensCurrentPosition.includes(181) || aliensCurrentPosition.includes(182) || aliensCurrentPosition.includes(183) || aliensCurrentPosition.includes(184) || aliensCurrentPosition.includes(185) || aliensCurrentPosition.includes(186) || aliensCurrentPosition.includes(187) || aliensCurrentPosition.includes(188) || aliensCurrentPosition.includes(189) || aliensCurrentPosition.includes(190) || aliensCurrentPosition.includes(191) || aliensCurrentPosition.includes(192) || aliensCurrentPosition.includes(193) || aliensCurrentPosition.includes(194) || aliensCurrentPosition.includes(195) || aliensCurrentPosition.includes(196) || aliensCurrentPosition.includes(197) || aliensCurrentPosition.includes(198) || aliensCurrentPosition.includes(199)

//if (cells.classList.contains('missile')) {
//  console.log('wowowow')
//}

//const gridDiv = document.querySelector('.grid').childNodes
//gridDiv[0].style.backgroundColor = 'yellow'

//let j = 0
//for (j = 0; j < gridDiv.length; j++) {
//  gridDiv[j].classList.add = 'gridSquares'
//}

//console.log(gridDiv)
