"use strict";
window.onload = function () {

    const n = randomInteger(3, 10);
    let resultArray = matrixArray(n, n);
    let totalSum = 0;

    const titleTable = createDomElement('div', 'tableTitle tableStyle', 'Случайная матрица.');

    const table = createDomElement('table', 'tableSum');

    const addCol = createDomElement('button', 'st', 'новый\nстолбец', 'click', addColFun);
    const addRow = createDomElement('button', 'st', 'новая\nстрока', 'click', addRowFun);

    const res = createDomElement('div', 'tableTitle tableStyle', 'Сумма не определена...');

    const bodyBlockRes = createDomElement('div', 'flex-container container-justify', '');
    const bodyBlockAdd = createDomElement('div', 'flex-container container-justify', '');
    const bodyBlock = createDomElement('div', 'flex-container container-justify', '');

    const blockTable = createDomElement('div', 'tableStyle', '');
    res.id = "show";

    let i = 0, sum = 0;

    for (i = 0; i < n; i++) {
        const tr = createDomElement('tr');
        let sumRow = 0;
        for (let j = 0; j < n; j++) {
            const val = resultArray[i][j] = randomInteger(-20, 20);
            sumRow += val;
            const td = createDomElement('td', '', val, 'click', checkTd);
            tr.appendChild(td);
        }
        const td = createDomElement('td', 'tableRes', sumRow);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    getSubTotal(n, n);


    bodyBlockRes.appendChild(res);
    bodyBlockAdd.appendChild(addCol);
    bodyBlockAdd.appendChild(addRow);
    bodyBlock.appendChild(blockTable);
    blockTable.appendChild(table);

    document.body.appendChild(titleTable);
    document.body.appendChild(bodyBlockRes);
    document.body.appendChild(bodyBlockAdd);
    document.body.appendChild(bodyBlock);

    function getSubTotal(rows, cols) {

        const matrixWith = cols;
        const matrixHeight = rows;

        let sumCol = [];
        for (i = 0; i < matrixHeight; i++) {
            sumCol[i] = 0;
        }

        for (i = 0; i < matrixHeight; i++) {
            for (let j = 0; j < matrixWith; j++) {
                sumCol[j] += resultArray[i][j];
            }
        }

        const tr = createDomElement('tr');
        for (let j = 0; j < matrixWith; j++) {
            const td = createDomElement('td', 'tableRes', sumCol[j]);
            tr.appendChild(td);

        }
        table.appendChild(tr);
    }

    function getTotalSum() {
        return totalSum;
    }

    function addRowFun() {
        console.log('-- addRowFun ');

        const matrixWith = document.querySelectorAll('.tableSum tr:first-child td').length;
        const matrixHeight = document.querySelectorAll('.tableSum tr').length;
        table.deleteRow(matrixHeight - 1);

        console.log(n);
        const tr = createDomElement('tr');
        let sumRow = 0;


        let tmp = [];
        for (let j = 0; j < matrixWith - 1; j++) {
            const val = tmp[j] = randomInteger(-20, 20);
            sumRow += val;
            const td = createDomElement('td', '', val, 'click', checkTd);
            tr.appendChild(td);
        }
        resultArray.push(tmp);
        const td = createDomElement('td', 'tableRes', sumRow);
        tr.appendChild(td);
        table.appendChild(tr);

        getSubTotal(matrixHeight, matrixWith);
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

    function matrixArray(rows, columns) {
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





	