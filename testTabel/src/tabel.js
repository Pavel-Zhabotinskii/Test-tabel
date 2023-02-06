export class Tabel { 
    static fetch(token) {
        if(!token){
            return Promise.resolve('<p class="error">*Неверный логин или пароль</p>')
        }
        return fetch(`https://test-table-59271-default-rtdb.europe-west1.firebasedatabase.app/tabelValues.json?auth=${token}`)
        .then(response => response.json()) 
        .then(response => {
            if(response.error){
                return `<p class="error">${response.error}</p>`
            }
            return response ? Object.keys(response).map(key => ([
                ...response[key],
            ])) : []
        })
    }
}
const statusValue = {
    ["Ценитель красоты"]: 1,
    ["Поставщик аксессуаров"]: 2,
    ["Конкурент минздрава"]: 3,
    ["Охотник"]: 4,
    ["Рыбак"]: 5,
}
let place = 1;

export function addRowsInTabel (index, arr, place) {
    const tabel = document.querySelector('.main__tabel')
    tabel.insertAdjacentHTML('beforeend', `
        <div class="tabel__row row">
            <div>${place}</div>
            <div>${arr[index].email}</div>
            <div>${arr[index].orders}</div>
            <div>${arr[index].status}</div>
        </div>
    `)
}

export function sortTableByOrders (content){
    const arrOrders = []
    const arr = content.flat()
    const a = []
    arr.forEach(el => {
        arrOrders.unshift(el.orders) 
    });
    for(let i = arrOrders.length; i > 0; i--){
        a.push(getMaxOfArray(arrOrders))
        arrOrders.splice(arrOrders.indexOf(getMaxOfArray(arrOrders)),1)
    }
    for(let prop of a){
        arr.forEach((el,index)=>{
            if(el.orders == prop){
                addRowsInTabel(index, arr, place)
                place += 1
            }
        })
    }
}
export function sortTableByStatus (res){
    const arrValues = res.flat()
    const arrStatus = []
    arrValues.forEach(el => {
        arrStatus.unshift(el.status) 
    });
    for(let key in statusValue){
        arrStatus.forEach((el)=>{
            if(key === el){
                addRowsInTabel(statusValue[key] - 1,arrValues, place)
                place += 1
            }
        })
    }
}

export function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

export function clearTabel(){
    const rows = document.querySelectorAll('.tabel__row')
    place = 1
    for(let value of rows){
        value.remove()
    }
}

