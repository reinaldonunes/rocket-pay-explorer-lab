import "./css/index.css"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccIconFlag = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(flag) {
  const theme = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    nubank: ["#A332B3", "#530082"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", theme[flag][0])
  ccBgColor02.setAttribute("fill", theme[flag][1])
  ccIconFlag.setAttribute("src", `cc-${flag}.svg`)
}

globalThis.setCardType = setCardType
