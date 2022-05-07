let keyHistory = [0, 0, 0]
let isResultDisplayed = false

function add(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a + +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        isResultDisplayed = true
        return +T[0]
}

function subtract(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a - +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        isResultDisplayed = true
        return +T[0]
}

function multiply(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a * +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        isResultDisplayed = true
        return +T[0]
}

function divide(T){
    let [a, b] = [T[0], T[2]]
        T[0] = `${Math.round((+a / +b)*10)/10}`
        T[1] = 0
        T[2] = 0
        isResultDisplayed = true
        return +T[0]
}

function operate(T){
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
    const displayValue = +displayText;
    const pressed = e.target.textContent
    display.textContent = pressed
    if (isNaN(pressed)){ //if pressed is not a number
        if (pressed === '='){
            display.textContent = operate(keyHistory)
            isResultDisplayed = false;
            return;
        }
        else {
            keyHistory[1] = pressed
            isResultDisplayed = false;
            return;
        }
    }  else { //if we chose a number
        if (displayValue === 0 || isResultDisplayed){
            keyHistory[0] = pressed
            isResultDisplayed = false
            return;
        } else if (keyHistory[0] === 0){
            if (keyHistory[1] === 0){ //updates the first number
                keyHistory[0] = pressed
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
            } else if (isResultDisplayed){
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