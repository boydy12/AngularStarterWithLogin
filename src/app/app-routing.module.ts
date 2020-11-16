import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentMainComponent } from './components/nav/content-main/content-main.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: ContentMainComponent },
  { path: 'home', component: ContentMainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
