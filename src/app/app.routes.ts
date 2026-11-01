import { Routes } from '@angular/router';
import { LoginComponent } from './telas/login/login.component';
import { NovoPedidoComponent } from './telas/pedidos/novo-pedido.component';
import { MateriaisComponent } from './telas/materiais/materiais.component';
import { CalculadoraPrecoComponent } from './telas/preco/calculadora-preco.component';
import { authGuard } from './guardas/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pedidos/novo', component: NovoPedidoComponent, canActivate: [authGuard] },
  { path: 'materiais', component: MateriaisComponent, canActivate: [authGuard] },
  { path: 'precificacao', component: CalculadoraPrecoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];