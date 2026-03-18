// Classe base
class ComponenteMonitor{

constructor(id){
this.elemento = document.getElementById(id);
}

}


// Classe filha
class CardHardware extends ComponenteMonitor{

constructor(id, valorId){
super(id);
this.valor = document.getElementById(valorId);
}


// método de atualização
atualizarInterface(valor,tipo){

if(tipo === "cpu"){
this.valor.innerText = valor + "%";
}

if(tipo === "ram"){
this.valor.innerText = valor + " GB";
}

if(tipo === "temp"){
this.valor.innerText = valor + " °C";
}


// lógica de alerta
if(tipo === "temp" && valor > 75){
this.elemento.classList.add("alerta-critico");
}else if(tipo === "cpu" && valor > 90){
this.elemento.classList.add("alerta-critico");
}else{
this.elemento.classList.remove("alerta-critico");
}

}

}


// instâncias
const cpuCard = new CardHardware("card-cpu","cpu");
const ramCard = new CardHardware("card-ram","ram");
const tempCard = new CardHardware("card-temp","temp");


// comunicação com servidor
async function atualizar(){

const resposta = await fetch("/api/status");

const dados = await resposta.json();

cpuCard.atualizarInterface(dados.cpu,"cpu");
ramCard.atualizarInterface(dados.ram,"ram");
tempCard.atualizarInterface(dados.temperatura,"temp");

}

// atualização a cada 2 segundos
setInterval(atualizar,2000);