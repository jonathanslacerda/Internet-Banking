const express = require("express");
const contas = require("./controladores/contas");
const transacoes = require("./controladores/transacoes");
const rotas = express();


rotas.get("/contas", contas.listagemDeContas);
rotas.post("/contas", contas.criarContas);
rotas.put("/contas/:numeroConta/usuario", contas.atualizarConta);
rotas.delete("/contas/:numeroConta", contas.deletarConta);
rotas.get("/contas/saldo", contas.consultarSaldo);
rotas.get("/contas/extrato", contas.consultarExtrato);


rotas.post("/transacoes/depositar", transacoes.depositar);
rotas.post("/transacoes/sacar", transacoes.sacar);
rotas.post("/transacoes/transferir", transacoes.transferir);




module.exports = rotas;