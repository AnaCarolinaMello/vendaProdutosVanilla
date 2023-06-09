setTimeout(()=>{
  const loader = document.querySelector('#divLoader')
  const divPesquisa = document.querySelector('#pesquisa')
  const content = document.querySelector('main')
  const header = document.querySelector('header')
  loader.style.display = 'none'
  header.style.display = 'flex'
  divPesquisa.style.display = 'flex'
  content.style.display = 'flex'
}, 1800);

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

const menuIcon = document.querySelector('.menu-icon')
const menuMini = document.querySelector('.menuMini')
const closeButton = document.querySelector('#close')
const body = document.querySelector('body')
menuMini.style.display = 'none'
menuIcon.addEventListener('click', ()=>{
    menuMini.style.display = 'flex'
    menuIcon.style.display = 'none'
    body.style = 'overflow: hidden;'
})
closeButton.addEventListener('click', ()=>{
    if(window.innerWidth > 787) menuIcon.style.display = 'none'
    else menuIcon.style.display = 'block'
    menuMini.style.display = 'none'
    body.style = 'overflow: scroll;'
})

async function handleSearchClick(){
    let main = document.querySelector("main")
    const divLoaderPesquisa = document.querySelector('#divLoaderPesquisa')
    const notFound = document.querySelector('#notFound')
    divLoaderPesquisa.style.display = 'flex'
    main.style.display = 'none'
    notFound.style.display = 'none'
    main.innerHTML = ''
    if(input.value == '') {
      setTimeout(()=>{
        main.style.display = 'flex'
        notFound.style.display = 'flex'
        divLoaderPesquisa.style.display = 'none'
      }, 1800)
      return
    }
    // await getSearch(input.value)
    // let searchProdutos = produtos
    let searchProdutos = produtos.filter(x => x.title.toLowerCase().includes(input.value.toLowerCase()) || x.category.toLowerCase().includes(input.value.toLowerCase()))
    if(searchProdutos.length < 1) {
      console.log(!searchProdutos.length< 1)
      setTimeout(()=>{
        notFound.style.display = 'flex'
        main.style.display = 'flex'
        divLoaderPesquisa.style.display = 'none'
        console.log(main)
      }, 1800)
      return
    }
    searchProdutos.forEach((value)=>{
        main.innerHTML += `<div id=${value.id} class="produtos ${value.category}">
        <h2>${value.title}</h2>
        <img src=${value.image} alt=${value.title} />
        <div class='descricao' id="descricao${value.id}">${value.description}</div>
        <h3 class='preco'>Preço: R$ ${value.price}</h3>
        <a href="detalhes.html?id=${value.id}" id="button${value.id}"><button>Detalhes</button></a>
      </div>`
      document.querySelectorAll(`#descricao${value.id} p`).forEach((element)=>{
        element.style = "text-align: center"
      })
      document.querySelector(`#button${value.id}`).addEventListener('click', ()=>{
        window.location.assign(`detalhes.html?id=${value.id}`)
      })
    })
    setTimeout(()=>{
      main.style.display = 'flex'
      notFound.style.display = 'none'
      divLoaderPesquisa.style.display = 'none'
    }, 1800)
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

function checkMiniMenu(){
  if(window.innerWidth <= 787) menuIcon.style.display = 'block'
  else menuIcon.style.display = 'none'
}

const mediaQueryList = window.matchMedia('(max-width: 787px)');
mediaQueryList.addListener((mediaQueryList)=>{
    if (mediaQueryList.matches) {
        checkMiniMenu()
    }else{
      menuIcon.style.display = 'none'
    }
});