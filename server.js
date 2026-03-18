const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Classe HardwareEngine
class HardwareEngine {

    gerarCPU(){
        return Math.floor(Math.random() * 100);
    }

    gerarRAM(){
        return (Math.random() * 16).toFixed(2);
    }

    gerarTemperatura(){
        return Math.floor(Math.random() * (90 - 30) + 30);
    }

    gerarStatus(){
        return {
            cpu: this.gerarCPU(),
            ram: this.gerarRAM(),
            temperatura: this.gerarTemperatura()
        }
    }
}

// endpoint
app.get("/api/status", (req,res)=>{

    const engine = new HardwareEngine();

    res.json(engine.gerarStatus());

});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});