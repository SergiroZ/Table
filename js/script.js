"use strict";
window.onload = function () {

    const n = randomInteger(3, 10);
    let matrixArray = initArray(n, n), i = 0, sum = 0;

    const titleTable = createDomElement('div', 'tableTitle tableStyle', 'Случайная матрица.');

    const table = createDomElement('table', 'tableSum');

    const addCol = createDomElement('button', 'st', 'новый\nстолбец', 'click', addColFun);
    const addRow = createDomElement('button', 'st', 'новая\nстрока', 'click', addRowFun);

    const res = createDomElement('div', 'tableTitle tableStyle', 'Сумма не определена...');
    res.id = "show";

    const bodyBlockRes = createDomElement('div', 'flex-container container-justify', '');
    const bodyBlockAdd = createDomElement('div', 'flex-container container-justify', '');
    const bodyBlock = createDomElement('div', 'flex-container container-justify', '');
    const blockTable = createDomElement('div', 'tableStyle', '');


    getInitial(n, n);

    bodyBlockRes.appendChild(res);
    bodyBlockAdd.appendChild(addCol);
    bodyBlockAdd.appendChild(addRow);
    bodyBlock.appendChild(blockTable);
    blockTable.appendChild(table);

    document.body.appendChild(titleTable);
    document.body.appendChild(bodyBlockRes);
    document.body.appendChild(bodyBlockAdd);
    document.body.appendChild(bodyBlock);

    function getInitial(matrixHeight, matrixWith) {
        for (i = 0; i < matrixHeight; i++) {
            const tr = createDomElement('tr');
            let sumRow = 0;
            for (let j = 0; j < matrixWith; j++) {
                const val = matrixArray[i][j] = randomInteger(-20, 20);
                sumRow += val;
                const td = createDomElement('td', '', val, 'click', checkTd);
                tr.appendChild(td);
            }
            const td = createDomElement('td', 'tableRes', sumRow);
            tr.appendChild(td);
            table.appendChild(tr);
        }
        getSubTotal(matrixHeight, matrixWith);
    }

    function getSubTotal(matrixHeight, matrixWith) {
        let sumColumn = [];
        for (i = 0; i < matrixHeight; i++) {
            sumColumn[i] = 0;
        }
        for (i = 0; i < matrixHeight; i++) {
            for (let j = 0; j < matrixWith; j++) {
                sumColumn[j] += matrixArray[i][j];
            }
        }
        sumColumn[matrixWith] = getTotalSum(sumColumn);
        const tr = createDomElement('tr');
        for (let j = 0; j < matrixWith + 1; j++) {
            const td = createDomElement('td', 'tableRes', sumColumn[j]);
            tr.appendChild(td);

        }
        table.appendChild(tr);

        function getTotalSum(sumColumn) {
            const matrixWith = document.querySelectorAll('.tableSum tr:first-child td').length;

            let totalSum = 0;

            for (let j = 0; j < matrixWith; j++) {
                totalSum += sumColumn[j];
            }
            return totalSum;
        }
    }


    function addRowFun() {
        console.log('-- addRowFun ');

        const matrixWith = document.querySelectorAll('.tableSum tr:first-child td').length;
        const matrixHeight = document.querySelectorAll('.tableSum tr').length;
        table.deleteRow(matrixHeight - 1);

        console.log(matrixHeight);
        const tr = createDomElement('tr');
        let sumRow = 0, tmp = [];
        for (let j = 0; j < matrixWith - 1; j++) {
            const val = tmp[j] = randomInteger(-20, 20);
            sumRow += val;
            const td = createDomElement('td', '', val, 'click', checkTd);
            tr.appendChild(td);
        }
        matrixArray.push(tmp);
        const td = createDomElement('td', 'tableRes', sumRow);
        tr.appendChild(td);
        table.appendChild(tr);

        getSubTotal(matrixHeight, matrixWith - 1);
    }

    function addColFun() {
        console.log('-- addColFun ');
        const allTr = document.querySelectorAll('.tableSum tr');

        for (i = 0; i < allTr.length; i++) {
            //const td = createDomElement('td', "", randomInteger(-20, 20), 'click', checkTd);
            const td = createDomElement('td', "", 5, 'click', checkTd);
            allTr[i].appendChild(td);
        }

    }

    function createDomElement(elem, className = "", text = "", eventType = "", eventFun) {
        const newElem = document.createElement(elem);
        if (className != "") {
            newElem.className = className;
        }

        if (eventType != "") {
            newElem.addEventListener(eventType, eventFun);
        }

        newElem.innerHTML = text;

        return newElem;
    }

    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }

    function checkTd() {
        if (!this.hasAttribute('class')) {
            this.className = "active";
            sum += +this.innerHTML;
            show.innerHTML = `Сумма = ${sum}`
        }

        else {
            this.removeAttribute('class');
            sum -= +this.innerHTML;
            show.innerHTML = `Сумма = ${sum}`;
        }

    }

    function initArray(rows, columns) {
        const arr = [];
        for (let i = 0; i < rows; i++) {
            arr[i] = [];
            for (let j = 0; j < columns; j++) {
                arr[i][j] = 0;
            }
        }
        return arr;
    }

};





	
