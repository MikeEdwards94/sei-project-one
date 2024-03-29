function init() {

  const startButton = document.querySelector('#start')
  const menu = document.querySelector('.menu')
  const title = document.querySelector('h1')
  const formSelect = document.querySelector('form')
  const gameBackground = document.querySelector('.gameBackground')

  formSelect.addEventListener('submit', form)

  function form(event) {
    event.preventDefault()
  }

  startButton.addEventListener('click', startGame)

  const cacoDeathAudio = document.getElementById('cacoDeath')
  function playCacoDeathAudio() {
    cacoDeathAudio.volume = 0.05
    cacoDeathAudio.play()
  }
  const playerShootsAudio = document.getElementById('playerShoots')
  function playPlayerShootsAudio() {
    playerShootsAudio.volume = 0.1
    playerShootsAudio.play()
  }
  const doomAnnouncerAudio = document.getElementById('doomAnnouncer')
  function playDoomAnnouncerAudio() {
    doomAnnouncerAudio.volume = 0.1
    doomAnnouncerAudio.play()
  }
  const doorAudio = document.getElementById('door')
  function playDoorAudio() {
    doorAudio.volume = 0.4
    doorAudio.play()
  }
  const doomMusic = document.getElementById('doomMusic')
  function playDoomMusic() {
    doomMusic.volume = 0.2
    doomMusic.play()
  }
  const playerHitAudio = document.getElementById('playerHit')
  function playPlayerHitAudio() {
    playerHitAudio.volume = 0.2
    playerHitAudio.play()
  }
  const cacoAttackAudio = document.getElementById('cacoAttack')
  function playCacoAttackAudio() {
    cacoAttackAudio.volume = 0.05
    cacoAttackAudio.play()
  }
  const windowsErrorAudio = document.getElementById('windowsError')
  function playWindowsErrorAudio() {
    windowsErrorAudio.volume = 0.3
    windowsErrorAudio.play()
  }

  //!Windows Start Screen

  const doom94 = document.querySelector('.doom94')
  const halfLife3 = document.querySelector('.halfLife3')
  const myLittlePony = document.querySelector('.myLittlePony')
  const bankDetails = document.querySelector('.bankDetails')
  const windowsBasicImg = document.querySelector('.windowsBasicImg')


  doom94.addEventListener('dblclick', runDoom)
  
  halfLife3.addEventListener('dblclick' , halfLife3Func)
  function halfLife3Func() {
    playWindowsErrorAudio()
    alert('Half-Life 3 cannot be found anywhere :\'( please try again later.')
  }
  
  myLittlePony.addEventListener('dblclick' , myLittlePonyFunc)
  function myLittlePonyFunc() {
    playWindowsErrorAudio()
    alert('Cannot run My Little Pony. No disk found.')
  }

  bankDetails.addEventListener('dblclick' , bankDetailsFunc)
  function bankDetailsFunc() {
    playWindowsErrorAudio()
    alert('Oi you\'re not supposed to be clicking this, cut that out nosey.')
  }






  doom94.addEventListener('click', doom94ClickFunc)
  function doom94ClickFunc() {
    doom94.classList.add('doom94Click')
    halfLife3.classList.remove('halfLife3Click')
    myLittlePony.classList.remove('myLittlePonyClick')
    bankDetails.classList.remove('bankDetailsClick')
  }
  halfLife3.addEventListener('click', halfLife3ClickFunc)
  function halfLife3ClickFunc() {
    doom94.classList.remove('doom94Click')
    halfLife3.classList.add('halfLife3Click')
    myLittlePony.classList.remove('myLittlePonyClick')
    bankDetails.classList.remove('bankDetailsClick')
  }
  myLittlePony.addEventListener('click', myLittlePonyClickFunc)
  function myLittlePonyClickFunc() {
    doom94.classList.remove('doom94Click')
    halfLife3.classList.remove('halfLife3Click')
    myLittlePony.classList.add('myLittlePonyClick')
    bankDetails.classList.remove('bankDetailsClick')
  }
  bankDetails.addEventListener('click', bankDetailsClickFunc)
  function bankDetailsClickFunc() {
    doom94.classList.remove('doom94Click')
    halfLife3.classList.remove('halfLife3Click')
    myLittlePony.classList.remove('myLittlePonyClick')
    bankDetails.classList.add('bankDetailsClick')
  }


  const progressBar = document.querySelector('.progress')
  const loadingPercentage = document.querySelector('#loadingPercentage')
  const loadingSection = document.querySelector('.loadingSection')

  function runDoom() {
    windowsBasicImg.classList.toggle('hidden')
    loadingSection.classList.toggle('hidden')
    const animation = setInterval(() => {
      if (progressBar.value < 30) {
        loadingPercentage.innerHTML = 'Loading ' + progressBar.value + '%'
        progressBar.value++
      } else {
        clearInterval(animation)
        loading2()
        return
      }
    }, 30)
    function loading2() {
      const animation2 = setInterval(() => {
        if (progressBar.value < 99) {
          loadingPercentage.innerHTML = 'Loading ' + progressBar.value + '%'
          progressBar.value++
        } else {
          clearInterval(animation2)
          loading3()
          return
        }
      }, 10)  
    }
    function loading3() {
      const animation3 = setInterval(() => {
        if (progressBar.value === 99) {
          progressBar.value++
          loadingPercentage.innerHTML = 'Loading ' + progressBar.value + '%'
        } else {
          loadingPercentage.innerHTML = 'Loading ' + progressBar.value + '%'
          clearInterval(animation3)
          loadingSection.classList.add('hidden')
          menu.classList.toggle('hidden')
          playDoomAnnouncerAudio()
          return
        }
      }, 2000)
    }
  }

  function startGame() {

    menu.classList.toggle('hidden')
    gameBackground.classList.remove('hidden')
    title.classList.remove('hidden')
    startButton.classList.add('hidden')

    playDoorAudio()
    playDoomMusic()

    const doomGuyFaceBox = document.querySelector('.faceImage')


    const grid = document.querySelector('.grid')

    const width = 20
    const height = 10
    const cellCount = width * height

    const cells = []

    const playerClass = 'player'
    const playerStartPosition = (cellCount) - (width / 2)
    let playerCurrentPosition = 190

    const alienClass = 'alien'
    const aliensCurrentPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 20, 21 ,22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69 ,70, 71]


    const scoreDisplay = document.querySelector('#scoreDisplay')
    let currentScore = 0
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

    let canShoot = true

    function fireMissile(event) {

      if (!canShoot) return
      canShoot = false
      setTimeout(() => {
        canShoot = true
      }, 600)

      if (lifeRemaining !== 0) {

        const startingMissilePosition = playerCurrentPosition - width
        let currentMissilePosition = playerCurrentPosition - width
        const key = event.keyCode


        if (key === 32) {
          cells[startingMissilePosition].classList.add('missile')
          playPlayerShootsAudio()
          let timerIdMissile = null
      
          timerIdMissile = setInterval(() => {
            if (aliensCurrentPosition.includes(currentMissilePosition)) {
              spliceAlien(findIndex(currentMissilePosition, aliensCurrentPosition), 1)
              removeAlien(currentMissilePosition)
              playCacoDeathAudio()
              clearInterval(timerIdMissile)
              removeMissile(currentMissilePosition)
              currentScore += 100
              scoreDisplay.innerHTML = currentScore
              if (currentScore === 4800) {
                gameOver()
              }
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
          }, 300)
        }
      }
    }

    document.addEventListener('keyup', fireMissile)





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
            clearInterval(timerIdAlienBomb)
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
            clearInterval(timerIdAlienBomb)
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


    const bombClass = 'bomb'


    function addBomb(position) {
      cells[position].classList.add(bombClass)
    }

    function removeBomb(position) {
      cells[position].classList.remove(bombClass)
    }


    let timerIdAlienBomb = null
    timerIdAlienBomb = setInterval(() => {
      const alienLength = aliensCurrentPosition.length

      const randomNumber = Math.floor(Math.random() * alienLength)
      const alienBombing = aliensCurrentPosition[randomNumber]
    
      function AlienBombs() {
        let currentBombPosition = alienBombing
        if (aliensCurrentPosition.length === 0) {
          clearInterval(timerIdAlienBomb)
          clearInterval(timerIdBomb)
          return
        }

        playCacoAttackAudio()

        let timerIdBomb = null
  
        timerIdBomb = setInterval(() => {
          if (currentBombPosition === playerCurrentPosition) {
            playPlayerHitAudio()
            removeBomb(currentBombPosition)
            clearInterval(timerIdBomb)
            lifeRemaining -= 25
            lifeDisplay.innerHTML = lifeRemaining
            if (lifeRemaining === 75) {
              doomGuyFaceBox.classList.remove('faceImage')
              doomGuyFaceBox.classList.add('doomFace75')
            } if (lifeRemaining === 50) {
              doomGuyFaceBox.classList.remove('doomFace75')
              doomGuyFaceBox.classList.add('doomFace50')
            } if (lifeRemaining === 25) {
              doomGuyFaceBox.classList.remove('doomFace50')
              doomGuyFaceBox.classList.add('doomFace25')
            } if (lifeRemaining === 0) {
              doomGuyFaceBox.classList.remove('doomFace25')
              doomGuyFaceBox.classList.add('doomFace0')
              clearInterval(timerIdAlienBomb)
              clearInterval(timerIdBomb)
              gameOver()
              return
            }
            
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
        }, 400)
      }
      AlienBombs()

    }, 1000)
  }








  const gridContainer = document.querySelector('.grid-container')

  function gameOver() {
    gridContainer.classList.add('hidden')
    startButton.classList.remove('hidden')
  }


}

window.addEventListener('DOMContentLoaded', init)