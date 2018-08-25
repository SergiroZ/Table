"use strict";
window.onload = function () {

    const n = randomInteger(2, 3);
    let matrixArray = initArray(n, n), sum = 0, sumRowArr = [];

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
        console.log('-- getInitial ');

        for (let i = 0; i < matrixHeight; i++) {
            const tr = createDomElement('tr');
            let localSumRow = 0;
            for (let j = 0; j < matrixWith; j++) {
                const val = matrixArray[i][j] = randomInteger(-20, 20);
                localSumRow += val;
                const td = createDomElement('td', '', val, 'click', checkTd);
                tr.appendChild(td);
            }
            const td = createDomElement('td', 'tableRes', localSumRow);
            sumRowArr.push(localSumRow);
            tr.appendChild(td);
            table.appendChild(tr);
        }
        getSubTotal(matrixHeight, matrixWith);
    }

    //добавляем итоги по столбцам
    function getSubTotal(matrixHeight, matrixWith) {
        let sumColumn = [];

        for (let j = 0; j < matrixWith; j++) {
            sumColumn[j] = 0;
        }

        for (let i = 0; i < matrixHeight; i++) {
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
            let totalSum = 0;
            const matWith = sumColumn.length;
            for (let i = 0; i < matWith; i++) {
                totalSum += sumColumn[i];
            }
            return totalSum;
        }
    }

    function addRowFun() {
        console.log('-- addRowFun ');

        const matrixWith = document.querySelectorAll('.tableSum tr:first-child td').length;
        const matrixHeight = document.querySelectorAll('.tableSum tr').length;
        table.deleteRow(matrixHeight - 1); //удаляем устаревшие итоги по столбцам

        const tr = createDomElement('tr');
        let localSumRow = 0, tmp = [];
        for (let j = 0; j < matrixWith - 1; j++) {
            const val = tmp[j] = randomInteger(-20, 20);
            localSumRow += val;
            const td = createDomElement('td', '', val, 'click', checkTd);
            tr.appendChild(td);
        }
        matrixArray.push(tmp);
        sumRowArr.push(localSumRow);
        const td = createDomElement('td', 'tableRes', localSumRow);
        tr.appendChild(td);
        table.appendChild(tr);

        getSubTotal(matrixHeight, matrixWith - 1); //добавляем итоги по столбцам
    }

    function addColFun() {
        console.log('-- addColFun ');

        let matrixHeight = document.querySelectorAll('.tableSum tr');
        let mtrHeight = matrixHeight.length;
        let mtrWith = document.querySelectorAll('.tableSum tr:first-child td').length;
        let rows = document.getElementsByClassName('tableSum')[0].getElementsByTagName('tr');

        delColumn(mtrHeight--);

        let tmp = [];
        for (let i = 0; i < mtrHeight; i++) {
            tmp[i] = randomInteger(-20, 20);
        }

        for (let i = 0; i < mtrHeight; i++) {

            const td = createDomElement('td', '', tmp[i], 'click', checkTd);
            matrixHeight[i].appendChild(td);

            matrixArray[i].push(tmp[i]); //добавляем значение во вложенный массив
            sumRowArr[i] += tmp[i]; //добавляем значение в итоги по строкам

            const tdRes = createDomElement('td', 'tableRes', sumRowArr[i]);
            matrixHeight[i].appendChild(tdRes);
        }
        table.deleteRow(mtrHeight); //удаляем устаревшие итоги по столбцам
        getSubTotal(mtrHeight, mtrWith); //добавляем итоги по столбцам

        function delColumn(matHeight) {
            for (let i = 0; i < matHeight; i++)  //проходим строки таблицы
            {
                let row = rows[i]; //берём очередную строку
                row.deleteCell(-1); //удаляем последнюю ячейку
            }
        }

    }

    function createDomElement(elem, className = "", text = "", eventType = "", eventFun) {
        const newElem = document.createElement(elem);
        if (className !== "") {
            newElem.className = className;
        }

        if (eventType !== "") {
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





	
