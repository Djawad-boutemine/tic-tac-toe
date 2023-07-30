
let playingModes = {
    one: true,
    two: false,
}
let starter = "o";
// pages
let firstPage = document.querySelector(".first-page");
let mainPage = document.querySelector(".main-page");
// function to toggle pages
let changePage = function (page) {
    if (page == "first") {
        firstPage.style.cssText = "display : flex";
        mainPage.style.cssText = "display : none";
    } else if (page == "main") {
        mainPage.style.cssText = "display : grid";
        firstPage.style.cssText = "display : none";
    }
}
// first page stuff
let x = document.querySelector(".xo-box button:first-child");
let o = document.querySelector(".xo-box button:nth-child(2)");
x.onclick = function () {
    starter = "x";
    x.classList.remove("not");
    o.classList.add("not");
}
o.onclick = function () {
    starter = "o";
    x.classList.toggle("not");
    o.classList.toggle("not");
}
let onePlayer = document.querySelector("#one-player");
let twoPlayers = document.querySelector("#two-players");

onePlayer.onclick = function () {
    changePage("main");
};
twoPlayers.onclick = function () {
    changePage("main");
    playingModes.one = false;
    playingModes.two = true;
};
// main page stuff

// restart button
let restart = document.querySelector(".restart");
restart.addEventListener("click", function () {
    changePage("first");
});


if (playingModes.one) {

} else if (playingModes.two) {

};


