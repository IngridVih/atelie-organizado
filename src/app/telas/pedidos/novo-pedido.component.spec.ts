import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NovoPedidoComponent } from './novo-pedido.component';

describe('NovoPedidoComponent', () => {
  let component: NovoPedidoComponent;
  let fixture: ComponentFixture<NovoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoPedidoComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir mensagem exata "Informe o prazo de entrega" quando o prazo estiver vazio e manter dados digitados', () => {
    component.clienteNome = 'Maria Artesã';
    component.cor = 'Azul Royal';
    component.prazoEntregaStr = '';
    component.pecaId = 'p1';
    component.valorInformado = 120;

    const eventoMock = { preventDefault: () => {} } as unknown as Event;
    component.salvar(eventoMock);
    fixture.detectChanges();

    expect(component.erroMensagem()).toBe('Informe o prazo de entrega');
    expect(component.clienteNome).toBe('Maria Artesã');
    expect(component.cor).toBe('Azul Royal');
  });
});