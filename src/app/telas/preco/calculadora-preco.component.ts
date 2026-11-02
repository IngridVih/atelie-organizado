import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora-preco',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="calculadora-container" style="max-width: 700px; margin: 30px auto; font-family: sans-serif; font-size: 1rem;">
      <h2 style="color: #8F3B27; margin-bottom: 20px; font-size: 1.5rem;">Cálculo de Preço <span aria-hidden="true">💡</span></h2>
      
      <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-top: 5px solid #8F3B27; margin-bottom: 30px;">
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Custo dos Materiais (R$):</label>
          <input type="number" [(ngModel)]="custoMateriais" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Horas Gastas:</label>
            <input type="number" [(ngModel)]="horasGastas" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Valor da Hora (R$):</label>
            <input type="number" [(ngModel)]="valorHora" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Margem de Lucro Desejada (&#37;):</label>
          <input type="number" [(ngModel)]="margemLucro" placeholder="" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
        </div>

        <button (click)="calcular()" style="width: 100%; background: #8F3B27; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; min-height: 44px; font-size: 1rem;">
          Calcular Preço Ideal
        </button>
      </div>

      @if (precoFinal() > 0) {
        <div style="background: #ffffff; border-left: 5px solid #28a745; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 6px rgba(43, 35, 32, 0.08);">
          <h3 style="color: #2B2320; margin: 0 0 8px 0; font-size: 1.1rem;">Preço Sugerido de Venda:</h3>
          <p style="font-size: 28px; font-weight: bold; color: #28a745; margin: 0;">R$ {{ precoFinal().toFixed(2).replace('.', ',') }}</p>
        </div>
      }
    </main>
  `
})
export class CalculadoraPrecoComponent {
  custoMateriais: number | null = null;
  horasGastas: number | null = null;
  valorHora: number | null = null;
  margemLucro: number | null = null;

  precoFinal = signal<number>(0);

  calcular(): void {
    const materiais = this.custoMateriais ?? 0;
    const horas = this.horasGastas ?? 0;
    const vHora = this.valorHora ?? 0;
    const margem = this.margemLucro ?? 0;

    const custoTotal = materiais + (horas * vHora);
    const precoCalculado = custoTotal * (1 + (margem / 100));
    this.precoFinal.set(Number(precoCalculado.toFixed(2)));
  }
}