setTimeout(()=>{
      let loader = document.querySelector('#divLoader')
      let content = document.querySelector('#detalhes')
      loader.style.display = 'none'
      content.style.display = 'block'
  }, 1800);

const urlParams  = new URLSearchParams(window.location.search)
const id = urlParams.get('id')
fetch("http://diwserver.vps.webdock.cloud:8765/products/"+id)
      .then((response) => response.json())
      .then((data) => populateScreen(data))
      .catch((error) => console.error(error));

function populateScreen(data){
      console.log(data)
      if(window.innerWidth <= 596){
            voltar.textContent = "<"
      }else{
            voltar.textContent = "<Voltar"
      }
      const imgProduto = document.querySelector("#imagem img")
      const tituloProduto = document.querySelector("#produtoTitulo")
      const precoProduto = document.querySelector("#comprar h2")
      const descricaoProduto = document.querySelector("#descricao")
      imgProduto.src = data.image
      tituloProduto.textContent = data.title
      descricaoProduto.innerHTML = data.description
      precoProduto.textContent = "Preço: R$ " + data.price
}

const mediaQueryList = window.matchMedia('(max-width: 596px)');
mediaQueryList.addListener((mediaQueryList)=>{
      const voltar = document.querySelector("#voltar")
      if (mediaQueryList.matches) {
            if(window.innerWidth <= 596){
                  voltar.textContent = "<"
            }else{
                  voltar.textContent = "&lt; Voltar"
            }
      }
});