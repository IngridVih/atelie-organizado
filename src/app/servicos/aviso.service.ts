import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  mensagemAviso = signal<string | null>(null);

  mostrar(mensagem: string, duracaoMs: number = 3000): void {
    this.mensagemAviso.set(mensagem);
    setTimeout(() => {
      if (this.mensagemAviso() === mensagem) {
        this.mensagemAviso.set(null);
      }
    }, duracaoMs);
  }

  limpar(): void {
    this.mensagemAviso.set(null);
  }
}