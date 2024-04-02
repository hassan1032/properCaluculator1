// Initialize variables
var inputField = document.getElementById("result");
var expression = [];
var operators = ["+", "-", "*", "/", "%"];
var decimalPressed = false;
var result = 0;
var currentNum = 0;

// function evaluateExpression(expression) {
//   let result = expression[0];
//   for (var j = 1; j < expression.length; j += 2) {
//     let num = expression[j + 1];
//     let op = expression[j];
//     switch (op) {
//       case "+":
//         result += num;
//         break;
//       case "-":
//         result -= num;
//         break;
//       case "*":
//         result *= num;
//         break;
//       case "/":
//         if (num !== 0) {
//           result /= num;
//         } else {
//           return "Error: Division by zero";
//         }
//         break;
//       case "%":
//         result %= num;
//         break;
//       default:
//         break;
//     }
//   }
//   return result;
// }

function evaluateExpression(expression) {
    let operators = ['*', '/', '%', '+', '-'];
    // First, handle multiplication (*), division (/), and modulo (%) operations
    for (let i = 0; i < 3; i++) {
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
                    default:
                        break;
                }
                // Replace the operands and operator with the result
                expression.splice(j - 1, 3, result);
                j -= 2; // Adjust index after removing elements
            }
        }
    }
    // Then, handle addition (+) and subtraction (-) operations
    for (let i = 3; i < operators.length; i++) {
        for (let j = 1; j < expression.length; j += 2) {
            if (expression[j] === operators[i]) {
                let leftOperand = expression[j - 1];
                let rightOperand = expression[j + 1];
                let result;
                switch (expression[j]) {
                    case '+':
                        result = leftOperand + rightOperand;
                        break;
                    case '-':
                        result = leftOperand - rightOperand;
                        break;
                    default:
                        break;
                }
                // Replace the operands and operator with the result
                expression.splice(j - 1, 3, result);
                j -= 2; // Adjust index after removing elements
            }
        }
    }
    return expression[0];
}


// Event listeners for button clicks
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

    // Handle operator keys
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
          if (currentNum) expression.push(parseFloat(currentNum));
          expression.push(value);
          inputField.innerHTML += value;
        }
        currentNum = 0;
        decimalPressed = false;
      }
    }

    // Handle equal key
    else if (value === "=") {
      if (currentNum) {
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
        expression = [result]; // Reset expression with result

        decimalPressed = true; // Assume result is a whole number
      }
    }

    // Handle backspace key
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
