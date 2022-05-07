let keyHistory = [0, 0, 0] 
/// keyHistory: first number - operation - second number, all
/// strings except when no values are entered
let isResultDisplayed = false

function add(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a + +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        return +T[0]
}

function subtract(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a - +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        return +T[0]
}

function multiply(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a * +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        return +T[0]
}

function divide(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a / +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        return +T[0]
}

function operate(T){
    isResultDisplayed = true
    const toDo = T[1]
    if (toDo == '+'){
        return add(T)
    }else if (toDo == '-'){
        return subtract(T)
    } else if (toDo == 'x'){
        return multiply(T)
    } else if (toDo == '/'){
        return divide(T)
    }
}

function updateDisplay(e){
    const display = document.querySelector('.display')
    const displayText = display.textContent.trim()
    const displayValue = +displayText; //is the value BEFORE updating it
    const pressed = e.target.textContent
    // console.log(pressed, displayValue)
    display.textContent = pressed //is the value AFTER updating the display
    if (isNaN(pressed)){ //if pressed is not a number
        if (pressed === '='){
            display.textContent = operate(keyHistory)
            return;
        }
        if (pressed == 'AC'){
            keyHistory = [0,0,0];
            isResultDisplayed = false;
            display.textContent = 0;
        }
        [a, b, c] = keyHistory.map(x => typeof(x));
        if (a == 'string' && b == 'string' && c == 'string'){ //for chaining operation, gives the result and the next operation in small
            display.textContent = operate(keyHistory);
            isResultDisplayed = false;
            keyHistory[1] = pressed;
            const p = document.createElement('p');
            p.textContent = pressed
            p.style.fontSize = '20px'
            display.appendChild(p)
            return
        } else if (pressed != 'AC'){
            keyHistory[1] = pressed
            isResultDisplayed = false;
            return;
        }
    }  else { //if we press a number
        if (displayValue === 0 || isResultDisplayed){ //
            keyHistory[0] = pressed
            isResultDisplayed = false
            return;
        } else if (keyHistory[0] === 0){
            if (keyHistory[1] === 0){ //updates the first number if no operation
                keyHistory[0] = pressed
                return;
            } else {
                keyHistory[2] = pressed;
                keyHistory[0] = `${keyHistory[0]}`
                return;
            }
        } else if (keyHistory[1] == 0 && !isResultDisplayed){ //gives us multi-decimal numbers for the first number
            keyHistory[0] += pressed
            display.textContent = keyHistory[0]
            isResultDisplayed = false
            return;
        } else if (typeof(keyHistory[1]) == 'string'){
            if (keyHistory[2] === 0){ //updates second number
                keyHistory[2] = pressed
                return;
            } else if (!isResultDisplayed){ //gives multi-decimal if last result is not displayed
                keyHistory[2] += pressed
                display.textContent = keyHistory[2]
                return;
            } else if (isResultDisplayed){ //removes the last result for the new value entered
                keyHistory[0] = pressed
                display.textContent = pressed
                return;
            }
        }
    }
    

}

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.onselectstart = () => false)
buttons.forEach(button => button.addEventListener('click', updateDisplay));