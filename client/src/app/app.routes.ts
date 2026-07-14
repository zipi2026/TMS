import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'main',
        loadComponent: () =>
            import('./main/main.component').then((m) => m.MainComponent),
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'tasks', pathMatch: 'full' },
            {
                path: 'tasks',
                loadComponent: () =>
                    import('./tasks/tasks.component').then((m) => m.TasksComponent)
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./users/users.component').then((m) => m.UsersComponent),
                canActivate: [AdminGuard]
            }
        ]
    }
];
