const soundButtons = document.querySelectorAll('.sounds button')
const forestAudio = new Audio('./audios/Floresta.wav')
const rainAudio = new Audio("./audios/Chuva.wav")
const coffeeAudio = new Audio("./audios/Cafeteria.wav")
const fireplaceAudio = new Audio("./audios/Lareira.wav")
const playButton = document.querySelector('.play')
const stopButton = document.querySelector('.stop')
const addButton = document.querySelector('.add')
const removeButton = document.querySelector('.remove')
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const lighIcon = document.querySelector('.light-icon')
const darkIcon = document.querySelector('.dark-icon')
const body = document.querySelector('body')
const controls = document.querySelector('.controls')
const timeH = document.querySelector('.time')
const soundsIcons = document.querySelector('.sounds')
forestAudio.loop = true
rainAudio.loop = true
fireplaceAudio.loop = true
coffeeAudio.loop = true

//seletor dos botões de áudio
for(let i = 0; i < soundButtons.length; i++){
  soundButtons[i].addEventListener('click', function (){
    const isActive = this.classList.contains('active');
    for(let j = 0; j < soundButtons.length; j++){
      soundButtons[j].classList.remove('active');
    }
    if (!isActive) {
      this.classList.add('active');
      if(i == 0){
        forestAudio.play();
        rainAudio.pause();
        coffeeAudio.pause();
        fireplaceAudio.pause();
      } else if(i == 1){
        rainAudio.play();
        forestAudio.pause();
        coffeeAudio.pause();
        fireplaceAudio.pause();
      } else if(i == 2){
        coffeeAudio.play();
        rainAudio.pause();
        forestAudio.pause();
        fireplaceAudio.pause();
      } else if(i == 3){
        fireplaceAudio.play();
        rainAudio.pause();
        coffeeAudio.pause();
        forestAudio.pause();
      }
    }else{
      coffeeAudio.pause();
      rainAudio.pause();
      forestAudio.pause();
      fireplaceAudio.pause()
    }
  });
}


//timer
playButton.addEventListener('click', countdown)
playButton.addEventListener('click', function(){this.disabled = true})
stopButton.addEventListener('click', reset)
stopButton.addEventListener('click', function(){playButton.disabled = false})
addButton.addEventListener('click', addMinutes)
removeButton.addEventListener('click', removeMinutes)


let timerTimeOut
let minutes = Number(minutesDisplay.textContent)
let seconds = Number(secondsDisplay.textContent)

function updateDisplay(newMinutes, seconds) {
  newMinutes = newMinutes === undefined ? minutes : newMinutes
  seconds = seconds === undefined ? 0 : seconds
  minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
  secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function reset() {
  updateDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
  timeLeft = undefined
}

function countdown(){
  timerTimeOut = setTimeout(function() {
    let seconds =  Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)
    let isFinished = minutes <= 0 && seconds == 0

    updateDisplay(minutes, 0)

    if (isFinished) {
      reset()   
      updateDisplay()
      forestAudio.pause();
      rainAudio.pause();
      coffeeAudio.pause();
      fireplaceAudio.pause()
      for(let i=0; i < soundButtons.length; i++){
        soundButtons[i].classList.remove('active')
      }
      return
    }

    if( seconds <= 0 ) {
      seconds = 60
      --minutes
    }

    updateDisplay(minutes, String(seconds - 1))

    countdown()

  }, 1000)
}

function hold(){
  clearTimeout(timerTimeOut)
}

function addMinutes(){
  minutes += 5
  updateDisplay()
}

function removeMinutes(){
  if(minutes >=5){
    minutes -= 5
    updateDisplay(minutes, seconds)
  }else if(minutes < 5){
    updateDisplay(0,0)
  }
}
  
//slider
function mudarvolume(e, i){
  if(i == 'fireplace'){fireplaceAudio.volume = e.value/100}
  else if(i == 'rain'){rainAudio.volume = e.value/100}
  else if(i== 'coffee'){coffeeAudio.volume = e.value/100}
  else if(i == 'forest'){forestAudio.volume = e.value/100}
}

//darkmode
darkIcon.addEventListener('click', toggleDarkMode)
lighIcon.addEventListener('click', toggleDarkMode)

function toggleDarkMode(){
  darkIcon.classList.toggle('hide')
  lighIcon.classList.toggle('hide')
  body.classList.toggle('dark')
  controls.classList.toggle('dark')
  timeH.classList.toggle('dark')
  soundsIcons.classList.toggle('dark')
}