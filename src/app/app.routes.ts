import { Routes } from '@angular/router';
import { LoginComponent } from './telas/login/login.component';
import { NovoPedidoComponent } from './telas/pedidos/novo-pedido.component';
import { MateriaisComponent } from './telas/materiais/materiais.component';
import { CalculadoraPrecoComponent } from './telas/preco/calculadora-preco.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pedidos', component: NovoPedidoComponent },
  { path: 'materiais', component: MateriaisComponent },
  { path: 'preco', component: CalculadoraPrecoComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];