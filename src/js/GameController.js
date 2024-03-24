export default class GameController {
    constructor(gamePlay) {
        this.gamePlay = gamePlay;
    } 

    init() {
        this.gamePlay.drawUi();

        let onClick = false;
        let position;

        this.countSuccess = 0;                    // счетчик удачных попаданий   
        this.fail = 0;                            // счетчик промахов

        let countSuccessEl = document.querySelector(".status-wins");                         
        let countfailEl = document.querySelector(".status-lost");               

        document.addEventListener('click', (event) => {
            onClick = this.onCellClick(event);
        });

        const redrawInterval = setInterval(() => {
            if (!onClick) {
                this.fail++;
            }
            onClick = false;
            countSuccessEl.textContent = this.countSuccess;
            countfailEl.textContent = this.fail;
            
            if (this.fail === 6) {
                clearInterval(redrawInterval);
                alert("Вы проиграли");
                this.init();
            }
            console.log(this.countSuccess, this.fail);

            position = Math.floor(Math.random() * (this.gamePlay.boardSize) ** 2);
            this.gamePlay.redrawPosition(position);
        }, 1000);
    }

    onCellClick(e) {
        const target = e.target;
        
        if(target.classList.contains('character')) {
            this.countSuccess++;
            return true;
        }
    }
}