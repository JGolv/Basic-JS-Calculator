class Calculator {
    constructor(prevOperandTextElem, currOperandTextElem) {
        this.prevOperandTextElem = prevOperandTextElem
        this.currOperandTextElem = currOperandTextElem
        this.clear()
    }

    //Clears the calculator fields and the operator of the last calculation
    clear() {
        this.currOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    //Deletes last character input
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    //Concatenation of the current operand
    appendNumber(num) {
        if(this.currOperand.includes('.') && num === '.') return
        this.currOperand = this.currOperand.toString() + num.toString()
    }

    //Processes the operation being made and puts the first value in the previous value field
    chooseOperation(operation) {
        if(this.currOperand === '') return
        if(this.prevOperand !== '') {
            this.processValue()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    //Picks the corresponding operation and puts the result in the previous value field
    processValue() {
        let processing
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if(isNaN(prev) || isNaN(curr)) return

        switch (this.operation) {
            case '+':
              processing = prev + curr
              break
            case '-':
              processing = prev - curr
              break
            case '*':
              processing = prev * curr
              break
            case '÷':
              processing = prev / curr
              break
            default:
              return
          }
          this.currOperand = processing
          this.operation = undefined
          this.prevOperand = ''
    }

    /* This method parses the values before and after the decimal point according to a certain
    locale string (in our case it is ES) */
    getDisplayNumber(num) {
        const stringNumber = num.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('ES', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    //Updates both fields in the screen depending on the values and the operations
    updateScreen() {
        this.currOperandTextElem.innerText = this.getDisplayNumber(this.currOperand)
        if(this.operation != null) {
            this.prevOperandTextElem.innerText = 
            `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandTextElem.innerText = ''
        }
    }
}

//Created variables for data attributes so we can get the data from an item
const numberBtns = document.querySelectorAll('[data-num]')
const operationBtns = document.querySelectorAll('[data-fn]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-del]')
const allClearButton = document.querySelector('[data-ac]')
const prevOperandTextElem = document.querySelector('[data-prev]')
const currOperandTextElem = document.querySelector('[data-curr]')

const calculator = new Calculator(prevOperandTextElem,currOperandTextElem)

/* These foreach loops allow us to bind the different data attributes in the HTML with the 
variables in the script, making it easier to process the different events */

//This binds the html numbers with its value
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateScreen();
    })
})

//This binds the html operation buttons with specific operations such as adding or substracting
operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateScreen();
    })
})

//This binds the equal button with the script to process the result and show it
equalsBtn.addEventListener('click', button => {
    calculator.processValue()
    calculator.updateScreen();
})


//This binds the AC button to clear the memory of the calculator
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateScreen();
})

//This binds the DEL button to delete the last character of the current number
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateScreen();
})