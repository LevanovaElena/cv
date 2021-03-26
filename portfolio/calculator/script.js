//class Calculator
class Calculator {
    /* Свойства класса:
        previousOperandTextElement - для вывода на экран верхней строки
        currentOperandTextElement - для вывода на экран нижней строки
        readyToReset -готовность обнулить поля после расчета
        currentOperand - текущий операнд (после ввода операции)
        previousOperand - предыдущий операнд (первый введенный)
        operation - операция
     */


    /*конструктор класса*/
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;//значение свойства при создании объекта
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear()// чистит операнды и операцию
    {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
    }

    delete() //удаляет последнее,что ввел юзер
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);//удалить последний символ 
    }

    appendNumber(number) //добавление числа
    {
        //console.log("текущий:" + this.currentOperand.toString() + " введенный:" + number);

        if (number === '.' && this.currentOperand.toString().includes('.')) return;//если ввели точку,а у нас уже дробное число,игнорируем ввод
        let curr = this.currentOperand.toString();
        if (curr == '' && number === '.') curr = 0;
        this.currentOperand = curr + number.toString(); //добавляем к текущему операнду введенное число

        //console.log("итого:" + this.currentOperand);
    }

    changeNegative()//изменение знака числа
    {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = current * -1;
        //console.log("замена знака" + this.currentOperand + typeof (this.currentOperand));
    }

    chooseOperation(operation) //выбор операции
    {
        if (this.currentOperand === '' && this.operation !== "√") return;//this.newcompute();//если текущий операнд пуст, нечего "складывать",выход
        //console.log("!!! " + this.operation);
        if (this.operation === "√") {
            //console.log("GO newcompute!");
            this.newcompute(); //производим вычисления с одним операндом

        }
        if (this.previousOperand !== '') //если предыдущий операнд не пуст && this.currentOperand !== ''
        {
            //console.log("перед вычислением из выбора операции: " + this.previousOperand + " + " + this.currentOperand);
            this.compute(); //производим вычисления с двумя операндами

        }

        this.operation = operation; //текущая операция присвается переданному параметру
        this.previousOperand = this.currentOperand;//в предыдущий (верхний операнд записываем текущий-он равен сумме,разности и тп)
        this.currentOperand = '';//текущий обнуляем
    }

    compute() //функция производящая операции c двумя операндами +-*/ степень числа
    {
        let computation; //вычисление-переменная
        const prev = parseFloat(this.previousOperand);// из строки получаем десятичное значение предыдущего операнда
        const current = parseFloat(this.currentOperand);// из строки получаем десятичное значение текущего операнда
        if (isNaN(prev) || isNaN(current)) return;//проверяем числа на соответсвие Number - если не число выходим
        switch (this.operation) {//проверяем текущую операцию
            case '+':
                computation = (prev * 10 + current * 10) / 10;//складываем,умножние и деление на 10 для корректных дробей
                break;
            case '-':
                computation = (prev * 10 - current * 10) / 10;//вычитаем 
                break;
            case '*':
                computation = (((prev * 10) * (current * 10)) / 100);//умножаем
                break;
            case '÷':
                if (current === 0) {
                    alert("Нельзя делить на ноль!");
                    this.clear();
                    this.updateDisplay();
                    break;
                }
                computation = prev / current;//деление
                break;
            case '√':
                computation = Math.sqrt(prev);
                break;
            case '^':
                if (this.currentOperand.includes('.') && prev < 0) {
                    alert("Запрещается возводить в дробную степень отрицательные числа!");
                    this.clear();
                    this.updateDisplay();
                    break;
                }
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        this.readyToReset = true; //готовность обнулиться автоматически в тру,после вычисления-чтобы не стирать кнопкой
        this.currentOperand = computation;//текущий операнд равен результату вычисления
        this.operation = undefined;//операция обнуляется
        this.previousOperand = ''; //предыдущий обнуляем
    }
    /**
     * новая функция для вычисления квадрата для всех операций без второго аргумента
     */
    newcompute() {
        let computation; //вычисление-переменная
        const prev = parseFloat(this.previousOperand);// из строки получаем десятичное значение предыдущего операнда
        //const current = parseFloat(this.currentOperand);// из строки получаем десятичное значение текущего операнда
        if (isNaN(prev)) return;//проверяем числа на соответсвие Number - если не число выходим

        switch (this.operation) {//проверяем текущую операцию
            case '√':
                if (prev < 0) {
                    alert("Нельзя извлечь квадратный корень из отрицательного числа!");
                    this.clear();
                    this.updateDisplay();
                    break;
                }
                computation = Math.sqrt(prev);
                break;
            default:
                return;
        }
        this.readyToReset = true; //готовность обнулиться автоматически в тру,после вычисления-чтобы не стирать кнопкой
        this.currentOperand = computation;//текущий операнд равен результату вычисления
        this.operation = undefined;//операция обнуляется
        this.previousOperand = ''; //предыдущий обнуляем

        //console.log("yes!" + this.currentOperand + "//" + this.previousOperand);

    }


    getDisplayNumber(number) //получаем введенное число - передаем его в параметре number
    {
        if (number === undefined) return;
        const stringNumber = number.toString(); // число строкой
        const integerDigits = parseFloat(stringNumber.split('.')[0]);//получаем целую часть - до точки
        const decimalDigits = stringNumber.split('.')[1];//получаем дробную часть - после точки
        let integerDisplay;//целое -результат
        if (isNaN(integerDigits)) {//проверка на число целой части
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });// возвращает строку с языко-зависимым представлением числа, дробная 0

        }
        if (decimalDigits != null) {//если дробная не нуль выводим десятичное число,состоящее из двух чисел и точки
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;//или целое
        }
    }

    updateDisplay() //обновляем вывод
    {
        if (this.getDisplayNumber(this.currentOperand) !== undefined)
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);//вводим в инпут текущего значения полученное число-текущий операнд
        if (this.operation != null) {//если операция не нуль
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`//в предыдущее выводим предыдущий операнд и операцию
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]');//возвращает ВСЕ элементы с номерами кнопок 0-9
const operationButtons = document.querySelectorAll('[data-operation]');//возвращает ВСЕ элементы с операциями / * + - 
const equalsButton = document.querySelector('[data-equals]');//возвращает элемент с кнопкой равно = - он должен быть один
const deleteButton = document.querySelector('[data-delete]');//возвращает элемент с кнопкой удалить последний= - он должен быть один
const allClearButton = document.querySelector('[data-all-clear]');//возвращает элемент с кнопкой почистить все= - он должен быть один
const previousOperandTextElement = document.querySelector('[data-previous-operand]');//это элемент поля вывода-предыдущего операнда - сверху
const currentOperandTextElement = document.querySelector('[data-current-operand]');//это элемент поля для вывода цифр текущего операнда
const negativeButton = document.querySelector('[data-negative]'); // хранит значение кнопки negative

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);//создали объект класса с переданными в него переменными полей вывода

numberButtons.forEach //перебираем коллекцию кнопок с номерами
    (button => {
        button.addEventListener("click", () => //и назначаем каждой свой обработчик!
        {
            console.log("текущий перед вводом: " + calculator.currentOperand);
            //функция обработчик события кнопки номера
            if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) //пуст предыдущий операнд,но текущий есть и  хочется обнулиться
            {
                calculator.currentOperand = "";//убираем текущий
                calculator.readyToReset = false;//сбрасываем желание обнулиться
            }
            calculator.appendNumber(button.innerText)//добавляем число 
            calculator.updateDisplay();//обновляем вывод (добавляем введенное по кнопке число)
        })
    })

operationButtons.forEach//перебираем коллекцию кнопок с операциями /*-+
    (button => {
        button.addEventListener('click', () => //добавляем обработчик
        {//обработка события нажатия на кнопки + - * /
            if (button.innerText === 'xy') calculator.chooseOperation('^');
            else if (button.innerText === '2√x') {
                calculator.chooseOperation('√');
                calculator.newcompute();
            }
            else calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        })
    })

equalsButton.addEventListener('click', button => { //добавляем обработчик события нажатия на равно
    if (calculator.operation === '√') calculator.newcompute();
    else calculator.compute();//вычисляем
    calculator.updateDisplay();//выводим
})

allClearButton.addEventListener('click', button => {//добавляем обработчик кнопки сброса всего
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {//добавляем обработчик кнопки сброса последнего введенно числа
    calculator.delete();
    calculator.updateDisplay();
})

negativeButton.addEventListener('click', button => {//добавляем обработчик кнопки изменения знака числа
    if (calculator.currentOperand !== '')//если текущий не пуст
    {
        calculator.changeNegative();
    }
    //calculator.appendNumber(button.innerText)//добавляем число 
    calculator.updateDisplay();//обновляем вывод (добавляем введенное по кнопке число)

})