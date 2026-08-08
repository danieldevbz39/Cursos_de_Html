
let p = document.querySelector("p")
let input = document.querySelector("input")

const contacts = [
  { name: 'Rodolfo', number: '(12) 9999-9999' },
  { name: "Gabriel", number: "(12) 9999-9999" },
  { name: "Phelipe", number: "(12) 9999-9999" },
  { name: "Paulo", number: "(12) 9999-9999" },
  { name: "Aline", number: "(12) 9999-9999" },
  { name: "Maria", number: "(12) 9999-9999" },
  { name: "Daniel", number: "(12) 9999-9999" },
  { name: "Ana", number: "(12) 9999-9999" },
  { name: "Sará", number: "(12) 9999-9999" },
  { name: "Antônio", number: "(12) 9999-9999" },

]

function search(){

  for (let i = 0; i < contacts.length; i++){
    if(input.value.toLocaleLowerCase() === contacts [i].name.toLocaleLowerCase()){
      p.innerHTML = `Contato Encontrado. Nome: ${contacts[i].name} Tel: ${contacts[i].number}`
      
      break
    } else {
      p.innerHTML = "Contato não encontrado, tente novamente."
    }
  }
}