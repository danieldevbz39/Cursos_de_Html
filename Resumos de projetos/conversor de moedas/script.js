const converter = document.querySelector ('.VlConverter').value // valor para converter
const vlConvertido = document.querySelector ('.VlConvertido').value //valor convertido
const btnconvertendo = document.querySelector ('.btnConverter') //boão
const selectconvertido = document.querySelector('.currencySelect')//select

function convertValues() {
    const campoNumero = document.querySelector ('.campoNunber').value // input
    const currencyValueToConverter =document.querySelector('.currencyValueToConvert')//vl para converer
    const currencyValueToConverted =document.querySelector('.currencyValueToConverted')// vl convertido

    console.log(selectconvertido.value)

    
    const dolarToday = 5.2
    const euroToday = 6.3 
    const libraToday= 7.88
    const btcToday = 4000.000
    const realToday = 1
    

    if(selectconvertido.value == 'dolar') {
        currencyValueToConverted.innerHTML =  new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(campoNumero/dolarToday)//convertendo vl input / por moeda
    }

    if(selectconvertido.value == 'libra') {
        currencyValueToConverted.innerHTML =  new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "GPB"
    }).format(campoNumero/libraToday)//convertendo vl input / por moeda
    }

    if(selectconvertido.value == 'euro') {
        currencyValueToConverted.innerHTML =  new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(campoNumero/euroToday)//convertendo vl input / por moeda
    }

    if(selectconvertido.value == 'btc') {
        currencyValueToConverted.innerHTML =  new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "BTC"
    }).format(campoNumero/btcToday)//convertendo vl input / por moeda
    }

    if(selectconvertido.value == 'real') {
        currencyValueToConverted.innerHTML =  new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "Real"
    }).format(campoNumero=realToday)//convertendo vl input / por moeda
    }

    currencyValueToConverter.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(campoNumero)    

}
function changeCurrency (){
    const currencyName = document.getElementById('currencyName')
    const currencyimg = document.querySelector('.currencyimg')

    if(selectconvertido.value == 'dolar'){
        currencyName.innerHTML = 'Dólar americano'
        currencyimg.src = './assets/dolar.png'
    }

    if(selectconvertido.value == 'euro'){
        currencyName.innerHTML = 'Euro'
        currencyimg.src = './assets/euro.png'
    }

    if(selectconvertido.value == 'libra'){
        currencyName.innerHTML = 'Libra'
        currencyimg.src = './assets/libra.png'
    }

    if(selectconvertido.value == 'btc'){
        currencyName.innerHTML = 'Bitcoin'
        currencyimg.src = './assets/btc.png'
    }
    if(selectconvertido.value == 'real'){
        currencyName.innerHTML = 'Real'
        currencyimg.src = './assets/real.png'
    }
    convertValues()
}


selectconvertido.addEventListener('change',changeCurrency)
btnconvertendo.addEventListener('click', convertValues)