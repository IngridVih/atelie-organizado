import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Material {
  id: string;
  nome: string;
  quantidade: number;
  minimo: number;
  custoInfo?: number; // Adicionado aqui como opcional
  custoUnitario: number;
}

@Component({
  selector: 'app-materiais',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="materiais-container" style="max-width: 600px; margin: 40px auto; font-family: sans-serif;">
      <h2>Gestão de Materiais e Estoque 🧶</h2>
      
      <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
        <h3>Adicionar Novo Material</h3>
        <input type="text" [(ngModel)]="novoNome" placeholder="Nome do material (ex: Fio Barroco)" style="padding: 8px; width: 100%; margin-bottom: 8px;" />
        <input type="number" [(ngModel)]="novaQuantidade" placeholder="Quantidade em estoque" style="padding: 8px; width: 48%; margin-right: 4%; margin-bottom: 8px;" />
        <input type="number" [(ngModel)]="novoCusto" placeholder="Custo unitário (R$)" style="padding: 8px; width: 48%; margin-bottom: 8px;" />
        <button (click)="adicionarMaterial()" style="background: #6200ee; color: white; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer;">Cadastrar Material</button>
      </div>

      <h3>Materiais Cadastrados</h3>
      <ul style="list-style: none; padding: 0;">
        <li *ngFor="let mat of materiais()" style="background: white; border: 1px solid #ddd; padding: 12px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>{{ mat.nome }}</strong><br>
            <span>Qtd: {{ mat.quantidade }} | Custo: R$ {{ mat.custoUnitario.toFixed(2) }}</span>
          </div>
          <span *ngIf="mat.quantidade <= mat.minimo" style="background: #ff5252; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
            ⚠️ Estoque Baixo
          </span>
        </li>
      </ul>
    </main>
  `
})
export class MateriaisComponent {
  materiais = signal<Material[]>([
    { id: '1', nome: 'Fio de Malha Premium', quantidade: 5, minimo: 2, custoInfo: 25.0, custoUnitario: 25.0 },
    { id: '2', nome: 'Agulha de Crochê 4mm', quantidade: 1, minimo: 2, custoInfo: 12.0, custoUnitario: 12.0 }
  ]);

  novoNome = '';
  novaQuantidade: number = 0;
  novoCusto: number = 0;

  adicionarMaterial(): void {
    if (!this.novoNome.trim()) return;

    const novo: Material = {
      id: Date.now().toString(),
      nome: this.novoNome,
      quantidade: this.novaQuantidade || 0,
      minimo: 2,
      custoUnitario: this.novoCusto || 0
    };

    this.materiais.update(lista => [...lista, novo]);
    this.novoNome = '';
    this.novaQuantidade = 0;
    this.novoCusto = 0;
  }
}