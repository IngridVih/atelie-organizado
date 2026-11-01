/**
 * Serviço de controle e baixa de estoque atômico para materiais de crochê.
 */
import { Injectable } from '@angular/core';
import { Material, ItemComposicaoPeca, EstoqueInsuficienteError } from '../dominio/modelos';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  
  /**
   * Verifica se há saldo suficiente para uma lista de composição e realiza a baixa (tudo ou nada).
   * Soma materiais repetidos na composição antes da verificação.
   */
  verificarEBaixarEstoque(composicao: ItemComposicaoPeca[], materiaisAtuais: Material[]): Material[] {
    // 1. Consolidar materiais repetidos na composição
    const mapaNecessidade = new Map<string, number>();
    for (const item of composicao) {
      const atual = mapaNecessidade.get(item.materialId) || 0;
      mapaNecessidade.set(item.materialId, atual + item.quantidadeNecessaria);
    }

    const materiaisFaltantes: Array<{ materialId: string; necessario: number; disponivel: number }> = [];
    const mapaEstoque = new Map<string, Material>(materiaisAtuais.map(m => [m.id, { ...m }]));

    // 2. Verificar disponibilidade de cada material consolidado
    for (const [materialId, necessario] of mapaNecessidade.entries()) {
      const material = mapaEstoque.get(materialId);
      const disponivel = material ? material.quantidade : 0;

      if (!material || disponivel < necessario) {
        materiaisFaltantes.push({
          materialId,
          necessario,
          disponivel
        });
      }
    }

    // 3. Se faltar qualquer material, lança erro de domínio e não altera nada
    if (materiaisFaltantes.length > 0) {
      throw new EstoqueInsuficienteError(materiaisFaltantes);
    }

    // 4. Executar a baixa com sucesso (tudo ou nada)
    for (const [materialId, necessario] of mapaNecessidade.entries()) {
      const material = mapaEstoque.get(materialId)!;
      material.quantidade = Math.round((material.quantidade - necessario) * 100) / 100;
      material.atualizadoEm = new Date();
    }

    return Array.from(mapaEstoque.values());
  }

  verificarAlertaSaldoBaixo(material: Material): boolean {
    return material.quantidade <= material.estoqueMinimo;
  }
}