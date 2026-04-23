import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import PanelActividad from "../../features/actividades/panel/PanelActividad";
import FormularioActividad from "../../features/actividades/form/FormularioActividad";
import HomePage from "../../features/home/HomePage";
import DetallesActividad from "../../features/actividades/detalles/DetallesActividad";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestErrors";
import NoEncontrada from "../../features/errors/NoEncontrada";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/account/LoginForm";
import RequireAuth from "./RequireAuth";
import PaginaPerfil from "../../features/perfiles/PaginaPerfil";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'login', element: <LoginForm /> },
            {
                element: <RequireAuth />, children: [
                    { path: 'actividades', element: <PanelActividad /> },
                    { path: 'actividades/:id', element: <DetallesActividad /> },
                    { path: 'crearActividad', element: <FormularioActividad key='crear' /> },
                    { path: 'editarActividad/:id', element: <FormularioActividad /> },
                    { path: 'perfiles/:id', element: <PaginaPerfil /> }
                ]
            },
            
            { path: 'counter', element: <Counter /> },
            { path: 'test-errors', element: <TestErrors /> },
            { path: 'not-found', element: <NoEncontrada /> },
            { path: 'server-error', element: <ServerError /> },
           
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])