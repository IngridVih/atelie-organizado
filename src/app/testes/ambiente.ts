/**
 * Utilitários de ambiente para testes (Relógio determinístico e IDs fixos).
 */
export class RelogioSimulado {
  constructor(private dataFixa: Date = new Date('2026-06-01T10:00:00Z')) {}

  agora(): Date {
    return new Date(this.dataFixa);
  }

  avancarDias(dias: number): void {
    this.dataFixa.setDate(this.dataFixa.getDate() + dias);
  }
}

let contadorId = 1;
export function gerarIdFicticio(prefixo: string = 'id'): string {
  return `${prefixo}-${contadorId++}`;
}

export function resetarGeradorId(): void {
  contadorId = 1;
}