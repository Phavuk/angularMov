import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// interface s metodou canDeactivate
export interface CanDeactivateComponent {
  canDeactivate(): boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
// classa guardy s implementaciou interfecu ktory sme si vyrobili vyssie
export class DeactivateGuard implements CanDeactivate<CanDeactivateComponent> {
  // pouzitie metody v classe
  canDeactivate(
    component: CanDeactivateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
