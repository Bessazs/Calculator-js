const previousOperationText = document.querySelector(".previous-operations");
const currentOperationText = document.querySelector(".current-operations");
const buttons = document.querySelectorAll(".buttons-container button");


class Calculator{
    constructor(previousOperationText,currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';
    }
    //mostra os digitos na tela da calculadora
    addDigit(digit){
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen();
    }

    // processa as operações da calculadora
    processOperation(operation){
    // checar se o valor atual está vazio
    if (this.currentOperationText.innerText === "" && operation !== 'C'){
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation);
        }
        return;
    }
    //obter valor previo e atual
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;
    
        switch (operation) {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue ,operation ,current ,previous);
                break;
            case '-':
                operationValue = previous - current;
                this.updateScreen(operationValue ,operation ,current ,previous);
                break;
            case '/':
                operationValue = previous / current;
                this.updateScreen(operationValue ,operation ,current ,previous);
                break;
            case '*':
                operationValue = previous * current;
                this.updateScreen(operationValue ,operation ,current ,previous);
                break;
            case 'DEL':
                this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
                break;
            case 'C':
                this.currentOperationText.innerText = "";
                this.previousOperationText.innerText = "";
                break;
            case 'CE':
                this.currentOperationText.innerText = "";
            break;
            case '=':
                this.processEqualOperator();
            break;
                    
            default:
                return;
        }
    }

    // altera os valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null){

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;    
        }else{
            if (previous === 0) {
                operationValue = current;
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";

        }

    }

    changeOperation(operation){
        const mathOperation = ['+','-','*','/'];

        if (!mathOperation.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }




    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation); 
    }
}



const calc = new Calculator(previousOperationText,currentOperationText)

buttons.forEach(btn => {
    btn.addEventListener("click", (e) =>{
       const value = e.target.innerText;

        //verificar se é numero ou operação
        if(+value >=0 || value === "."){
            calc.addDigit(value);
        }else{
            calc.processOperation(value);
        }
    })
});