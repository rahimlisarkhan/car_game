
class GameDomComponent {
    _carContent = document.querySelector('#carContent')
    _welcomeArea = document.querySelector('#welcomeArea')
    _playStationArea = document.querySelector('#playStationArea')
    _speedContent = document.querySelector('.speed-content')
    _pointContent = document.querySelector('.point-content')
    _gameBackgroundImg = document.querySelector('#gameBackgroundImg')
    _gameCtrl = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 's']
    
     carDirectionRight = () =>{
        this._carContent.style.bottom = "15%"
    }

     carDirectionLeft = () =>{
        this._carContent.style.bottom = "5%"
    }
}

class CarGame extends GameDomComponent {
     #carSpeed = 0
     #carPoint = 0
     #carSpeedPos = 0
     #userControll = null
     #userPointInterval = null

     constructor(){
         super()
     }

    #carStart = () =>{
        if (!this.#userPointInterval){
            this.#earnPoints()
        }
            this.#carSpeedPos += 5
            this.#carSpeed += this.#carSpeed >= 180 ? 0 : 20
    
            this._carContent.style.right = `${ this.#carSpeedPos >= 40 ?  this.#carSpeedPos = 40 : this.#carSpeedPos }%`
            this._speedContent.innerHTML = `${this.#carSpeed}km/h`
            this._pointContent.innerHTML = `${this.#carPoint} ★`

        if (this._gameBackgroundImg.getAttribute('src') !== "./assent/img/highway.gif"){
            this._gameBackgroundImg.src = "./assent/img/highway.gif"
        }   
    }

    #carBreak = () => {
            this.#carSpeedPos -= 5
             this.#carSpeed -=  this.#carSpeed <= 0 ? 0 : 20
    
            this._carContent.style.right = `${this.#carSpeedPos <= 0 ? this.#carSpeedPos = 0 :this.#carSpeedPos }%`
            this._speedContent.innerHTML = `${this.#carSpeed}km/h`

            clearInterval(this.#userPointInterval);
            this.#userPointInterval = null

            if(!this.#carSpeed){
                this.#carStop()
            }
    }

    #carStop = () => {
            this.#carSpeedPos = 2
            this.#carSpeed = 0
            this._carContent.style.right = `${this.#carSpeedPos}%`
            this._gameBackgroundImg.src = "./assent/img/highway_s.gif"
    }

    #earnPoints = () => {
      this.#userPointInterval =  setInterval(() => {
            this.#carPoint++
            this._pointContent.innerHTML = `${this.#carPoint} ★`
        }, 1000)
    }

    carControll = () => {
        switch(this.#userControll){
            case'arrowup':
                this.carDirectionRight()
                break;
            case'arrowdown':
                this.carDirectionLeft()
                break;
            case 'arrowleft':
                this.#carStart()
                break;
            case 'arrowright':
                this.#carBreak()
                break;
            case 's':
                this.#carStop()
                break;
        }
    
    }

    startGame = () => {
        this._welcomeArea.classList.toggle('d-none')
        this._playStationArea.classList.toggle('d-none')
    }

    appRun = (e) => {
    if (this._gameCtrl.indexOf(e.key.toLowerCase()) === -1) {
        return
    }

    this.#userControll = e.key.toLowerCase()

    this.carControll()
    }
}

let carGameHighway = new CarGame()

document.querySelector('#startBtn').addEventListener('click',() => carGameHighway.startGame())
window.onkeydown = carGameHighway.appRun

