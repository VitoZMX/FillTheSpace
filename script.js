'use strict';

const AddBtn = document.querySelector("#btnAdd")
const PourBtn = document.querySelector('.BtnPour')
const BlockGoriz = document.querySelector('.conteinerVert')

let id = 0
let NewNumber = 0
let NoActive = 0
let ArrRes = []

AddBtn.addEventListener('click', clickAdd)
PourBtn.addEventListener('click', clickPour)

function clickAdd() {
    NewNumber = prompt("Пожалуйста, введите число от 0 до 9", "")

    if (typeof (NewNumber) === "object") {
        NewNumber = 0
    } else {
        NewNumber = Number(NewNumber)
        if (isNaN(NewNumber) || NewNumber > 9 || NewNumber < 0) {
            alert('Введено некорректное число!')
            NewNumber = 0
        } else {
            NoActive = 9 - NewNumber
            BlockGoriz.append(addVertDiv(NewNumber, NoActive))

        }
    }
}

function clickPour() {
    let input1 = []
    let countTrueInArr = 0

    for (let i = 0; i < ArrRes.length; i++) {
        for (let j = 0; j < ArrRes[i].length; j++) {
            if (ArrRes[i][j]) {
                countTrueInArr += 1
            }
        }
        input1.push(countTrueInArr)
        countTrueInArr = 0
    }
    calcWather(input1)
}

function addVertDiv(active, NoActive) {
    let arr = []
    let addNewBlock = document.createElement('div')

    addNewBlock.className = `VertRjad`
    addNewBlock.id = `${id}`

    id++

    while (NoActive !== 0) {
        arr.push(false)
        addNewBlock.innerHTML += `
        <div class="NOactiveBlock"></div>
        `
        NoActive--
    }
    while (active !== 0) {
        arr.push(true)
        addNewBlock.innerHTML += `
        <div class="activeBlock"></div>
        `
        active--
    }
    ArrRes.push(arr)
    return addNewBlock
}

function calcWather(arr) {
    let resArr = []
    let maxLeft = arr[0]
    let maxRight = arr[arr.length - 1]

    let left = 1
    let right = arr.length - 2

    while (left <= right) {
        if (maxLeft <= maxRight) {
            maxLeft = Math.max(maxLeft, arr[left])
            resArr.push([left, maxLeft - arr[left]])
            left++
        } else {
            maxRight = Math.max(maxRight, arr[right])
            resArr.push([right, maxRight - arr[right]])
            right--
        }
    }
    renderWather(resArr)
}

function renderWather(arr) {

    for (let i = 0; i < arr.length; i++) {
        let SearchID = arr[i][0]
        let testInp = arr[i][1]

        if (SearchID !== 0 && testInp > 0) {
            let Rjad = document.getElementById(SearchID)
            let element = Rjad.lastElementChild

            while (element.className === "activeBlock") {
                element = element.previousElementSibling
            }
            refClass(element, testInp)
        }
    }
}

function refClass(node, count) {
    while (count !== 0) {
        node.classList.remove("NOactiveBlock")
        node.classList.add("wather")
        node = node.previousElementSibling
        count--
    }
}