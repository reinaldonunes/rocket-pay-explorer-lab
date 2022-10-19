import "./css/index.css"

const colors = {
  visa: ["#436D99", "#2D57F2"],
  mastercard: ["#DF6F29", "#C69347"],
  default: ["black", "gray"],
}

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
ccBgColor01.setAttribute("fill", "green")

const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
ccBgColor02.setAttribute("fill", "red")
