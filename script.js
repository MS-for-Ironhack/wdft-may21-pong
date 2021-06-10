let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"

// getting the paintbrush
let ctx = canvas.getContext('2d')

// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')
let gameOver = false;
let intervalId = null
let circleX = 100, circleY = 80, radius = 20
let incrX = 2, incrY = 2
let paddleX =200, paddleHeight = 20, paddleWidth = 150
let isLeft = false, isRight = false;
let score = 0;


let startAudio = new Audio('https://res.cloudinary.com/manishp/video/upload/v1623305320/Horizon_Zero_Dawn_OST_-_Years_Of_Training_badkhk.mp3')

let gameOverAudio = new Audio('https://res.cloudinary.com/manishp/video/upload/v1615874740/aom/home_bhfqfk.mp3')





function drawCircle(){
    ctx.beginPath()
    ctx.fillStyle = '#4af0bb'
    ctx.arc(circleX, circleY, radius, 0, 2*Math.PI)
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()
    ctx.fillStyle = '#adf538'
    ctx.fillRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.closePath()
}

function collision(){
    // right
    if (circleX + radius > canvas.width) {
        incrX = -incrX //making it negative
    }
    //botoom
    if (circleY + radius > canvas.height) {
        
        if ( circleX > paddleX && circleX < (paddleX + paddleWidth)  ) {
            incrY = -incrY 
            score++
        }
        else {
            gameOver = true
        }

       // incrY = -incrY // making it negative
    }
    //left
    if (circleX - radius < 0) {
        incrX = 2 // making it positive again
    }
    //top
    if(circleY - radius < 0) {
        incrY = 2 // making it positive again
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'white'
    ctx.font = '22px Verdana'
    ctx.fillText(`Score: ${score}`, 30, 30)
    
    //Draw circle
    drawCircle()
    circleX = circleX + incrX
    circleY = circleY + incrY

    if (isRight && paddleX + paddleWidth < canvas.width) {
        paddleX = paddleX + 10
    }
    if (isLeft && paddleX > 0) {
        paddleX = paddleX - 10
    }

    //DrawPaddle
    drawPaddle()

    //collision
    collision()

    if (gameOver) {
        cancelAnimationFrame( intervalId )
        canvas.style.display = 'none'
        restartBtn.style.display = 'block'
        startAudio.pause()
        gameOverAudio.play()
    }
    else {
        intervalId = requestAnimationFrame( animate  )
    }
}

function start(){
    canvas.style.display = 'block'
    restartBtn.style.display = 'none'
    startBtn.style.display = 'none'
    animate()
    startAudio.play()
}


//Everything begins here
window.addEventListener('load', () => {
    canvas.style.display = 'none'
    restartBtn.style.display = 'none'
    
    // just so that we can build the game faster
    // you wont do this in real games
    //start()

    document.addEventListener('keydown', (event) =>{
        if (event.code == 'ArrowRight') {
            isRight = true
            isLeft = false
        }
        if (event.code == 'ArrowLeft') {
            isRight = false
            isLeft = true
        }
    })

    document.addEventListener('keyup', () =>{
        isRight = false
        isLeft = false
    })

    startBtn.addEventListener('click', () => {
        start()
    })

    restartBtn.addEventListener('click', () => {
        // do something when the user clicks the restart button
        // reset the values in your game

        gameOver = false;
        circleX = 50;
        circleY = 50;
        score = 0
        start()
    })
})