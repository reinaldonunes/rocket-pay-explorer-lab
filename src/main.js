import "./css/index.css"
import IMask from "imask"

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

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-15]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateValuesView(".cc-number", cardNumberMasked, "1234 5678 9012 3456")
})

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YYYY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YYYY: {
      mask: IMask.MaskedRange,
      from: new Date().getFullYear(),
      to: new Date().getFullYear() + 10,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)
expirationDate.addEventListener("input", () => {
  updateValuesView(".cc-expiration .value", expirationDateMasked, "02/2032")
})

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)
securityCode.addEventListener("input", () => {
  updateValuesView(".cc-security .value", securityCodeMasked, "123")
})

const addCard = document.querySelector("#add-card")
addCard.addEventListener("click", () => {
  alert("Parabéns! Você adicionou seu cartão com sucesso!")
})
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerHTML = cardHolder.value ? cardHolder.value : "FULANO DA SILVA"
})

function updateValuesView(element, code, textbase) {
  const getElement = document.querySelector(element)
  getElement.innerText = code.value ? code.value : textbase
}
