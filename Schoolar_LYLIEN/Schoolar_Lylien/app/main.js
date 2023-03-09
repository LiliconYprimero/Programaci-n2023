console.log("hola...")

const burger_icon = document.querySelector('.burger_icon')
const menu = document.querySelector('.menu')

burger_icon.onclick = () => {
    menu.classList.toggle('opened')
}