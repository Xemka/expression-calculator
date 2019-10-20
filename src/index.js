function eval(operation, b, a) {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0) {
                let myError = new Error("TypeError: Division by zero.");
                throw myError;

            }
            return a / b;
    }
    return 0;
}

function Priority(operation1, operation2) {
    if (operation2 == '(' || operation2 == ')')
        return false;
    if ((operation1 == '*' || operation1 == '/') && (operation2 == '+' || operation2 == '-'))
        return false;
    else
        return true;
}

function expressionCalculator(expr) {
    // write your solution here
    let token = expr.split('');
   
    let number = [];
    let flag = 0;
    let operation = [];

    for (let i = 0; i < token.length; i++) {
        if (token[i] === ' ') {
            continue;
        }
         
        if (token[i] >= '0' && token[i] <= '9') {
            let tempNum = '';
            
            while (i < token.length && token[i] >= '0' && token[i] <= '9')
                tempNum += (token[i++]);
            number.push(parseInt(tempNum.toString()));
        }

        if (token[i] == '(') {
           
            operation.push(token[i]);
            flag++;

        } else if (token[i] == ')') {
            if (flag == 0) {

                let myError = new Error("ExpressionError: Brackets must be paired");
                throw myError;
            }
            while (operation[operation.length - 1] != '(') {
                 
                number.push(eval(operation.pop(), number.pop(), number.pop()));
               
            }
            operation.pop();
            flag--;
        } else if (token[i] == '+' || token[i] == '-' || token[i] == '*' || token[i] == '/') {
             
            while (operation.length !== 0 && Priority(token[i], operation[operation.length - 1])) {

                number.push(eval(operation.pop(), number.pop(), number.pop()));
            }
            operation.push(token[i]);

        }
    }
    if (flag !== 0) {
        let myError = new Error("ExpressionError: Brackets must be paired");
        throw myError;
    }
    while (operation.length !== 0) {
        number.push(eval(operation.pop(), number.pop(), number.pop()));
    }
    return number.pop();
}

module.exports = {
    expressionCalculator
}