// Caclulator Project Javascript file 

(function () {
    "use strict";

   
    // Get the elements
    var el = function (element) {
        // if (element.charAt(0) === "#") { // If passed in ID, then...
        //     return document.querySelector(element); // Return the single element
        // }

        return document.querySelectorAll(element); //Else, returns the nodelist
    };

    //creating the required variables
    var display = el(".display")[0];  // screen
    var equals = el(".equal")[0];  // equal
    var nums = el(".num");  // numbers
    var ops = el(".op");  // operators
    var theNum = "";  // stores the current number 
    var oldNum = "";  // stores the previous number to be calculated (before operator)
    var resultNum;  // stores the result after the operation has been performed
    var operator;  // stores the operator

    // Function to set the current number
    var setNum = function () {
        // A number can have '.' only once so, 
        if ((this.getAttribute("data-num") === "." && theNum.indexOf(".") === -1) || this.getAttribute("data-num") !== ".") {
            // So if '.' was pressed, it shoul not be already present or '.' is not pressed, then only..
            if (resultNum) { // If a result was displayed, reset number
                theNum = this.getAttribute("data-num");
                resultNum = "";
            } else { // Otherwise, add digit to previous number (this is a string!)
                theNum += this.getAttribute("data-num");
            }

            // theNum += this.getAttribute("data-num");

            display.innerHTML = theNum;  // Display current number
        }
    };

    // Setting the values if a number key is pressed.
    var setNumKey = function (keyPressed) {
        // Checking the condition that the number must contain '.' once
        if ((keyPressed === "." && theNum.indexOf(".") === -1) || keyPressed !== ".") {
            if (resultNum) {  // If result was displayed, reset it 
                theNum = keyPressed;
                resultNum = "";
            } else {  // Otherwise, add digit to previous number (this is a string!)
                theNum += keyPressed;
            }

            display.innerHTML = theNum;  // Display the current number
        }
    }

    // If operator is passed then, the number become oldNum and save the operator
    var moveNum = function () {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-op");

        equals.setAttribute("data-result", ""); //Reset the result in attribute
    };

    // If operator is passed then, the numbe become oldNum and save the operator
    var moveNumKey = function (operatorKey) {
        oldNum = theNum;
        theNum = "";
        operator = operatorKey;

        equals.setAttribute("data-result", ""); //Reset the result in attribute
    }

    // Equal is clicked
    var displayNum = function () {

        // Convert string input to numbers to do the operation 
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);

       
            // Perform the operations
            switch (operator) {
                case "+":  // Addition
                    resultNum = oldNum + theNum;
                    break;

                case "-":  // Division
                    resultNum = oldNum - theNum;
                    break;

                case "*":  // Multiplication
                    resultNum = oldNum * theNum;
                    break;

                case "/":  // Division
                    if (theNum === 0) {
                        resultNum = "Error: Division by zero";
                    } else {
                        resultNum = oldNum / theNum;
                    } 
                    break;

                case "%":  // Modulos
                    resultNum = oldNum % theNum;
                    break;

                case "x²":  // Square
                    resultNum = oldNum ** 2;
                    break;

                case "sin":  // sin trigonometry function
                    var radians = oldNum * (Math.PI / 180); // Conversion of degrees to radians
                    resultNum = Math.sin(radians);
                    break;

                case "cos":  // cos trigonometry function
                    var radians = oldNum * (Math.PI / 180);  // Conversion of degrees to radians
                    resultNum = Math.cos(radians);
                    break;

                case "tan":  // tan trigonometry funtion
                    var radians = oldNum * (Math.PI / 180);  // Conversion of degrees to radians
                    resultNum = Math.tan(radians);
                    break;

                default:  // Equal clicked without passong any operator
                    resultNum = theNum;

            
        }


        if (!isFinite(resultNum)) {
            resultNum = "Error";
           clearAll();
           
          }

        // Display the results
        display.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Reset oldNum and keep result
        oldNum = "";
        theNum = resultNum;
    };

    // Function for clear button, reset everything 
    var clearAll = function () {
        oldNum = "";
        theNum = "";
        display.innerHTML = "0";
        equals.setAttribute("data-result", resultNum)
    };

    // Function for delete operator, delete the last entered number
    var del = function () {
        if (theNum.length > 0) {  
            theNum = theNum.slice(0, -1); // Remove the last character from theNum
            display.innerHTML = theNum; // Update the display
        }
    };

    // Send the operator to relevant function
    var findKey = function (e) {

        // Check if entered number key is valid
        if ((e.key >= 0 && e.key <= 9) || e.key == ".") {
            setNumKey(e.key);
        }

        // Operator keys
        switch (e.key) {
            case "+":
                moveNumKey("+");
                break;

            case "-":
                moveNumKey("-");
                break;

            case "*":
                moveNumKey("*");
                break;

            case "/":
                moveNumKey("/");
                break;

            case "%":
                moveNumKey("%");
                break;    

            case "=":
            case "Enter":
                displayNum();
                break;

            case "Escape":
            case "c":
            case "C":
                clearAll();
                break;

            case "Backspace":
                del();
                break;

            // if another key is pressed then do nothing
            default:
                break;
        }
    };

    // Animation when a button a clicked
    var animatePress = function(){ 
        this.classList.add("pressed"); // Add 'pressed' class (present in css)
        var that = this; // Save the context
        setTimeout(function() {
            that.classList.remove("pressed"); // Remove 'pressed' class
        }, 100); // 100ms delay
    }

    /* Click events */

    // Add event listeners to all number buttons
    nums.forEach(button => {
        button.addEventListener('click', animatePress);
        button.addEventListener('click', setNum); 
    });

    // Add event listeners to all operation buttons
    ops.forEach(button => {
        button.addEventListener('click', animatePress);
        button.addEventListener('click', moveNum);
    });

    //Add keyboard event to use numbers and basic operators
    document.onkeyup = findKey;

    // Add click event to equal sign
    equals.addEventListener('click', displayNum);
    equals.addEventListener('click', animatePress);


    // Add click event to clear button
    el(".clear")[0].addEventListener('click', clearAll);
    el(".clear")[0].addEventListener('click', animatePress);


    // Add click event to delete button
    el(".del")[0].addEventListener('click', del);
    el(".del")[0].addEventListener('click', animatePress);




})();