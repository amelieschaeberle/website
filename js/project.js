const items = document.querySelectorAll(".item")
const overlay = document.getElementById("projectOverlay")

items.forEach(item => {

item.addEventListener("click", ()=>{

let url = item.dataset.project

fetch(url)
.then(res => res.text())
.then(html => {

overlay.innerHTML = html
overlay.classList.add("open")

})

})

})

overlay.addEventListener("click", ()=>{

overlay.classList.remove("open")

})