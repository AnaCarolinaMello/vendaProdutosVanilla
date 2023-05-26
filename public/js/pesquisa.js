let produtos

const search = document.querySelector("#pesquisar")
search.addEventListener('click', handleSearchClick)

const input = document.querySelector("#pesquisaInput")
input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      handleSearchClick()
    }
  });

async function handleSearchClick(){
    let main = document.querySelector("main")
    main.innerHTML = ''
    if(input.value == '') return
    await getSearch(input.value)
    // let searchProdutos = produtos.filter(x => x.title.toLowerCase().includes(input.value.toLowerCase()) || x.category.toLowerCase().includes(input.value.toLowerCase()))
    let searchProdutos = produtos
    if(!searchProdutos) return
    searchProdutos.forEach((value)=>{
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

async function getSearch(input) {
    try {
      const response = await fetch("http://diwserver.vps.webdock.cloud:8765/products/search?query=" + input);
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      const data = await response.json();
      produtos = data;
    } catch (error) {
      console.error(error);
    }
  }