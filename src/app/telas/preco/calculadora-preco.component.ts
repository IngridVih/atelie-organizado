import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora-preco',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="calculadora-container" style="max-width: 600px; margin: 40px auto; font-family: sans-serif;">
      <h2>Calculadora de Precificação 💡</h2>
      
      <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px;">
          Custo dos Materiais (R$):
          <input type="number" [(ngModel)]="custoMateriais" style="width: 100%; padding: 8px; margin-top: 4px;" />
        </label>

        <label style="display: block; margin-bottom: 8px;">
          Horas Gastas na Peça:
          <input type="number" [(ngModel)]="horasGastas" style="width: 100%; padding: 8px; margin-top: 4px;" />
        </label>

        <label style="display: block; margin-bottom: 8px;">
          Valor da Hora de Trabalho (R$):
          <input type="number" [(ngModel)]="valorHora" style="width: 100%; padding: 8px; margin-top: 4px;" />
        </label>

        <label style="display: block; margin-bottom: 16px;">
          Margem de Lucro Desejada (&#37;):
          <input type="number" [(ngModel)]="margemLucro" style="width: 100%; padding: 8px; margin-top: 4px;" />
        </label>

        <button (click)="calcular()" style="background: #6200ee; color: white; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer; width: 100%;">
          Calcular Preço Ideal
        </button>
      </div>

      <div *ngIf="precoFinal() > 0" style="background: #e8f5e9; border: 1px solid #c8e6c9; padding: 16px; border-radius: 8px; text-align: center;">
        <h3>Preço Sugerido de Venda:</h3>
        <p style="font-size: 24px; font-weight: bold; color: #2e7d32;">R$ {{ precoFinal().toFixed(2) }}</p>
      </div>
    </main>
  `
})
export class CalculadoraPrecoComponent {
  custoMateriais: number = 0;
  horasGastas: number = 0;
  valorHora: number = 15;
  margemLucro: number = 30;

  precoFinal = signal<number>(0);

  calcular(): void {
    const custoTempo = this.horasGastas * this.valorHora;
    const custoTotal = this.custoMateriais + custoTempo;
    const lucro = custoTotal * (this.margemLucro / 100);
    this.precoFinal.set(custoTotal + lucro);
  }
}