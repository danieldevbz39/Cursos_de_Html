function generateNumber(){

    const min = Math.ceil(document.querySelector('.input-min').value)
    const max = Math.ceil(document.querySelector('.input-max').value)
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    
    if (max > min) {
        const result = Math.floor(Math.random() * (max - min +1)) + min
    alert(result)
    } else {
        alert('O valor minimo tem que ser menor que o valor máximo.')
    }

    
}