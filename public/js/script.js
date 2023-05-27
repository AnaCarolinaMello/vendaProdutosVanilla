setTimeout(()=>{
  const loader = document.querySelector('#divLoader')
  const header = document.querySelector('header')
  const titleContent = document.querySelector('#tituloMain')
  const content = document.querySelector('main')
  const footer = document.querySelector('footer')
  loader.style.display = 'none'
  header.style.display = 'flex'
  titleContent.style.display = 'flex'
  content.style.display = 'flex'
  footer.style.display = 'flex'
}, 1800);


fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error(error));


const select = document.querySelector("#categorias")
select.addEventListener('change', handleSelectChange)
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

function setProdutos(data){
    populateSelect(data)
    let main = document.querySelector("main")
    data.forEach((value)=>{
        main.innerHTML += `<div id=${value.id} class="produtos ${value.category}">
        <h2>${value.title}</h2>
        <img src=${value.image} alt=${value.title} />
        <p class='descricao'>${value.description}</p>
        <h3 class='preco'>Preço: R$ ${value.price}</h3>
        <a href="./view/detalhes?id=${value.id}" id="button${value.id}"><button>Detalhes</button></a>
      </div>`
      document.querySelector(`#button${value.id}`).addEventListener('click', ()=>{
        window.location.assign(`./view/detalhes?id=${value.id}`)
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