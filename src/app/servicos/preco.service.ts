/**
 * Serviço de cálculo de preço baseado em custos de materiais, horas de trabalho e margem de lucro.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrecoService {
  /**
   * Calcula o preço final do produto arredondando para centavos.
   * Lança RangeError se houver valores negativos.
   */
  calcularPreco(custoMateriais: number, horasTrabalho: number, valorHora: number, margemPercentual: number): number {
    if (custoMateriais < 0 || horasTrabalho < 0 || valorHora < 0 || margemPercentual < 0) {
      throw new RangeError('Valores negativos não são permitidos no cálculo de preço.');
    }

    const custoMaoDeObra = horasTrabalho * valorHora;
    const custoTotal = custoMateriais + custoMaoDeObra;
    const multiplicador = 1 + margemPercentual / 100;
    
    const precoBruto = custoTotal * multiplicador;
    
    // Arredonda estritamente para 2 casas decimais (centavos)
    return Math.round((precoBruto + Number.EPSILON) * 100) / 100;
  }
}