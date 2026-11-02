import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../servicos/pedido.service';
import { Pedido, SituacaoPedido } from '../../dominio/modelos';
import { CartaoPedidoComponent } from './cartao-pedido.component';

@Component({
  selector: 'app-novo-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, CartaoPedidoComponent],
  template: `
    <main class="novo-pedido-container" style="max-width: 700px; margin: 30px auto; font-family: sans-serif;">
      <h2 style="color: #8F3B27; margin-bottom: 20px;">Registar Novo Pedido 🧶</h2>

      @if (erroMensagem()) {
        <div style="background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 6px; margin-bottom: 15px;">
          {{ erroMensagem() }}
        </div>
      }

      <!-- Formulário de Cadastro -->
      <form (submit)="salvar($event)" style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-top: 5px solid #8F3B27; margin-bottom: 30px;">
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320;">ID / Nome do Cliente:</label>
          <input type="text" [(ngModel)]="clienteId" name="clienteId" placeholder="Ex: Clara Silva" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" />
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320;">ID da Peça:</label>
            <input type="text" [(ngModel)]="pecaId" name="pecaId" placeholder="Ex: Bolsa de Fio de Malha" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" />
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320;">Cor / Detalhes:</label>
            <input type="text" [(ngModel)]="cor" name="cor" placeholder="Ex: Vinho e Cru" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" />
          </div>
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320;">Prazo de Entrega:</label>
            <input type="date" [(ngModel)]="prazoEntregaStr" name="prazoEntregaStr" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" />
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320;">Preço Calculado (R$):</label>
            <input type="number" [(ngModel)]="precoCalculado" name="precoCalculado" placeholder="0.00" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; box-sizing: border-box;" />
          </div>
        </div>

        <button type="submit" style="width: 100%; background: #8F3B27; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; min-height: 44px; font-size: 1rem;">
          Salvar Pedido
        </button>
      </form>

      <!-- Lista de Pedidos Existentes -->
      <h3 style="color: #2B2320; margin-bottom: 12px;">Pedidos Registados</h3>
      <div>
        @for (pedido of pedidoService.pedidos(); track pedido.id) {
          <app-cartao-pedido 
            [pedido]="pedido" 
            (onAvancar)="avancarPedido($event)">
          </app-cartao-pedido>
        } @empty {
          <p style="color: #666; font-style: italic;">Nenhum pedido registado ainda.</p>
        }
      </div>
    </main>
  `
})
export class NovoPedidoComponent {
  pedidoService = inject(PedidoService);

  clienteId = '';
  pecaId = '';
  cor = '';
  prazoEntregaStr = '';
  precoCalculado: number = 0;
  erroMensagem = signal<string | null>(null);

  salvar(event: Event): void {
    event.preventDefault();

    if (!this.prazoEntregaStr) {
      this.erroMensagem.set('Informe o prazo de entrega');
      return;
    }

    if (!this.clienteId || !this.pecaId || !this.precoCalculado) {
      this.erroMensagem.set('Por favor, preencha os campos obrigatórios.');
      return;
    }

    this.erroMensagem.set(null);

    this.pedidoService.adicionarPedido({
      donoId: 'demo-user',
      clienteId: this.clienteId,
      pecaId: this.pecaId,
      cor: this.cor,
      medidas: 'Padrão',
      prazoEntrega: new Date(this.prazoEntregaStr),
      precoCalculado: this.precoCalculado,
      situacao: 'aguardando',
      baixaEstoqueFeita: false,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    });

    // Limpar formulário
    this.clienteId = '';
    this.pecaId = '';
    this.cor = '';
    this.prazoEntregaStr = '';
    this.precoCalculado = 0;
  }

  avancarPedido(pedido: Pedido): void {
    try {
      const novaSituacao = this.pedidoService.avancarSituacao(pedido);
      pedido.situacao = novaSituacao;
      pedido.atualizadoEm = new Date();
    } catch (e) {
      console.error('Erro ao avançar situação', e);
    }
  }
}