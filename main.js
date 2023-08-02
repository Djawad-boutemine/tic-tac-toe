
let playingModes = {
    one: true,
    two: false,
}
let starter = "x";
let first = "you";
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

onePlayer.onclick = function () {
    changePage("main");
    turn.innerHTML = "x  turn";
};
twoPlayers.onclick = function () {
    changePage("main");
    playingModes.one = false;
    playingModes.two = true;
    turn.innerHTML = "x  turn";
};
// main page stuff
let gameBtns = Array.from(document.querySelectorAll(".game"));
let gameBtnsContent = Array.from(document.querySelectorAll(".game span"))
let restart = document.querySelector(".restart");
let charWin = document.querySelector(".winner span");
let string = document.querySelector(".winner p");
let container = document.querySelector(".winner");
// restart button
function reload() {
    gameBtnsContent.map(function (ele) {
        ele.innerHTML = "";
        ele.classList = "";
        starter = "x";
    })
    turn.innerHTML = "x  turn";
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
            if (true) { console.log(check(gameBtnsContent)) }
            turn.innerHTML = starter + "  turn";
        }
        if (playingModes.one) {
            
            if (check(gameBtnsContent)) {
                changePage("final");
                if (check(gameBtnsContent) === "x") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Winner !";
                    container.style.cssText = "color : #31c3bd;";
                } else if (check(gameBtnsContent) === "o") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Looser !";
                    container.style.cssText = "color : #f2b137;";
                } else if (check(gameBtnsContent) === "tie") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Tie";
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
                } else if (check(gameBtnsContent) === "o") {
                    charWin.innerHTML = "o";
                    string.innerHTML = "takes the round";
                    container.style.cssText = "color : #f2b137;";
                } else if (check(gameBtnsContent) === "tie") {
                    charWin.innerHTML = "";
                    string.innerHTML = "Tie";
                    container.style.cssText = "color : #a8bfc9; padding-right : 1em ;";
                }
            }
        };

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

quit.onclick = function () {
    changePage("first");
}
next.onclick = function () {
    changePage("main");
}
