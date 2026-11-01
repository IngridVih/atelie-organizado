/**
 * Utilitários de manipulação e formatação de datas alinhados com o padrão brasileiro (pt-BR).
 */

export function parseDataBrasileira(dataStr: string): Date {
  // Espera formato AAAA-MM-DD vindo de inputs de data HTML
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  if (!ano || !mes || !dia) {
    throw new Error('Informe uma data válida');
  }
  const data = new Date(ano, mes - 1, dia);
  if (isNaN(data.getTime())) {
    throw new Error('Informe uma data válida');
  }
  return data;
}

export function formatarDataBrasileira(data: Date): string {
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function obterHojeSemHorario(): Date {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}