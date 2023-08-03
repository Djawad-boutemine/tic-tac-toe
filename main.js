
let playingModes = {
    one: true,
    two: false,
}
let starter = "x";
let first = "bot";
// pages
let firstPage = document.querySelector(".first-page");
let mainPage = document.querySelector(".main-page");
let finalPage = document.querySelector(".final-page");
let main = document.querySelector("main");
// function to toggle pages
let changePage = function (page) {
    if (page == "first") {
        firstPage.style.cssText = "display : flex";
        mainPage.style.cssText = "display : none";
        finalPage.style.cssText = "display : none";
        main.classList.remove("shadow");
        reload();
        sreload();
    } else if (page == "main") {
        mainPage.style.cssText = "display : grid";
        firstPage.style.cssText = "display : none";
        finalPage.style.cssText = "display : none";
        main.classList.remove("shadow");
        reload();
    } else if (page == "final") {
        mainPage.style.cssText = "display : grid";
        firstPage.style.cssText = "display : none";
        finalPage.style.cssText = "display : grid";
        main.classList.add("shadow");
    }
}
// first page stuff
let x = document.querySelector(".xo-box button:first-child");
let o = document.querySelector(".xo-box button:nth-child(2)");
x.onclick = function () {
    first = "you";
    x.classList.remove("not");
    o.classList.add("not");
}
o.onclick = function () {
    first = "bot";
    x.classList.toggle("not");
    o.classList.toggle("not");
}

let onePlayer = document.querySelector("#one-player");
let twoPlayers = document.querySelector("#two-players");
let turn = document.querySelector(".turn");


let winVars = 0, loseVars = 0, tieVars = 0;
let blueOneTitle = document.querySelector(".x p");
let noOneTitle = document.querySelector(".tie p");
let orangeOneTitle = document.querySelector(".o p");
let blueOne = document.querySelector(".x span");
let noOne = document.querySelector(".tie span");
let orangeOne = document.querySelector(".o span");

let xo = "x";

onePlayer.onclick = function () {
    changePage("main");
    turn.innerHTML = "x  turn";
    blueOneTitle.innerHTML = "you";
    orangeOneTitle.innerHTML = "cpu";
    noOneTitle.innerHTML = "ties";
    blueOne.innerHTML = winVars;
    orangeOne.innerHTML = loseVars;
    noOne.innerHTML = tieVars;
    if (first === "bot") {
        xo = "x";
    } else {
        xo = "o";
    };
    if (first == "bot") { bot(gameBtns, gameBtnsContent, xo) };
};
twoPlayers.onclick = function () {
    changePage("main");
    playingModes.one = false;
    playingModes.two = true;
    turn.innerHTML = "x  turn";
    blueOneTitle.innerHTML = "x";
    orangeOneTitle.innerHTML = "o";
    noOneTitle.innerHTML = "ties";
    blueOne.innerHTML = winVars;
    orangeOne.innerHTML = loseVars;
    noOne.innerHTML = tieVars;
};
// main page stuff
let gameBtns = Array.from(document.querySelectorAll(".game"));
let gameBtnsContent = Array.from(document.querySelectorAll(".game span"))
let restart = document.querySelector(".restart");


// restart button
function reload() {
    gameBtnsContent.map(function (ele) {
        ele.innerHTML = "";
        ele.classList = "";
        starter = "x";
    })
    turn.innerHTML = "x  turn";
}
function sreload() {
    winVars = 0;
    loseVars = 0;
    tieVars = 0;
}
restart.addEventListener("click", function () {
    reload();
});

gameBtns.map(function (ele, index, arr) {
    ele.onclick = function () {
        if (gameBtnsContent[index].innerHTML === "") {
            gameBtnsContent[index].innerHTML = starter;
            if (starter === "o") {
                starter = "x";
                gameBtnsContent[index].classList.add("orange");
            } else {
                starter = "o";
                gameBtnsContent[index].classList.add("blue");
            }
            turn.innerHTML = starter + "  turn";
            console.log(starter, xo);
        }
        if (playingModes.one && starter === xo) {
            bot(gameBtns, gameBtnsContent, xo);
        }
        if (playingModes.one) {
            if (check(gameBtnsContent)) {
                changePage("final");
                if (check(gameBtnsContent) === "x") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Winner !";
                    container.style.cssText = "color : #31c3bd;";
                    winVars++;
                } else if (check(gameBtnsContent) === "o") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Looser !";
                    loseVars++;
                    container.style.cssText = "color : #f2b137;";
                } else if (check(gameBtnsContent) === "tie") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Tie";
                    tieVars++;
                    container.style.cssText = "color : #a8bfc9; padding-right : 1em ;";
                }
            }
        } else if (playingModes.two) {
            if (check(gameBtnsContent)) {
                changePage("final");
                if (check(gameBtnsContent) === "x") {
                    charWin.innerHTML = "x";
                    string.innerHTML = "takes the round";
                    container.style.cssText = "color : #31c3bd;";
                    winVars++;
                } else if (check(gameBtnsContent) === "o") {
                    charWin.innerHTML = "o";
                    string.innerHTML = "takes the round";
                    container.style.cssText = "color : #f2b137;";
                    loseVars++;
                } else if (check(gameBtnsContent) === "tie") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Tie";
                    tieVars++;
                    container.style.cssText = "color : #a8bfc9; padding-right : 1em ;";
                }
            }
        };
        blueOne.innerHTML = winVars;
        orangeOne.innerHTML = loseVars;
        noOne.innerHTML = tieVars;
    }
})
// x index to x,y index
// let grid = function (index) {
//     let x, y
//     (index + 1) % 3 === 0 ? x = 3 : x = (index + 1) % 3;
//     (index + 1) % 3 === 0 ? y = (((index + 1) - ((index + 1) % 3)) / 3) : y = (((index + 1) - ((index + 1) % 3)) / 3) +1 ;
//     x--;
//     y--;
//     return [y,x]
// }

// x,y index to x index
let grid = function (x, y) {
    return 3 * x + y
}
// checking function 
function check(array) {
    // horizontal ckeking and vertical ckeking
    let xWinsH, oWinsH, xWinsV, oWinsV;
    main:
    for (let i = 0; i < 3; i++) {
        xWinsH = 0; oWinsH = 0; xWinsV = 0; oWinsV = 0;
        for (let j = 0; j < 3; j++) {
            array[grid(i, j)].innerHTML === "x" ? xWinsH++ : xWinsH;
            array[grid(i, j)].innerHTML === "o" ? oWinsH++ : oWinsH;
            array[grid(j, i)].innerHTML === "x" ? xWinsV++ : xWinsV;
            array[grid(j, i)].innerHTML === "o" ? oWinsV++ : oWinsV;
            if (xWinsH === 3 || xWinsV === 3 || oWinsH === 3 || oWinsV === 3) {
                break main;
            }
        }
    }
    // diogonal ckeking
    let xFirstDiagonal = 0, oFirstDiagonal = 0;
    for (let i = 0; i < 3; i++) {
        array[grid(i, i)].innerHTML === "x" ? xFirstDiagonal++ : xFirstDiagonal;
        array[grid(i, i)].innerHTML === "o" ? oFirstDiagonal++ : oFirstDiagonal;
    }
    let xSecondDiagonal = 0, oSecondDiagonal = 0;
    for (let i = 0; i < 3; i++) {
        array[grid(i, 2 - i)].innerHTML === "x" ? xSecondDiagonal++ : xSecondDiagonal;
        array[grid(i, 2 - i)].innerHTML === "o" ? oSecondDiagonal++ : oSecondDiagonal;
    }
    let filled = 0;
    for (let i = 0; i < 9; i++) {
        gameBtnsContent[i].innerHTML != "" ? filled++ : filled;
    }
    // return value
    if (xWinsH === 3 || xWinsV === 3 || xFirstDiagonal === 3 || xSecondDiagonal === 3) {
        return "x"
    } else if (oWinsH === 3 || oWinsV === 3 || oFirstDiagonal === 3 || oSecondDiagonal === 3) {
        return "o"
    } else if (filled === 9) {
        return "tie"
    }
}

// final page stuff 
let quit = document.querySelector(".quit");
let next = document.querySelector(".next");

let charWin = document.querySelector(".winner span");
let string = document.querySelector(".winner p");
let container = document.querySelector(".winner");
quit.onclick = function () {
    changePage("first");
}
next.onclick = function () {
    changePage("main");
}
// bot function

function bot(array1, array2, xo) {
    let me, him;
    if (xo == "x") {
        me = "x";
        him = "o";
    } else {
        me = "o";
        him = "x";
    }
    let yes = true;
    for (let i = 0; i < 3; i++) {
        // for bot to win
        let oCountH = 0, xCountH = 0, oCountV = 0, xCountV = 0;
        for (let j = 0; j < 3; j++) {
            if (array2[grid(i, j)].innerHTML === me) { oCountH++ }
            if (array2[grid(j, i)].innerHTML === me) { oCountV++ }
            if (array2[grid(i, j)].innerHTML === him) { xCountH++ }
            if (array2[grid(j, i)].innerHTML === him) { xCountV++ }
        }
        if (oCountH === 2 && xCountH === 0) {
            for (let j = 0; j < 3; j++) {
                if (array2[grid(i, j)].innerHTML === "") {
                    array1[grid(i, j)].click();
                }
                yes = false;
            }
        } else if (oCountV === 2 && xCountV === 0) {
            for (let j = 0; j < 3; j++) {
                if (array2[grid(j, i)].innerHTML === "") {
                    array1[grid(j, i)].click();
                }
                yes = false;
            }
        } else if (xCountV === 2 && oCountH === 0) {
            for (let j = 0; j < 3; j++) {
                if (array2[grid(j, i)].innerHTML === "") {
                    array1[grid(j, i)].click();
                }
                yes = false;
            }
        } else if (xCountH === 2 && oCountH === 0) {
            for (let j = 0; j < 3; j++) {
                if (array2[grid(i, j)].innerHTML === "") {
                    array1[grid(i, j)].click();
                }
                yes = false;
            }
        }
    }
    let oDiogonalOne = 0, xDiogonalOne = 0, xDiogonalTwo = 0, oDiogonalTwo = 0;
    for (let i = 0; i < 3; i++) {
        array2[grid(i, i)].innerHTML === me ? oDiogonalOne++ : oDiogonalOne;
        array2[grid(i, i)].innerHTML === him ? xDiogonalOne++ : xDiogonalOne;
    }
    for (let i = 0; i < 3; i++) {
        array2[grid(i, 2 - i)].innerHTML === me ? oDiogonalTwo++ : oDiogonalTwo;
        array2[grid(i, 2 - i)].innerHTML === me ? xDiogonalTwo++ : xDiogonalTwo;
    }
    if (yes) {
        if (oDiogonalOne === 2) {
            for (let i = 0; i < 3; i++) {
                if (array2[grid(i, i)].innerHTML === "") {
                    array1[grid(i, i)].click();
                }
            }
        } else if (oDiogonalTwo === 2) {
            for (let i = 0; i < 3; i++) {
                if (array2[grid(i, 2 - i)].innerHTML === "") {
                    array1[grid(i, 2 - i)].click();
                }
            }
        } else if (xDiogonalOne === 2) {
            for (let i = 0; i < 3; i++) {
                if (array2[grid(i, i)].innerHTML === "") {
                    array1[grid(i, i)].click();
                }
            }
        } else if (xDiogonalTwo === 2) {
            for (let i = 0; i < 3; i++) {
                if (array2[grid(i, 2 - i)].innerHTML === "") {
                    array1[grid(i, 2 - i)].click();
                }
            }
        } else if (array2[grid(1, 1)].innerHTML === "") {
            array1[grid(1, 1)].click();
        } else if (array2[grid(0, 0)].innerHTML === "") {
            array1[grid(0, 0)].click();
        } else if (array2[grid(0, 2)].innerHTML === "") {
            array1[grid(0, 2)].click();
        } else if (array2[grid(2, 0)].innerHTML === "") {
            array1[grid(2, 0)].click();
        } else if (array2[grid(2, 2)].innerHTML === "") {
            array1[grid(2, 2)].click();
        } else {
            for (let i = 0; i < 9; i++) {
                if (array2[i].innerHTML === "") {
                    array1[i].click();
                    break;
                }
            }
        };
    }


    // let xSecondDiagonal = 0, oSecondDiagonal = 0;
    // for (let i = 0; i < 3; i++) {
    //     array[grid(i, 2 - i)].innerHTML === "x" ? xSecondDiagonal++ : xSecondDiagonal;
    //     array[grid(i, 2 - i)].innerHTML === "o" ? oSecondDiagonal++ : oSecondDiagonal;
    // }
}
// setInterval(() => {
//     gameBtns[1].click();
// }, 1000);