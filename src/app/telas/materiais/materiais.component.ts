import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Material {
  id: string;
  nome: string;
  quantidade: number | null;
  minimo: number | null;
  unidade: string;
  custoUnitario: number | null;
}

@Component({
  selector: 'app-materiais',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="materiais-container" style="max-width: 700px; margin: 30px auto; font-family: sans-serif; font-size: 1rem;">
      <h2 style="color: #8F3B27; margin-bottom: 20px; font-size: 1.5rem;">Gestão de Materiais e Estoque <span aria-hidden="true">🧶</span></h2>
      
      <!-- Formulário de Cadastro -->
      <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-top: 5px solid #8F3B27; margin-bottom: 30px;">
        <h3 style="color: #2B2320; margin-top: 0; margin-bottom: 16px; font-size: 1.2rem;">Registrar Novo Material</h3>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Nome do Material:</label>
          <input type="text" [(ngModel)]="novoNome" placeholder="Ex: Fio Barroco" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Quantidade:</label>
            <input type="number" [(ngModel)]="novaQuantidade" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Estoque Mínimo:</label>
            <input type="number" [(ngModel)]="novoMinimo" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Unidade:</label>
            <input type="text" [(ngModel)]="novaUnidade" placeholder="Ex: novelos, metros" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Custo Unitário (R$):</label>
            <input type="number" [(ngModel)]="novoCusto" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
        </div>

        <button (click)="adicionarMaterial()" style="width: 100%; background: #8F3B27; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; min-height: 44px; font-size: 1rem;">
          Registrar Material
        </button>
      </div>

      <!-- Lista de Materiais Registados -->
      <h3 style="color: #2B2320; margin-bottom: 12px; font-size: 1.2rem;">Materiais Registrados</h3>
      <div>
        @for (mat of materiais(); track mat.id) {
          <div style="background: white; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; box-shadow: 0 2px 6px rgba(43, 35, 32, 0.08); border-left: 5px solid #8F3B27; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong style="font-size: 1.1rem; color: #2B2320;">{{ mat.nome }}</strong><br>
              <span style="color: #495057; font-size: 0.95rem;">Qtd: {{ mat.quantidade }} {{ mat.unidade }} (Mín: {{ mat.minimo }}) | Custo: R$ {{ (mat.custoUnitario || 0).toFixed(2).replace('.', ',') }}</span>
            </div>
            @if (mat.quantidade !== null && mat.minimo !== null && mat.quantidade <= mat.minimo) {
              <span style="background: #ffc107; color: #212529; padding: 6px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; text-transform: uppercase;">
                <span aria-hidden="true">⚠️</span> Estoque Baixo
              </span>
            }
          </div>
        } @empty {
          <p style="color: #666; font-style: italic;">Nenhum material registrado ainda.</p>
        }
      </div>
    </main>
  `
})
export class MateriaisComponent {
  materiais = signal<Material[]>([
    { id: '1', nome: 'Fio de Malha Premium', quantidade: 5, minimo: 2, unidade: 'novelos', custoUnitario: 25.0 },
    { id: '2', nome: 'Agulha de Crochê 4mm', quantidade: 1, minimo: 2, unidade: 'unidades', custoUnitario: 12.0 }
  ]);

  novoNome = '';
  novaQuantidade: number | null = null;
  novoMinimo: number | null = null;
  novaUnidade = '';
  novoCusto: number | null = null;

  adicionarMaterial(): void {
    if (!this.novoNome.trim()) return;

    const novo: Material = {
      id: Date.now().toString(),
      nome: this.novoNome,
      quantidade: this.novaQuantidade ?? 0,
      minimo: this.novoMinimo ?? 0,
      unidade: this.novaUnidade || 'unid',
      custoUnitario: this.novoCusto ?? 0
    };

    this.materiais.update(lista => [...lista, novo]);
    this.novoNome = '';
    this.novaQuantidade = null;
    this.novoMinimo = null;
    this.novaUnidade = '';
    this.novoCusto = null;
  }
}