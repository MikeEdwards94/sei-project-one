<h1>Project 1 - Space Invaders</h1>

<h3>Project Overview:</h3>

For the first project we were tasked with creating a functioning game of our choice in the browser using a combination of HTML, CSS and Javascript.

For my first ever project as a software developer I made a Space Invaders game inspired by the style of the original DOOM.

Space Invaders is a classic arcade game from the 80’s. The user controls a ship at the bottom and is tasked with shooting all the aliens before they can reach the player or until the player runs out of lives.

The player can only move left and right and shoot. The aliens snake alternately left and right and drop down a row once reaching the leftmost or rightmost column. The aliens also periodically drop bombs which will slowly lower down towards the player.

<h3>Deployment</h3>

This game is deployed on github pages at https://mikeedwards94.github.io/sei-project-one/.

<h3>Controls</h3>

I added in a windows-esque start screen to load into the game. To begin the game double click the game icon to load into the game, then enter a username and press start.

From here the game will begin, use the left and right arrow keys to move the player left and right respectively.

Press the spacebar to fire the missile at the aliens

<h3>Demo</h3>

![Doom](https://user-images.githubusercontent.com/77836499/117694666-4f26b380-b1b7-11eb-8e5a-dde4046c23db.gif)



<h3>Technologies Used</h3>

* HTML5
* CSS with animation
* JavaScript ES6
* Git
* GitHub
* Google Fonts


<h3>Initial Planning and Approach</h3>

My initial approach to this project was to try to run a basic overview of everything I might need to consider. To do this I tried to write down every functioning part of the game and then expand on how I might go about this ie. What can the player do, what can happen to the player and how I initially thought to achieve this. I have attached a snippet of my basic overview below:

<img width="897" alt="Screenshot 2021-05-04 at 11 45 32" src="https://user-images.githubusercontent.com/77836499/117690128-69aa5e00-b1b2-11eb-8aaf-1100bbaa95e7.png">








<h3>Day 1</h3>

On the first day of the project I only had about half a day so set out the target of constructing a basic grid. To do this I initially set a few constants like `width`, `height` and a `total cellCount`, which would be the width * height. I then created a `createGrid` function which would use a for loop which would create the same number of cells as the one defined in the `cellCount`. By doing this it meant that later on if I wanted to change the number of cells or the grid dimensions I could do so by adjusting the width and height constants.

```  const grid = document.querySelector('.grid')

  const width = 10
  const height = 20
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
```

<h3>Day 2</h3>

The next job I targeted was the creation of a player that would be able to move left and right. To do this I created a player class and a player starting position at a specific cell. I then added in a function to add a player at a specific position, as well as the opposite function so that if the player was to move right I could add the player class to the next cell and remove it from the original cell. I added the addPlayer function into the create grid so the player was created immediately and then added in player movement by adding a handleKeyDown function. 

This contained two simple if statements that meant the player would move right and left one cell depending on which arrow key was hit. It also contained a basic requirement that the player could not move any further than the width wall which was calculated using the width and a modulus operator.

```  const playerClass = 'player'
  const playerStartPosition = 190
  let playerCurrentPosition = 190
  
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
```



Next I added in the player projectiles which I will refer to as missiles. This was a similar method to the player movement but with a key difference of a setInterval. As the missile had to constantly move up the grid I used a setInterval where the missile would be removed from that cell, moved up a row (by minusing the width) and then adding a new missile into that cell. It would start one row above the playerCurrentPosition and use another key press to initiate the function.


```
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
      const missileTimer = setInterval(() => {
        removeMissile(currentMissilePosition)
        console.log(currentMissilePosition -= width)
        addMissile(currentMissilePosition)
      }, 2000)
    }
```


Up until this point everything had run fairly smoothly, however the alien movement would prove to be my first challenge. The general approach to the alien movement was the same as the previous missile function and player movement; they would move to the next cell and disappear from the previous one, however this happened for all the aliens in formation. To solve this I created an array of alien starting positions and then created functions for moving an alien individually and a function that would map through the alien array and use the individual function to move every alien within that array.


```
  const alienClass = 'alien'
  const aliensStartingPosition = [0, 1, 2, 3, 4, 20, 21 ,22, 23, 24, 40, 41, 42, 43, 44, 60, 61, 62, 63, 64]
  let aliensCurrentPosition = [0, 1, 2, 3, 4, 20, 21 ,22, 23, 24, 40, 41, 42, 43, 44, 60, 61, 62, 63, 64]
  
//Functions to add and remove aliens to cells
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
  
//Functions to designate movement across cells
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
    

```

Next the aliens would use a setInterval similar to the missile function, to move one cell every second, however this time would need a condition that if one of the aliens from the array hit the width boundary they would shift down. To do this I created a function for movement right, down (initiating movement right), left and down again (instead initiating movement left this time). These all would move the alien in the direction required and upon hitting a boundary or moving down would clear the interval of that function and trigger the next movement function thus allowing the alternate snaking movement to occur.

```
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
```

From here I added in a condition to clear the missile if the cell contained both a missile and an alien but struggled to find a way to remove the alien specific to that place in the formation, while maintaining the formation for the next alien movements.

<h3>Day 3</h3>

As I was still struggling to figure out a way to remove the aliens, I decided to move onto a different task of building out the alien bombs. Again similar to previous code, this used the adding and removing of classes to cells to imitate movement. However this required to setIntervals to work. The first was a timer for any alien to drop a bomb using Math.random to grab a random number from the array of aliens to use as a starting position for the bomb. The second setInterval was for the actual bomb, using the same method as the missile timing but instead of ascending this time it would descend.  

```
let timerIdAlienBomb = null
  timerIdAlienBomb = setInterval(() => {

    const randomNumber = Math.floor(Math.random() * alienLength)
    const alienBombing = aliensCurrentPosition[randomNumber]
    
    function AlienBombs(event) {
      const startingBombPosition = alienBombing + width
      let currentBombPosition = alienBombing
      
      let timerIdBomb = null
  
      timerIdBomb = setInterval(() => {
        if (currentBombPosition <= 180) {
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

  }, 8000)
```

<h3>Day 4</h3>

By the end of day 4 I managed to get close to a very basic MVP. I finished off some functionality in getting the player missile and alien bombs to stop at the end of the grid and interacting with each other. After a lot of thought I finally managed to remove the aliens hit by the player missiles with the use of splice! This was the hardest part of the project for me, as getting the specific alien to be removed while keeping the rest of the formation intact proved harder than I had initially thought. However once conquering this I knew the rest of the project was going to be relatively straight forward. I implemented a basic scoreboard which increased on alien deaths by 100 points, and a basic hide/ display scoreboard for the end screen along with some models for the player, aliens, and missiles.

```
    const scoreDisplay = document.querySelector('#scoreDisplay')
    let currentScore = 0
    const lifeDisplay = document.querySelector('#lifeDisplay')
    let lifeRemaining = 100
    
//Condition within fuction for player missile
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
```


<h3>Day 5</h3>

At this point the basic MVP was achieved, therefore I decided to start polishing as much as possible. I added in audio clips to play, a basic menu screen to, where the user would have to enter a username and press a button to start the game. However for most of this day I spent time on a free online photoshop and gif-maker cutting out images of the Doom Guy’s face looking forward, left and right to emulate the original game’s face. I then added in the faces at various stages of health percentages and then applied it to the functions in game, so that upon losing 25% health the face would change to the next stage by removing the old class and adding in a new class of the new gif.

```
//Alien Bomb Function
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
```

This resulted in the below which I was very happy with!

![DoomGuy-Face](https://user-images.githubusercontent.com/77836499/117695676-631ee500-b1b8-11eb-84fb-528966ced1df.gif)


<h3>Day 6</h3>

A lot of this day was spent fixing bugs and polishing the game. I fixed a few issues such as the alien bombs continuing to fire once the game ended by adding in clearInterval to the alien bomb functions. I also added in a setTimeout to the player shoot function so they couldn’t fire non-stop shown below:

```
let canShoot = true

    function fireMissile(event) {

      if (!canShoot) return
      canShoot = false
      setTimeout(() => {
        canShoot = true
      }, 600)
```

After this I polished a few colours, background images, as well as adding in a loading bar, which would load in three different parts of varying speeds, as loading bars stereotypically start quick and end up pausing at 98% or 99% and I intended to mimic this!


<h3>Day 7 and 8</h3>

For the last day and a half, I decided not to add any more core functionality to the game, as I was conscious of the time and didn’t want to break anything. Therefore I decided to focus on adding more finishing touches and tweaks to polish the final product. 
Beyond tweaking volumes, background images and fonts, the main thing I decided to include was a windows-esque start screen that the user starts on, needing to double click the game icon to start the game. This was a post-MVP enhancement that I wanted to include as it would make the user feel like they were actually at their computer, rather than just a run of the mill online flash game.

To achieve this I originally planned to use images found online, but found when taking the resolution into account it would be easier to create screenshots of my own desktop and import them into the application. I then created invisible boxes around the icons, which upon being clicked once would show a faint outline and when double-clicked would have a response. These all resulted in tongue-in-cheek window prompts, apart from the Doom one, which pushed the user into a loading screen and then the game.


<h3>Styling:</h3>

I quickly decided to use the theme of the original Doom for my game. I thought as I was creating a retro game, it should have a retro theme to go with it. After some searching around I found quite a lot of sprite models, audio clips and artwork that I could include to make the game more animated to enhance the user experience. I also wanted to include a load screen, as I felt this went hand in hand with games (particularly old ones) and therefore included a start screen to add in a bit more user interaction.


<h3>Challenges</h3>

* Managing to keep the aliens in formation and snaking alternately down.

* Collision detection for aliens and player missiles causing the alien to disappear.


<h3>Wins</h3>

* Felt far more comfortable with JS having had time to play around with problems and potential solutions

* Pleased with how the art style came out considering this was one of my main concerns previous to starting the project


<h3>Future Enhancements</h3>

* Play again option on end
* Multiple Levels
* Scaling difficulty on levels
* Leaderboard displaying username and score using local storage


<h3>Key Learnings</h3>

* Javascript - Previous to this project I didn't have much confidence in JS abilities. However throughout the project I came up against problems (and bugs) that I didn’t plan for, but managed to think through and come up with solutions for.

* Refactoring code - I realised that although I could read my own code, it quickly became very long and potentially hard to read to someone else. Sections of code  could’ve been shortened down at parts had I had more time or refactored in a more readable way.
