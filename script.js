let keyHistory = [0, 0, 0]
let isResultDisplayed = false

function operate(T){
    const toDo = T[1]
    if (toDo == '+'){
        let [a, b] = [T[0], T[2]]
        T[0] = `${+a + +b}`
        T[1] = 0
        T[2] = 0
        isResultDisplayed = true
        return +T[0]
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
        }
        else {
            keyHistory[1] = pressed
        }
    }  else { //if we chose a number
        if (displayValue === 0){
            keyHistory[0] = pressed
        } else if (keyHistory[0] === 0){
            if (keyHistory[1] === 0){ //updates the first number
                keyHistory[0] = pressed
                return;
            }
        } else if (keyHistory[1] == 0){ //gives us multi-decimal numbers for the first number
            keyHistory[0] += pressed
            display.textContent = keyHistory[0]
            return;
        } else if (typeof(keyHistory[1]) == 'string'){
            if (keyHistory[2] === 0){ //updates second number
                keyHistory[2] = pressed
                return;
            } else if (!isResultDisplayed){ //gives multi-decimal if last result is not displayed
                keyHistory[2] += pressed
                display.textContent = keyHistory[2]
            } else {

            }
        }
    }
    console.log(keyHistory)

}

const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.onselectstart = () => false)
buttons.forEach(button => button.addEventListener('click', updateDisplay));