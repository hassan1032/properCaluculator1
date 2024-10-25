var inputField = document.getElementById("result");
var expression = [];
var operators = ["+", "-", "*", "/", "%"];
var decimalPressed = false;
var result = 0;
var currentNum = 0;

function evaluateExpression(expression) {
    let operators = ['*', '/', '%', '+', '-'];

    for (let i = 0; i < operators.length; i++) {
        for (let j = 1; j < expression.length; j += 2) {
            if (expression[j] === operators[i]) {
                let leftOperand = expression[j - 1];
                let rightOperand = expression[j + 1];
                let result;
                switch (expression[j]) {
                    case '*':
                        result = leftOperand * rightOperand;
                        break;
                    case '/':
                        if (rightOperand !== 0) {
                            result = leftOperand / rightOperand;
                        } else {
                            return "Error: Division by zero";
                        }
                        break;
                    case '%':
                        result = leftOperand % rightOperand;
                        break;
                    case '+':
                        result = leftOperand + rightOperand;
                        break;
                    case '-':
                        result = leftOperand - rightOperand;
                        break;
                    default:
                        break;
                }
                
                expression.splice(j - 1, 3, result);
                j -= 2; 
            }
        }
    }
    
    return expression[0];
}

document.body.addEventListener("click", function (event) {
    var target = event.target;
    var value = target.textContent;

    if (target.tagName === "BUTTON") {
        // Handle number keys
        if (!isNaN(parseFloat(value)) || value === ".") {
            if (value === ".") {
                if (!decimalPressed) {
                    inputField.innerHTML += value;
                    decimalPressed = true;
                }
            } else {
                if (inputField.innerHTML === "0") inputField.innerHTML = value;
                else inputField.innerHTML += value;
            }
            currentNum += value;
        }

        else if (operators.includes(value)) {
            if (inputField.innerHTML !== "") {
                if (
                    operators.includes(expression[expression.length - 1]) &&
                    currentNum === 0
                ) {
                    expression.pop();
                    expression.push(value);
                    inputField.innerHTML = expression.join("");
                } else {
                    if (currentNum || currentNum === 0) expression.push(parseFloat(currentNum));
                    expression.push(value);
                    inputField.innerHTML += value;
                }
                currentNum = 0;
                decimalPressed = false;
            }
        }

        // Handling negative numbers
        else if (value === "-") {
            if (
                inputField.innerHTML === "" ||
                operators.includes(inputField.innerHTML.slice(-1)) ||
                inputField.innerHTML.slice(-1) === "-" ||
                inputField.innerHTML.slice(-1) === "E" 
            ) {
                inputField.innerHTML += value;
                currentNum += value;
            } else {
                if (currentNum || currentNum === 0) expression.push(parseFloat(currentNum));
                expression.push(value);
                inputField.innerHTML += value;
                currentNum = 0;
            }
        }

        else if (value === "=") {
            if (currentNum || currentNum === 0) {
                expression.push(parseFloat(currentNum));
            }
            currentNum = 0;
            if (expression.length === 0) {
                result = 0;
            } else if (expression.length === 1) {
                result = expression[0];
            } else {
                result = evaluateExpression(expression);
            }
            if (isNaN(result)) {
                inputField.innerHTML = "Error";
            } else {
                inputField.innerHTML = result;
                expression = [result]; 
                decimalPressed = true; 
            }
        }

        else if (value === "Backspace") {
            inputField.innerHTML = inputField.innerHTML.slice(0, -1);
            if (inputField.innerHTML.length === 0) {
                decimalPressed = false;
                expression = [];
                result = 0;
            }
        } else if (value === "AC") {
            decimalPressed = false;
            expression = [];
            result = 0;
            inputField.innerHTML = "0";
            currentNum = 0;
        }
    }
});


