
        let p = document.querySelector('p') // mapeando paragrafo
        let input = document.querySelector('input') // mapeando input



    const contacts = [ // criando uma lista
        {name: 'Rodolfo', number: '(19) 9999-5555'},
        {name: 'Paulo', number: '(31) 9987-5355'},
        {name: 'Aline', number: '(22) 9965-5555'},
        {name: 'Maria', number: '(15) 99129-2255'},
        {name: 'Daniel', number: '(11) 9933-5555'},
        {name: 'Ana', number: '(10) 9995-5455'},
    ]

    // function search() {
    //     console.log(input.value) testando input
    // }


    function search(){
        
        for (let i = 0; i < contacts.length ;i++){

            if(input.value.toLocaleLowerCase() === contacts [i].name.toLocaleLowerCase()){

              p.innerHTML = `Contato Encontrado Nome: ${contacts[i].name} Tel.: ${contacts[i].number}`
              
              break
            }else {
              p.innerHTML = "Contato não encontrado, tente novamente."
            }
        }
    }
