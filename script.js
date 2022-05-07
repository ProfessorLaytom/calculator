let keyHistory = [0, 0, 0] 
/// keyHistory: first number - operation - second number, all
/// strings except when no values are entered
let isResultDisplayed = false
// isResultDisplayed in order to know if we append new number
// pressed or just delete it.
let justChangedSign = false;
/// to keep track of sign changes for the del button

function adjustToLength(a){
    //returns scientific form if too many digits
    return `${a}`.length > 11 ? a.toExponential(3) : a
}

//some basic operation functions, and the updates for the keyHistory

function add(T){
    let [a, b] = [T[0], T[2]]
    T[0] = `${+a + +b}`
    T[1] = 0
    T[2] = 0
    return adjustToLength(+T[0])
}

function subtract(T){
    let [a, b] = [T[0], T[2]]
    T[0] = `${+a - +b}`
    T[1] = 0
    T[2] = 0
    return adjustToLength(+T[0])
}

function multiply(T){
    let [a, b] = [T[0], T[2]]
    T[0] = `${+a * +b}`
    T[1] = 0
    T[2] = 0
    return adjustToLength(+T[0])
}

function divide(T){
    let [a, b] = [T[0], T[2]]
    if (b == 0){
        return 'Nice try'
    } else {
        T[0] = `${(+a / +b)}`
        T[1] = 0
        T[2] = 0
        return adjustToLength(+T[0])
    }
}

function changeSign(T){
    // changes the sign according to which is the last pushed
    // button
    
    let [a, b, c] = [T[0], T[1], T[2]]
    if (b === 0) {
        T[0] = `${- +a}`
        return adjustToLength(+T[0])
    } else {
        if (c === 0){
            T[2] = '-'
            return adjustToLength(T[2])
        } else {

        }
    }
}

function operate(T){
    //checks if an operation is waiting and resolves it, and equals gives the first number inputted
    if (T[1] == 0){ 
        return T[0]
    }else {
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
}

function handleDot(T){
    //handles the floating numbers, adds only one dot per number
    const display = document.querySelector('.display')
    if (T[1] == 0 && !`${T[0]}`.includes('.')){
        T[0] = T[0] + '.'
        display.textContent = T[0]

    } else if (T[1] != 0 && !`${T[2]}`.includes('.')) {
        T[2] = T[2] + '.'
        display.textContent = T[2]
    }
}

function handleDel(T){
    //handles the del button, basically removes the last digit/operator
    const display = document.querySelector('.display')
    if (T[1] == 0){
        if (T[0].length>1){
            T[0] = T[0].slice(0,-1)
        } else {T[0] = 0}
        display.textContent = T[0]
    } else {
        if (T[2] == 0){
            T[1] = 0;
            display.textContent = T[0]
        }
        else {
            if (T[2].length > 1){
                T[2] = T[2].slice(0,-1)
                display.textContent = T[2]
            } else {
                T[2] = 0
                display.textContent = T[1]
            }
            
        }
    }
}

function updateDisplay(e){
    const display = document.querySelector('.display')
    const pressed = e.target.textContent
    pressed == 'del' ? justChangedSign = false : null
    // console.log(pressed, displayValue)
    if (pressed != '.'){
        //is the value AFTER updating the display
        //we do not show the point unless said so by the handlePoint
        //function, we do not update the numbers above 10 digits
        if (keyHistory[1] === 0 && `${keyHistory[0]}`.length < 10){
            display.textContent = pressed 
        }
        if (keyHistory[1] !== 0 && `${keyHistory[2]}`.length < 10){
            display.textContent = pressed 
        }
        if (isNaN(pressed)){
            display.textContent = pressed 
        }            
        
    }
    
    if (isNaN(pressed)){ //if pressed is not a number
        if (pressed === '='){
            display.textContent = operate(keyHistory)
            return;
        }
        if (pressed == 'AC'){
            keyHistory = [0,0,0];
            isResultDisplayed = false;
            display.textContent = 0;
            return
        }
        if (pressed == '+/-'){
            display.textContent = changeSign(keyHistory)
            isResultDisplayed = false;
        }
        if (pressed == '.'){
            handleDot(keyHistory)
            isResultDisplayed = false;
            return;
        }
        if (pressed == 'del'){
            handleDel(keyHistory);
            return;
        }
        [a, b, c] = keyHistory.map(x => typeof(x));
        if (a == 'string' && b == 'string' && c == 'string' && keyHistory[2] != '-'){ //for chaining operation, 
            //gives the result and the next operation in small.
            //excludes the case when changing signs because a '-'
            //string is attached in this case in keyHistory[2]
            if (pressed != '+/-'){
                display.textContent = operate(keyHistory);
                isResultDisplayed = false;
                keyHistory[1] = pressed;
                const p = document.createElement('p');
                p.textContent = pressed
                p.style.fontSize = '20px'
                display.appendChild(p)
                return
            } else { //case when we change the sign of the result
                display.textContent = -operate(keyHistory);
                return
            }
        } else if (pressed != 'AC' && pressed != '+/-'){
            keyHistory[1] = pressed
            isResultDisplayed = false;
            return;
        }
    }  else { //if we press a number
        const displayText = display.textContent.trim()
        const displayValue = +displayText;
        if (isResultDisplayed){ //replaces the result by the new input number
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
        } else if (keyHistory[1] === 0 && !isResultDisplayed && keyHistory[0].length < 10){ //gives us multi-decimal numbers for the first number
            keyHistory[0] += pressed
            display.textContent = keyHistory[0]
            isResultDisplayed = false
            return;
        } else if (typeof(keyHistory[1]) == 'string'){
            if (keyHistory[2] === 0){ //updates second number
                keyHistory[2] = pressed
                return;
            } else if (!isResultDisplayed && keyHistory[2].length < 10){ //gives multi-decimal if last result is not displayed
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