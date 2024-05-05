let { contas, saques, depositos, transferencias } = require("../bancodedados");
const { format } = require("date-fns");

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!"})
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O valor é obrigatório!"})
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor não pode ser menor ou igual a zero!"})
    }

    const buscaConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    });

    if (!buscaConta) {
        return res.status(404).json({ mensagem: "Conta não encontrada"})
    }

    buscaConta.saldo += valor;

    const registrarDeposito = {
        data: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        numero_conta,
        valor
    }

    depositos.push(registrarDeposito);

    return res.status(201).json();
};


const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!"})
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O valor é obrigatório!"})
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "A senha é obrigatório!"})
    }


    const buscaConta = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    });

    if (!buscaConta) {
        return res.status(404).json({ mensagem: "Conta não encontrada"})
    }

    if (buscaConta.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida"})
    }

    if (buscaConta.saldo >= valor) {
        buscaConta.saldo -= valor;
    } else {
        return res.status(403).json({ mensagem: "Saldo Insuficiente"})
    }
    

    const registrarSaque = {
        data: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        numero_conta,
        valor
    }

    saques.push(registrarSaque);

    return res.status(201).json();
};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: "O número da conta origem é obrigatório!"})
    }

    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: "O número da conta destino é obrigatório!"})
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O valor é obrigatório!"})
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "A senha é obrigatório!"})
    }

    const buscaContaOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    });

    if (!buscaContaOrigem) {
        return res.status(404).json({ mensagem: "Conta de origem não encontrada"})
    }

    if (buscaContaOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha inválida"})
    }

    if (buscaContaOrigem.saldo >= valor) {
        buscaContaOrigem.saldo -= valor;
    } else {
        return res.status(403).json({ mensagem: "Saldo Insuficiente"})
    }

    const buscaContaDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    });

    if (!buscaContaDestino) {
        return res.status(404).json({ mensagem: "Conta de destino não encontrada"})
    }
    
    buscaContaDestino.saldo += valor;

    const registrarTransferencia = {
        data: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registrarTransferencia);

    return res.status(201).json();
};


module.exports = {
    depositar,
    sacar,
    transferir
}