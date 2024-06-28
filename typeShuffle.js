import Splitting from 'splitting';
import { randomNumber } from './utils';

class TypeShuffle {
    constructor(DOM_el) {
        this.DOM = { el: DOM_el };
        this.lines = [];
        this.lettersAndSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>,0123456789'.split('');
        this.effects = {
            'fx1': () => this.fx1()
        };
        this.totalChars = 0;
        this.init();
    }
    
    init() {
        const results = Splitting({ target: this.DOM.el, by: 'lines' });
        results.forEach(s => Splitting({ target: s.words }));
        results[0].lines.forEach((lineArr, linePosition) => {
            const line = { position: linePosition, cells: [] };
            let charCount = 0;
            lineArr.forEach(word => {
                [...word.querySelectorAll('.char')].forEach(char => {
                    line.cells.push({ 
                        DOM: { el: char }, 
                        position: charCount, 
                        previousCellPosition: charCount === 0 ? -1 : charCount - 1,
                        original: char.innerHTML, 
                        state: char.innerHTML, 
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text'),
                        originalColor: getComputedStyle(document.documentElement).getPropertyValue('--color-text')
                    });
                    charCount++;
                });
            });
            this.lines.push(line);
            this.totalChars += charCount;
        });
    }
    
    clearCells() {
        this.lines.forEach(line => line.cells.forEach(cell => cell.state = '&nbsp;'));
    }
    
    getRandomChar() {
        return this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)];
    }
    
    fx1() {
        const MAX_CELL_ITERATIONS = 45;
        let finished = 0;
        this.clearCells();
        const loop = (line, cell, iteration = 0) => {
            cell.cache = cell.state;
            if (iteration === MAX_CELL_ITERATIONS - 1) {
                cell.state = cell.original;
                finished++;
                if (finished === this.totalChars) this.isAnimating = false;
            } else if (cell.position === 0) {
                cell.state = iteration < 9 ? ['*', '-', '\u0027', '\u0022'][Math.floor(Math.random() * 4)] : this.getRandomChar();
            } else {
                cell.state = line.cells[cell.previousCellPosition].cache;
            }
            if (cell.cache !== '&nbsp;') iteration++;
            if (iteration < MAX_CELL_ITERATIONS) setTimeout(() => loop(line, cell, iteration), 15);
        };
        this.lines.forEach((line, lineIndex) => {
            line.cells.forEach(cell => setTimeout(() => loop(line, cell), (lineIndex + 1) * 200));
        });
    }
    
    trigger(effect = 'fx1') {
        if (!(effect in this.effects) || this.isAnimating) return;
        this.isAnimating = true;
        this.effects[effect]();
    }
}

export { TypeShuffle };
