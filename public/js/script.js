fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error(error));


const select = document.querySelector("#categorias")
select.addEventListener('change', handleSelectChange)

function setProdutos(data){
    populateSelect(data)
    let main = document.querySelector("main")
    data.forEach((value)=>{
        main.innerHTML += `<div id=${value.id} class="produtos ${value.category}">
        <h2>${value.title}</h2>
        <img src=${value.image} alt=${value.title} />
        <p class='descricao'>${value.description}</p>
        <h3 class='preco'>Preço: R$ ${value.price}</h3>
        <a href="./view/detalhes.html?id=${value.id}" id="button${value.id}"><button>Detalhes</button></a>
      </div>`
      document.querySelector(`#button${value.id}`).addEventListener('click', ()=>{
        window.location.assign(`./view/detalhes.html?id=${value.id}`)
      })
    })
}

function handleSelectChange(event){
  if(event.target.value == '') {
    let produtosDivs = Array.from(document.getElementsByClassName('produtos'))
    produtosDivs.forEach((value)=>{
      value.style.display = 'flex'
    })
  }else{
    let testClass
    let produtosDivs2 = Array.from(document.getElementsByClassName('produtos'))
    produtosDivs2.forEach((value)=>{
      value.style.display = 'flex'
      testClass = (value.className).split('produtos')
      if(testClass[1].trim() == select.value) return
      value.style.display = 'none'
    })
  }
}

function populateSelect(data){
  let categorias = []
    categorias = data.map((value)=>{
      return value.category
    })
    categorias = [...new Set(categorias)]
    categorias.forEach((value)=>{
      let option = document.createElement('option');
      option.textContent = value;
      option.value = value;
      select.add(option);
    })
}