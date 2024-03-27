export default class GamePlay {
    constructor() {
        this.boardSize = 4;
        this.container = null;
        this.boardEl = null;
        this.cells = [];
    }

    bindToDOM(container) {
        if (!(container instanceof HTMLElement)) {
        throw new Error('container is not HTMLElement');
        }
        this.container = container;
    }

    drawUi() {
        if (this.cells.length > 0) {
            this.container.removeChild(this.container.querySelector('.board-container'));
        }

        const boardContainer = document.createElement('div');
        boardContainer.classList.add('board-container');
        this.container.appendChild(boardContainer);

        const board = document.createElement('div');
        board.classList.add('board');
        boardContainer.appendChild(board);

        this.boardEl = this.container.querySelector('.board');
    
        for (let i = 0; i < this.boardSize ** 2; i += 1) {
          const cellEl = document.createElement('div');
          cellEl.classList.add('cell');
          this.boardEl.appendChild(cellEl);
        }
    
        this.cells = Array.from(this.boardEl.children);
    }

    hideCharacter() {
        let char = document.querySelector('.character');
        if (char) {
            char.remove();
            
        }
    }

    showCharacter(position) {
        const cellEl = this.boardEl.children[position];
        const charEl = document.createElement('div');
        charEl.classList.add('character');

        cellEl.appendChild(charEl);
    }
}