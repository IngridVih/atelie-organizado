import { parseDataBrasileira, obterHojeSemHorario } from './datas';

export interface DadosNovoPedido {
  clienteNome: string;
  pecaId: string;
  cor: string;
  prazoEntregaStr: string;
  valorInformado: number;
}

export function validarNovoPedido(dados: DadosNovoPedido): void {
  if (!dados.clienteNome || dados.clienteNome.trim() === '') {
    throw new Error('Informe o nome do cliente');
  }
  if (dados.clienteNome.length > 80) {
    throw new Error('O nome do cliente não pode exceder 80 caracteres');
  }
  if (!dados.pecaId || dados.pecaId.trim() === '') {
    throw new Error('Escolha a peça');
  }
  if (!dados.cor || dados.cor.trim() === '') {
    throw new Error('Informe a cor');
  }
  if (dados.cor.length > 40) {
    throw new Error('A cor não pode exceder 40 caracteres');
  }
  if (!dados.prazoEntregaStr || dados.prazoEntregaStr.trim() === '') {
    throw new Error('Informe o prazo de entrega');
  }

  let dataPrazo: Date;
  try {
    dataPrazo = parseDataBrasileira(dados.prazoEntregaStr);
  } catch {
    throw new Error('Informe uma data válida');
  }

  const hoje = obterHojeSemHorario();
  if (dataPrazo.getTime() < hoje.getTime()) {
    throw new Error('O prazo não pode ser anterior a hoje');
  }

  if (dados.valorInformado === undefined || dados.valorInformado === null || dados.valorInformado <= 0) {
    throw new Error('Informe um valor maior que zero');
  }
}