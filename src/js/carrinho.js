import { Storage } from "./localStorage.js";

const storage = new Storage();
const car = storage.getCarrinho();

function populate(produtos) {
  const listacarrinho = document.querySelector("#lista-carrinho");
  listacarrinho.innerHTML = "";
  let html = "";

  produtos.forEach((element) => {
    html += `
        <li class="list-group-item">
            <div class="d-flex g-2 justify-content-between align-items-center">
                <div class="col-3">
                    <img src="${
                      element.imagem
                    }" class="card-img-top object-fit-scale"
                        height="100" />
                </div>

                <div class="col-3 text-center">${element.nome}</div>
                
                
                <div class="input-group me-3">
                <input type="number" id="id${
                  element.id
                }" class="form-control" value="${element.quantidade}" >
                  <span class="input-group-text">R$</span>
                  <span class="input-group-text">${element.total.toLocaleString(
                    "pt-BR"
                  )}</span>
                </div>

                
      
              <button class="btn btn-danger col-2" onclick=alterarQuantidade(${
                element.id
              }, 0)>Remover
              </button>
          </div>
        </li>
    `;
  });

  listacarrinho.innerHTML = html;
}
/*
esse aqui pra substituir o do parcelamento talvez
<div class="input-group mb-3">
  <input type="text" class="form-control" aria-label="Text input with dropdown button">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>
*/

populate(car);

car.forEach((element) => {
  const listacarrinho = document.querySelector("#lista-carrinho");
  const inputQtde = listacarrinho.querySelector(`#id${element.id}`);
  inputQtde.addEventListener("change", () => {
    alterarQuantidade(element.id, inputQtde.value);
  });
});

function alterarQuantidade(id, qtd) {
  const filtrado = car.filter((element) => element.id == id);
  const index = car.indexOf(filtrado[0]);

  filtrado[0].quantidade = qtd;
  filtrado[0].total = qtd * filtrado[0].preco;

  if (qtd === 0) {
    car = car.filter((element) => element.id !== id);
    storage.attCarrinho(carrinho);
  } else {
    car[index] = filtrado[0];
    storage.attCarrinho(car);
  }

  window.location.reload();
}
