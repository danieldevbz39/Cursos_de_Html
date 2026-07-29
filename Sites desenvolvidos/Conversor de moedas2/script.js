const convertButton = document.querySelector(".button-convert")
const currencySelect = document.querySelector(".currency-select")


function convert_valores () {
    const valueInput = document.querySelector(".inputValue").value // valor do input
    const valueReal = document.querySelector(".currencyValue") // valor para converter
    const valueconverted= document.querySelector(".currencyConverted") // valor convertido


    console.log(currencySelect.value)

    const dolarToday = 5.66
    const euroToday = 6.99

    
    const convertValue = valueInput / dolarToday

    if(currencySelect.value == "dolar"){
        valueconverted.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(convertValue)
    }

    if(currencySelect.value == "euro"){
        valueconverted.innerHTML = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    }).format(convertValue)
    }


    valueReal.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valueInput)
}



convertButton.addEventListener("click", convert_valores)