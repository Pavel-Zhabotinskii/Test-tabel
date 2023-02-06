import {Tabel,clearTabel,sortTableByOrders,sortTableByStatus} from './tabel'
import {Auth} from './auth'
import './style.css'


const filterOrders = document.querySelector('.filter__orders')
const filterStatus = document.querySelector('.filter__status')
const btnToComeIn = document.querySelector('.regictration__button')
const auth = document.querySelector('.main__registration')
const form = document.querySelector('.registration__form')
const email = localStorage.getItem('email')
const tabel = document.querySelector('.main__container_table')
const btn = document.querySelector('.header__anchor')

btnToComeIn.addEventListener('click', open)

btn.addEventListener('click',() => {
    location.reload()
    localStorage. removeItem('email')
})

filterOrders.addEventListener('click', () =>{
    clearTabel()
    Auth.authWithEmailAndPassword(localStorage.getItem('email'), localStorage.getItem('email'))
    .then(Tabel.fetch)
    .then(responce => {
        renderModalAfterAuth(responce)}
    )
    filterStatus.classList.remove('btn_active')
    filterOrders.classList.add('btn_active')
})

filterStatus.addEventListener('click', () =>{
    clearTabel()
    Auth.authWithEmailAndPassword(localStorage.getItem('email'), localStorage.getItem('email'))
    .then(Tabel.fetch)
    .then(responce => {
        sortTableByStatus(responce)}
    )
    
    filterOrders.classList.remove('btn_active')
    filterStatus.classList.add('btn_active')
})


function open() {
    document
      .querySelector('.registration__form')
      .addEventListener('submit', authFormHandler)
}
  
function authFormHandler(event) {
    event.preventDefault()
    
    const nameUser = document.querySelector('.main__user')
    const email = event.target.querySelector('.regictration__email').value
    const password = event.target.querySelector('.registration__password').value
  
    Auth.authWithEmailAndPassword(email, password)
       .then(Tabel.fetch)
       .then(responce => {
            renderModalAfterAuth(responce)
            nameUser.querySelector('span').innerHTML = `${email}`
            btn.textContent = 'Выход'
        })
}


function renderModalAfterAuth (content) {
    if(typeof content === 'string'){
        const er = form.querySelector('.error')
        if(!er){
            form.insertAdjacentHTML('afterbegin', content)
        }
    } else {  
        sortTableByOrders(content)
        tabel.style.display = 'block'
        auth.style.display = 'none'
    }   
}

