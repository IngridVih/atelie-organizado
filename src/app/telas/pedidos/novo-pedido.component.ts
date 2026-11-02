import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../servicos/pedido.service';
import { Pedido } from '../../dominio/modelos';
import { CartaoPedidoComponent } from './cartao-pedido.component';

interface PecaOpcao {
  id: string;
  nome: string;
  preco: number;
}

@Component({
  selector: 'app-novo-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, CartaoPedidoComponent],
  template: `
    <main class="novo-pedido-container" style="max-width: 700px; margin: 30px auto; font-family: sans-serif; font-size: 1rem;">
      <h2 style="color: #8F3B27; margin-bottom: 20px; font-size: 1.5rem;">Registrar Novo Pedido <span aria-hidden="true">🧶</span></h2>

      @if (erroMensagem()) {
        <div style="background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 6px; margin-bottom: 15px; font-weight: 500;" role="alert">
          {{ erroMensagem() }}
        </div>
      }

      @if (sucessoMensagem()) {
        <div style="background-color: #d4edda; color: #155724; padding: 12px; border-radius: 6px; margin-bottom: 15px; font-weight: 500;" role="status">
          {{ sucessoMensagem() }}
        </div>
      }

      <!-- Formulário de Cadastro -->
      <form (submit)="salvar($event)" style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-top: 5px solid #8F3B27; margin-bottom: 30px;">
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Nome do cliente:</label>
          <input type="text" [(ngModel)]="clienteNome" name="clienteNome" placeholder="Ex: Clara Silva" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Peça:</label>
            <select [(ngModel)]="pecaSelecionadaId" name="pecaSelecionadaId" (change)="atualizarPreco()" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px; background: white;">
              <option value="" disabled selected>Escolha a peça</option>
              @for (peca of listaPecas; track peca.id) {
                <option [value]="peca.id">{{ peca.nome }} (R$ {{ peca.preco.toFixed(2) }})</option>
              }
            </select>
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Cor:</label>
            <input type="text" [(ngModel)]="cor" name="cor" placeholder="Ex: Vinho e Cru" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Medidas (máx. 60 caracteres):</label>
            <input type="text" [(ngModel)]="medidas" name="medidas" maxlength="60" placeholder="Ex: 40x50cm" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Preço Calculado (R$):</label>
            <input type="number" [value]="precoCalculado" readonly disabled style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px; background: #e9ecef; color: #495057; cursor: not-allowed;" />
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-weight: bold; margin-bottom: 6px; color: #2B2320; font-size: 1rem;">Prazo de Entrega:</label>
          <input type="date" [(ngModel)]="prazoEntregaStr" name="prazoEntregaStr" style="width: 100%; padding: 12px; border: 1px solid #ced4da; border-radius: 6px; box-sizing: border-box; font-size: 1rem; min-height: 44px;" />
        </div>

        <button type="submit" style="width: 100%; background: #8F3B27; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; min-height: 44px; font-size: 1rem;">
          Registrar Pedido
        </button>
      </form>

      <!-- Lista de Pedidos Registrados -->
      <h3 style="color: #2B2320; margin-bottom: 12px; font-size: 1.2rem;">Pedidos Registrados</h3>
      <div>
        @for (pedido of pedidoService.pedidos(); track pedido.id) {
          <app-cartao-pedido 
            [pedido]="pedido" 
            (onAvancar)="avancarPedido($event)">
          </app-cartao-pedido>
        } @empty {
          <p style="color: #666; font-style: italic;">Nenhum pedido registrado ainda.</p>
        }
      </div>
    </main>
  `
})
export class NovoPedidoComponent {
  pedidoService = inject(PedidoService);

  clienteNome = '';
  pecaSelecionadaId = '';
  cor = '';
  medidas = '';
  prazoEntregaStr = '';
  precoCalculado: number = 0;
  
  erroMensagem = signal<string | null>(null);
  sucessoMensagem = signal<string | null>(null);

  listaPecas: PecaOpcao[] = [
    { id: 'bolsa-malha', nome: 'Bolsa de Fio de Malha', preco: 150.00 },
    { id: 'tapete-cru', nome: 'Tapete Geométrico Cru', preco: 120.00 },
    { id: 'amigurumi', nome: 'Amigurumi Personalizado', preco: 90.00 }
  ];

  atualizarPreco(): void {
    const peca = this.listaPecas.find(p => p.id === this.pecaSelecionadaId);
    this.precoCalculado = peca ? peca.preco : 0;
  }

  salvar(event: Event): void {
    event.preventDefault();
    this.sucessoMensagem.set(null);

    if (!this.clienteNome.trim()) {
      this.erroMensagem.set('Informe o nome do cliente');
      return;
    }

    if (!this.pecaSelecionadaId) {
      this.erroMensagem.set('Escolha a peça');
      return;
    }

    if (!this.cor.trim()) {
      this.erroMensagem.set('Informe a cor');
      return;
    }

    if (!this.prazoEntregaStr) {
      this.erroMensagem.set('Informe o prazo de entrega');
      return;
    }

    const dataPrazo = new Date(this.prazoEntregaStr + 'T00:00:00');
    if (isNaN(dataPrazo.getTime())) {
      this.erroMensagem.set('Informe uma data válida');
      return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (dataPrazo < hoje) {
      this.erroMensagem.set('O prazo não pode ser anterior a hoje');
      return;
    }

    this.erroMensagem.set(null);

    const pecaObj = this.listaPecas.find(p => p.id === this.pecaSelecionadaId);

    this.pedidoService.adicionarPedido({
      donoId: 'demo-user',
      clienteId: this.clienteNome,
      pecaId: pecaObj ? pecaObj.nome : this.pecaSelecionadaId,
      cor: this.cor,
      medidas: this.medidas || 'Padrão',
      prazoEntrega: dataPrazo,
      precoCalculado: this.precoCalculado,
      situacao: 'aguardando',
      baixaEstoqueFeita: false,
      criadoEm: new Date(),
      atualizadoEm: new Date()
    });

    // Feedback visual imediato de sucesso
    this.sucessoMensagem.set('Pedido registado e guardado com sucesso!');

    // Limpar formulário após sucesso
    this.clienteNome = '';
    this.pecaSelecionadaId = '';
    this.cor = '';
    this.medidas = '';
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