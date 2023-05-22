import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',pathMatch:'full', redirectTo:'maps'
  },
  {
    path:'maps', loadChildren: ()=> import('./map/map.module').then(m=>m.MapModule),
  },
  {
    path:'alone', loadComponent:() => import('./alone/pages/alone-page/alone-page.component').then(m=>m.AlonePageComponent)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
