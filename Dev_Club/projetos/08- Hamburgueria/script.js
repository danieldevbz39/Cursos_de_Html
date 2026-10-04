const list = document.querySelector('ul')
const buttonshowAll = document.querySelector('.show-all')
const buttonMapAll = document.querySelector('.map-all')
let myLi = ''


function showAll(productsArray) {
    myLi = ''
    productsArray.forEach((product) => {
        myLi += `
                    <li>
                        <img src=${product.src}>
                        <p>${product.name}</p>
                        <p class="item-price">R$ ${product.price}</p>
                    </li>
                `
    })

    list.innerHTML = myLi
}
function mapAllItems() {
    const newPrices = menuOptions.map((product) => ({
        ...product, //Spread Operator 'Trás todos ítens da lista'
        price: product.price * 0.9, //10% desconto
    }))

    showAll(newPrices)


}


// xxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//Mapeando ítens
// function mapAllItems() {
//     const newPrices = menuOptions.map((product) => ({
//         name: product.name,
//         price: product.price * 0.9, //10% desconto
//         vegan: product.vegan,
//         src: product.src
//     }))

//     console.log(newPrices)
//     // console.log(mapAllItems) testando botão map

// }

buttonshowAll.addEventListener('click', ()=> showAll(menuOptions))
buttonMapAll.addEventListener('click', mapAllItems)

// const list = document.querySelector('ul')
// const buttonshowAll = document.querySelector('.show-all')
// const buttonMapAll = document.querySelector('.map-all')
// let myLi = ''


// function showAll() {
//     myLi = ''
//     menuOptions.forEach((product) => {
//         myLi += `
//                     <li>
//                         <img src=${product.src}>
//                         <p>${product.name}</p>
//                         <p class="item-price">R$ ${product.price}</p>
//                     </li>
//                 `
//     })

//     list.innerHTML = myLi
// }
// function mapAllItems() {
//     const newPrices = menuOptions.map((product) => ({
//         ...product, //Spread Operator 'Trás todos ítens da lista'
//         price: product.price * 0.9, //10% desconto
//     }))

//     myLi = ''
//     newPrices.forEach((product) => {
//         myLi += `
//                     <li>
//                         <img src=${product.src}>
//                         <p>${product.name}</p>
//                         <p class="item-price">R$ ${product.price}</p>
//                     </li>
//                 `
//     })

//     list.innerHTML = myLi

//     console.log(newPrices)
//     // console.log(mapAllItems) testando botão map

// }


// // xxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// //Mapeando ítens
// // function mapAllItems() {
// //     const newPrices = menuOptions.map((product) => ({
// //         name: product.name,
// //         price: product.price * 0.9, //10% desconto
// //         vegan: product.vegan,
// //         src: product.src
// //     }))

// //     console.log(newPrices)
// //     // console.log(mapAllItems) testando botão map

// // }

// buttonshowAll.addEventListener('click', showAll)
// buttonMapAll.addEventListener('click', mapAllItems)


// xxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//mostrando lista na tela
// let myLi = ''

// menuOptions.forEach((product) => {
//     myLi += `
//     <li>
//             <img src=${product.src}>
//             <p>${product.name}</p>
//             <p class="item-price">R$ ${product.price}</p>
//         </li>
//     `
// })

// list.innerHTML = myLi
// console.log(myLi)


// xxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// testando arquivo product
// const product = { name: 'X-Salada', price: 30, vegan: false, src: './img/xsalada.jpeg' }

// list.innerHTML = `
//         <li>
//             <img src=${product.src}>
//             <p>${product.name}</p>
//             <p class="item-price">${product.price}</p>
//         </li>
// `

// xxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//testando lista
// list.innerHTML = `
//         <li>
//             <img src="source/bacon-egg.png" alt="">
//             <p>X-Vegon</p>
//             <p class="item-price">R$ 45,00</p>
//         </li>
// `


// xxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// console.log(list)
// testando list no console


