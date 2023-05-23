fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error(error));

function setProdutos(data){
    let main = document.querySelector("main")
    data.forEach((value)=>{
        main.innerHTML += `<div id=${value.id}>
        <h3>${value.title}</h3>
        <img src=${value.image} alt=${value.title} />
        <p>${value.description}</p>
        <a href="./view/detalhes?id=${value.id}"><button>Detalhes</button></a>
      </div>`
    })
}