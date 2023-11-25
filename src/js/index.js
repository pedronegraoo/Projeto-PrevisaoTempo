const key = "51b74af4c855e86544b050da83102b41";

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnAcionado();
  }
});

function btnAcionado() {
  const cidade = document.querySelector(".input-town").value;

  localizarCidade(cidade);
}

async function localizarCidade(cidade) {
  const dados = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
  ).then((resposta) => resposta.json());

  if (dados.name !== undefined) {
    dadosNaTela(dados);
  } else {
    alert("Cidade não encontrada. Tente novamente");
  }
}

function dadosNaTela(dados) {
  console.log(dados);
  document.querySelector(".text-town").textContent = "Tempo em " + dados.name;
  document.querySelector(".temp-min").textContent =
    "Min " + Math.floor(dados.main.temp_min) + "°";
  document.querySelector(".temp").textContent =
    Math.floor(dados.main.temp) + "°";
  document.querySelector(".temp-max").textContent =
    "Max " + Math.floor(dados.main.temp_max) + "°";
  document.querySelector(
    ".img-icon"
  ).src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
  document.querySelector(".text-icon").textContent =
    dados.weather[0].description;
  document.querySelector(".umidade").textContent =
    "UMIDADE " + dados.main.humidity + "%";
}
