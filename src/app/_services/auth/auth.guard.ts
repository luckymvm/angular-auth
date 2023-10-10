import {CanActivateFn, CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {toObservable} from "@angular/core/rxjs-interop";
import {filter, map} from "rxjs";

export const authGuard = (type: 'protected' | 'unprotected'): CanMatchFn => {
    return () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        return toObservable(auth.isAuthenticated).pipe(
            filter(() => !auth.isAuthenticating()),
            map((isAuthenticated) => {
                if ((type === 'unprotected' && !isAuthenticated) || (type === 'protected' && isAuthenticated))
                    return true;
                return router.parseUrl('/signin');
            })
        );
    }
};
