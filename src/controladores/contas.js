let { banco, contas, IDUnico, saques, depositos, transferencias } = require("../bancodedados");


const listagemDeContas = (req, res) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: "Por favor, informar a senha"})
    }

    if (senha_banco === banco.senha) {
        return res.status(200).json(contas)
    } else {
        return res.status(400).json({ mensagem: "A senha do banco informada é inválida"})
    }

};


const criarContas = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const verificarCPF = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    });

    if (verificarCPF) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o CPF informado"})
    }

    const verificarEmail = contas.find((conta) => {
        return conta.usuario.email === email
    });

    if (verificarEmail) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o email informado"})
    }

    if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório"})
    };

    if (!cpf) {
        return res.status(400).json({ mensagem: "O CPF é obrigatório"})
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: "A data de nascimento é obrigatório"})
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: "O telefone é obrigatório"})
    }

    if (!email) {
        return res.status(400).json({ mensagem: "O email é obrigatório"})
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "Para sua segurança informe uma senha"})
    }



    const contaNova = {
        numero: IDUnico++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        }
    }

    contas.push(contaNova);

    return res.status(201).json()

};


const atualizarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório"})
    };

    if (!cpf) {
        return res.status(400).json({ mensagem: "O CPF é obrigatório"})
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: "A data de nascimento é obrigatório"})
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: "O telefone é obrigatório"})
    }

    if (!email) {
        return res.status(400).json({ mensagem: "O email é obrigatório"})
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "Para sua segurança informe uma senha"})
    }

    const buscaConta = contas.find((conta) => {
        return Number(conta.numero) === Number(numeroConta)
    });

    if (!buscaConta) {
        return res.status(404).json({ mensagem: "Conta não encontrada"})
    }

    if (cpf !== buscaConta.usuario.cpf) {
        const validarCpf = contas.find((conta) => {
            return conta.usuario.cpf === cpf
        });

        if (validarCpf) {
            return res.status(400).json({ mensagem: "O CPF informado já existe no cadastro!"})
        }
    }

    if (email !== buscaConta.usuario.email) {
        const validarEmail = contas.find((conta) => {
            return conta.usuario.cpf === cpf
        });

        if (validarEmail) {
            return res.status(400).json({ mensagem: "O email informado já existe no cadastro!"})
        }
    }
    
    buscaConta.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };

    return res.status(204).json()


};


const deletarConta = (req, res) => {
    const { numeroConta } = req.params;

    const buscaConta = contas.find((conta) => {
        return Number(conta.numero) === Number(numeroConta)
    });

    if (!buscaConta) {
        return res.status(404).json({ mensagem: "Conta não encontrada"})
    }

    if (buscaConta.saldo > 0) {
        return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero"})
    }

    contas = contas.filter((conta) => {
        return Number(conta.numero) !== Number(numeroConta)
    })

    return res.status(204).json();

};


const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!"})
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "O valor é obrigatório!"})
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

    return res.status(200).json({ saldo: buscaConta.saldo});
};


const consultarExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "O número da conta é obrigatório!"})
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "O valor é obrigatório!"})
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

    const listarDepositos = depositos.filter((deposito) => {
        return deposito.numero_conta === Number(numero_conta);
    })

    const listarSaques = saques.filter((saque) => {
        return saque.numero_conta === Number(numero_conta);
    })

    const listarTranferencias = transferencias.filter((transferencia) => {
        return transferencia.numero_conta === Number(numero_conta);
    })

    return res.status(200).json(
        {   depositos: listarDepositos,
            saques: listarSaques,
            transferencias: listarTranferencias
        }
    )

};


module.exports = {
    listagemDeContas,
    criarContas,
    atualizarConta,
    deletarConta,
    consultarSaldo,
    consultarExtrato
}