import { Routes } from '@angular/router';
import { MembresiaComponent } from './components/membresia/membresia.component';
import { TestacionamientoComponent } from './components/testacionamiento/testacionamiento.component';
import { CreaeditamembresiaComponent } from './components/membresia/creaeditamembresia/creaeditamembresia.component';
import { CreaeditatestacionamientoComponent } from './components/testacionamiento/creaeditatestacionamiento/creaeditatestacionamiento.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';
import { EstacionamientoComponent } from './components/estacionamiento/estacionamiento.component';
import { CreaeditaestacionamientoComponent } from './components/estacionamiento/creaeditaestacionamiento/creaeditaestacionamiento.component';
import { TpagoComponent } from './components/tpago/tpago.component';
import { CreaeditatpagoComponent } from './components/tpago/creaeditatpago/creaeditatpago.component';
import { PagoComponent } from './components/pago/pago.component';
import { CreaeditapagoComponent } from './components/pago/creaeditapago/creaeditapago.component';
import { UsersComponent } from './components/users/users.component';
import { CreaeditausersComponent } from './components/users/creaeditausers/creaeditausers.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CreaeditacomentariosComponent } from './components/comentarios/creaeditacomentarios/creaeditacomentarios.component';
import { Pagoq1Component } from './components/reportes/pagoq1/pagoq1.component';
import { Reporte02mxeBComponent } from './components/reportes/reporte02mxe-b/reporte02mxe-b.component';
import { Reporte01mhrxeBComponent } from './components/reportes/reporte01mhrxe-b/reporte01mhrxe-b.component';
import { Userq1Component } from './components/reportes/userq1/userq1.component';
import { Userq2Component } from './components/reportes/userq2/userq2.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { Pagoq2Component } from './components/reportes/pagoq2/pagoq2.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LandingpageComponent
    },
    {
        path: 'membresia',
        component: MembresiaComponent,
        children: [
            {
                path:'nuevo',component:CreaeditamembresiaComponent
            },
            {
              path:'edicionesm/:id',component:CreaeditamembresiaComponent
            }
        ],
        canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno
    },
    {
        path: 'testacionamiento',
        component: TestacionamientoComponent,
        children: [
            {
                path:'nuevo',component:CreaeditatestacionamientoComponent
            },
            {
              path:'edicioneste/:id',component:CreaeditatestacionamientoComponent
            }
        ],
        canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno
    },
    {
        path: 'estacionamiento',
        component: EstacionamientoComponent,
        children: [
            {
                path:'nuevo',component:CreaeditaestacionamientoComponent
            },
            {
              path:'ediciones/:id',component:CreaeditaestacionamientoComponent
            }
        ],
        canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno
    },
    {
        path: 'homes',
        component: HomeComponent,    
        canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno 
    
    },
    {
        path:'tpago',
        component: TpagoComponent,
        children: [
            {
              path: 'nuevo',
              component: CreaeditatpagoComponent,
            },
            {
              path: 'ediciones/:id',
              component: CreaeditatpagoComponent,
            },
          ],
          canActivate: [segGuard],
    },
    {
        path: 'pago',
        component: PagoComponent,
        children: [
            {
              path: 'nuevo',
              component: CreaeditapagoComponent,
            },
            {
              path: 'ediciones/:id',
              component: CreaeditapagoComponent,
            },
          ],
          canActivate: [segGuard],
    },
    {
      path: 'usuario',
      component: UsersComponent,
      children: [
          {
              path:'nuevo',component:CreaeditausersComponent
          },
          {
            path:'ediciones/:id',component:CreaeditausersComponent
          }
      ],
      canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno
  },
  {
    path: 'role',
    component: RoleComponent,
    children: [
        {
            path:'nuevo',component:CreaeditaroleComponent
        },
        {
          path:'ediciones/:id',component:CreaeditaroleComponent
        }
    ],
    canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno
},
{
  path: 'comentario',
  component: ComentariosComponent,
  children: [
      {
          path:'nuevo',component:CreaeditacomentariosComponent
      },
      {
        path:'ediciones/:id',component:CreaeditacomentariosComponent
      }
  ],
  canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno
},
{
  path: 'pagoq1', component:Pagoq1Component
},
{
  path: 'pagoq2', component: Pagoq2Component,
},
{
  path: 'mxe', component:Reporte02mxeBComponent
},
{
  path: 'mhrxe', component:Reporte01mhrxeBComponent
},
{
  path: 'userq1', component:Userq1Component
},
{
  path: 'userq2', component:Userq2Component
},

];