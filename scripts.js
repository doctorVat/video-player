//get element
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//functions
function tooglePlay(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}



function updateButton(){
    // console.log('fififi');
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}


function skip(){
    // console.log(this.dataset.skip); //получаем dataset (-10 или 25)
    video.currentTime += parseFloat(this.dataset.skip);//парсим в цифры потому что это строка первоначально
}
function handleRangeUpdate(){
    video[this.name]=this.value    //playbackRate - скорость воспроизведения. volume- громкость
}
function handleProgress(){  //ползунок прогресс-бара движется 
    const percent = (video.currentTime / video.duration)*100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){ //тыкаем на прогресс бар
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime;
    
}

//hook up the event listeners
video.addEventListener('click', tooglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) =>  mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

toggle.addEventListener('click', tooglePlay)
skipButtons.forEach(button=> button.addEventListener('click', skip))
ranges.forEach(range=> range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range=> range.addEventListener('mousemove', handleRangeUpdate))//чтобы когда перетаскивали ползунок тоже менялся range

//modification (fullscreen mode) by Greg:
function fullScreen(){
        this.requestFullscreen()
}

player.addEventListener('dblclick', fullScreen)
