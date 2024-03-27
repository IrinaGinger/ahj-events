export default class GameController {
    constructor(gamePlay) {
        this.gamePlay = gamePlay;
        this.timerId = "";
    } 

    init() {
        this.onClick = false;
        this.gamePlay.drawUi();

        if (this.timerId !== "") {
            clearTimeout(this.timerId);
            this.timerId = "";
        }

        this.countSuccess = document.querySelector('.status-wins');        // счетчик удачных попаданий                     
        this.countfail = document.querySelector('.status-lost');           // счетчик промахов  
        this.countSuccess.textContent = 0;
        this.countfail.textContent = 0;

        document.addEventListener('click', (event) => {
            this.onClick = this.onCellClick(event);
        });

        this.next();
    }
    
    onCellClick(e) {
        const target = e.target;
        
        if(target.classList.contains('character')) {
            e.stopImmediatePropagation();

            this.countSuccess.textContent++;
            this.gamePlay.hideCharacter();
            clearTimeout(this.timerId);
            this.next();
            return true;
        }
    }

    next() {
        let newPosition;

        this.timerId = setTimeout(() => {            
            if (Number(this.countfail.textContent) === 5) {
                alert("Вы проиграли");
                this.init();
            }
            
            this.gamePlay.hideCharacter();
            newPosition = Math.floor(Math.random() * (this.gamePlay.boardSize) ** 2);
            this.gamePlay.showCharacter(newPosition);
            
            if (!this.onClick) {
                this.countfail.textContent++;
            }
            this.onClick = false;
            
            clearTimeout(this.timerId);
            this.next();
        }, 1000);
    }


}