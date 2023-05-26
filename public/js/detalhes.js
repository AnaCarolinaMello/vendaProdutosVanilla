const id = new URLSearchParams(window.location.id)
fetch("https://fakestoreapi.com/products/"+id)
      .then((response) => response.json())
      .then((data) => populateScreen(data))
      .catch((error) => console.error(error));

function populateScreen(data){
    
}