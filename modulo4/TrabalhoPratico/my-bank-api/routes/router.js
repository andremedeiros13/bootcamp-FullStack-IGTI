const express = require("express");
const accountModel = require("../models/account");

const router = express.Router();

router.patch("/depositar", async (request, response) => {
  const { agencia, conta, balance } = request.body;

  const account = await accountModel.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Nenhuma conta encontrada" });
  }

  if (balance < 0) {
    return response.status(404).json({ message: "O valor não pode ser negativo" });
  }

  const accountUpdated = await accountModel.findOneAndUpdate(
    { agencia: agencia, conta: conta },
    { balance: account.balance + balance },
    { new: true }
  );

  return response.json(accountUpdated);
});
router.patch("/sacar", async (request, response) => {
  const { agencia, conta, balance } = request.body;

  const account = await accountModel.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Conta não encontrada" });
  }

  if (balance < 0) {
    return response.status(404).json({ message: "Valor invalido para saque" });
  }

  if (account.balance - balance - 1 < 0) {
    return response.status(404).json({ message: "Saldo Insuficiente" });
  }

  const accountUpdated = await accountModel.findOneAndUpdate(
    { agencia: agencia, conta: conta },
    { balance: account.balance - balance - 1 },
    { new: true }
  );

  return response.json(accountUpdated);
});
router.get("/account", async (request, response) => {
  const { agencia, conta } = request.body;

  const account = await accountModel.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Conta não encontrada" });
  }

  return response.json(account);
});
router.delete("/deleteConta", async (request, response) => {
  const { agencia, conta } = request.body;

  const account = await accountModel.findOne({ agencia: agencia, conta: conta });

  if (!account) {
    return response.status(404).json({ message: "Conta não encontrada" });
  }

  const accountDeleted = await accountModel.findOneAndDelete({
    agencia: agencia,
    conta: conta,
  });

  const contasAtivas = await accountModel.find({ agencia: agencia });

  if (!contasAtivas) {
    return response.json(0);
  }

  return response.json(contasAtivas.length);
});
router.patch("/transferir", async (request, response) => {
  const { contaOrigem, contaDestino, balance } = request.body;

  const accountOrigem = await accountModel.findOne({ conta: contaOrigem });

  const accountDestino = await accountModel.findOne({ conta: contaDestino });

  if (!accountOrigem) {
    return response
      .status(404)
      .json({ message: "A conta de Origem não encontrada" });
  }

  if (!accountDestino) {
    return response
      .status(404)
      .json({ message: "A conta de Destino não encontrada" });
  }

  if (accountOrigem.agencia === accountDestino.agencia) {
    if (accountOrigem.balance - balance < 0) {
      return response.status(404).json({ message: "Saldo insuficiente" });
    }

    const accountOrigenUpdated = await accountModel.findOneAndUpdate(
      { conta: contaOrigem },
      { balance: accountOrigem.balance - balance },
      { new: true }
    );

    const accountDestinoUpdated = await accountModel.findOneAndUpdate(
      { conta: contaDestino },
      { balance: accountDestino.balance + balance },
      { new: true }
    );
  } else {
    if (accountOrigem.balance - balance - 8 < 0) {
      return response.status(404).json({ message: "Saldo insuficiente" });
    }

    const accountOrigenUpdated = await accountModel.findOneAndUpdate(
      { conta: contaOrigem },
      { balance: accountOrigem.balance - balance - 8 },
      { new: true }
    );

    const accountDestinoUpdated = await accountModel.findOneAndUpdate(
      { conta: contaDestino },
      { balance: accountDestino.balance + balance },
      { new: true }
    );
  }

  const accountOrigemNewBalance = await accountModel.findOne({
    conta: contaOrigem,
  });

  return response.json(accountOrigemNewBalance);
});
router.get("/consultarmedia", async (request, response) => {
  const { agencia } = request.body;

  const accounts = await accountModel.find({ agencia: agencia });

  if (!accounts) {
    return response.json(0);
  }

  const soma = accounts.reduce((acc, item) => {
    return acc + item.balance;
  }, 0);

  const media = (soma * 1.0) / accounts.length;

  return response.json(media);
});
router.get("/consultarmenorsaldo", async (request, response) => {
  const { num } = request.body;

  const accounts = await accountModel.find({});

  if (!accounts) {
    return response.json(0);
  }

  const accountsOrderMenor = accounts.sort((a, b) => {
    return a.balance - b.balance;
  });

  const accountsRetorno = [];

  for (var i = 0; i < num; i++) {
    accountsRetorno.push(accountsOrderMenor[i]);
  }

  return response.json(accountsRetorno);
});
router.get("/consultarmaiorsaldo", async (request, response) => {
  const { num } = request.body;

  const accounts = await accountModel.find({});

  if (!accounts) {
    return response.json(0);
  }

  const accountsOrderMenor = accounts.sort((a, b) => {
    return b.balance - a.balance;
  });

  const accountsRetorno = [];

  for (var i = 0; i < num; i++) {
    accountsRetorno.push(accountsOrderMenor[i]);
  }

  return response.json(
    accountsRetorno.sort((a, b) => {
      return a.balance - b.balance;
    })
  );
});
router.get("/consultarprivate", async (request, response) => {
  const accounts = await accountModel.find({});

  if (!accounts) {
    return response.json(0);
  }

  var maiorValor = new Map();

  for (var i = 0; i < accounts.length; i++) {
    if (!maiorValor.get(accounts[i].agencia)) {
      maiorValor.set(accounts[i].agencia, accounts[i]);
    } else {
      if (maiorValor.get(accounts[i].agencia).balance < accounts[i].balance) {
        maiorValor.set(accounts[i].agencia, accounts[i]);
      }
    }
  }

  for (const acc of maiorValor) {
    await accountModel.findOneAndUpdate(
      { conta: acc[1].conta, agencia: acc[1].agencia },
      { agencia: 99 },
      { new: true }
    );
  }

  const accounts99 = await accountModel.find({ agencia: 99 });

  return response.json(accounts99);
});
module.exports = router;
