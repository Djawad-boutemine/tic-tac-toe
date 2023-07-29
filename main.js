
let gameStates = {
    first: true,
    main: {
        state: false,
        firstPlayer : "o",
        one: false,
        two: false,
    },
    final: false,
};
let firstPage = document.querySelector(".first-page");
let mainPage = document.querySelector(".main-page");
if (gameStates.first) {
    let x = document.querySelector(".xo-box button:first-child");
    console.log(x);
    let o = document.querySelector(".xo-box button:nth-child(2)");
    console.log(o);
    x.onclick = function(){
        gameStates.main.firstPlayer = "x" ;
        x.classList.remove("not");
        o.classList.add("not");
    }
    o.onclick = function(){
        gameStates.main.firstPlayer = "o" ;
        x.classList.toggle("not");
        o.classList.toggle("not");
    }
    let onePlayer = document.querySelector("#one-player");
    let twoPlayers = document.querySelector("#two-players");
    onePlayer.onclick = function () {
        gameStates.main.one = true;
        gameStates.main.state = true;
        firstPage.style.cssText = "display : none ";
        mainPage.style.cssText = "display : block ";
    };
    twoPlayers.onclick = function () {
        gameStates.main.two = true;
        gameStates.main.state = true;
        firstPage.style.cssText = "display : none ";
        mainPage.style.cssText = "display : block ";
    };
} 
