import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido } from '../../dominio/modelos';
import { formatarDataBrasileira } from '../../dominio/datas';

@Component({
  selector: 'app-cartao-pedido',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="cartao-pedido" [class.entregue]="pedido.situacao === 'entregue'">
      <header class="cartao-header">
        <span class="badge" [class]="pedido.situacao">
          {{ obterTextoSituacao(pedido.situacao) }}
        </span>
        <span class="prazo">Prazo: {{ formatarData(pedido.prazoEntrega) }}</span>
      </header>

      <div class="cartao-corpo">
        <h3 style="font-size: 1.1rem; color: #2B2320; margin: 0 0 0.4rem 0;">Cliente: {{ pedido.clienteId }}</h3>
        <p style="margin: 0 0 0.3rem 0; font-size: 0.95rem; color: #495057;"><strong>Peça:</strong> {{ pedido.pecaId }}</p>
        <p style="margin: 0 0 0.3rem 0; font-size: 0.95rem; color: #495057;"><strong>Cor:</strong> {{ pedido.cor }}</p>
        @if (pedido.medidas) {
          <p style="margin: 0 0 0.3rem 0; font-size: 0.95rem; color: #495057;"><strong>Medidas:</strong> {{ pedido.medidas }}</p>
        }
        <p class="preco" style="font-size: 1.2rem; font-weight: bold; color: #8F3B27; margin: 0.5rem 0;">R$ {{ pedido.precoCalculado.toFixed(2).replace('.', ',') }}</p>
      </div>

      <footer class="cartao-footer">
        @if (pedido.situacao === 'aguardando') {
          <button 
            type="button" 
            class="btn-avancar" 
            (click)="onAvancar.emit(pedido)"
            aria-label="Iniciar produção do pedido"
          >
            Iniciar produção
          </button>
        } @else if (pedido.situacao === 'em_producao') {
          <button 
            type="button" 
            class="btn-avancar" 
            (click)="onAvancar.emit(pedido)"
            aria-label="Concluir entrega do pedido"
          >
            Concluir entrega
          </button>
        }
      </footer>
    </article>
  `,
  styles: [`
    .cartao-pedido {
      background: #ffffff;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 6px rgba(43, 35, 32, 0.08);
      border-left: 5px solid #8F3B27;
    }
    .cartao-pedido.entregue {
      border-left-color: #28a745;
      opacity: 0.9;
    }
    .cartao-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .badge {
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    .badge.aguardando { background-color: #ffc107; color: #212529; }
    .badge.em_producao { background-color: #17a2b8; color: #ffffff; }
    .badge.entregue { background-color: #28a745; color: #ffffff; }
    .prazo {
      font-size: 0.9rem;
      color: #495057;
    }
    .cartao-footer {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
    .btn-avancar {
      background-color: #8F3B27;
      color: #ffffff;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      font-size: 0.95rem;
      font-weight: bold;
      cursor: pointer;
      min-height: 44px;
      width: 100%;
    }
    .btn-avancar:hover {
      background-color: #722e1e;
    }
  `]
})
export class CartaoPedidoComponent {
  @Input({ required: true }) pedido!: Pedido;
  @Output() onAvancar = new EventEmitter<Pedido>();

  formatarData(data: Date): string {
    return formatarDataBrasileira(new Date(data));
  }

  obterTextoSituacao(situacao: string): string {
    switch (situacao) {
      case 'aguardando': return 'Aguardando';
      case 'em_producao': return 'Em produção';
      case 'entregue': return 'Entregue';
      default: return situacao;
    }
  }
}