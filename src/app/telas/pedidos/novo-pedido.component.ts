import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { validarNovoPedido } from '../../dominio/validacao-pedido';
import { AvisoService } from '../../servicos/aviso.service';

@Component({
  selector: 'app-novo-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="novo-pedido-container" role="main">
      <h2>Novo Pedido</h2>
      <form (submit)="salvar($event)">
        <input type="text" [(ngModel)]="clienteNome" name="clienteNome" />
        <input type="text" [(ngModel)]="cor" name="cor" />
        <button type="submit">Salvar</button>
      </form>
    </main>
  `
})
export class NovoPedidoComponent {
  private router = inject(Router);
  private avisoService = inject(AvisoService);

  clienteNome = '';
  pecaId = '';
  cor = '';
  medidas = '';
  prazoEntregaStr = '';
  valorInformado: number = 0;

  erroMensagem = signal<string | null>(null);

  salvar(event: Event): void {
    event.preventDefault();
    this.erroMensagem.set(null);

    try {
      validarNovoPedido({
        clienteNome: this.clienteNome,
        pecaId: this.pecaId,
        cor: this.cor,
        prazoEntregaStr: this.prazoEntregaStr,
        valorInformado: this.valorInformado
      });

      this.avisoService.mostrar('Pedido salvo');
      this.router.navigate(['/inicio']);
    } catch (err: any) {
      this.erroMensagem.set(err.message);
    }
  }
}