import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import PanelActividad from "../../features/actividades/panel/PanelActividad";
import FormularioActividad from "../../features/actividades/form/FormularioActividad";
import HomePage from "../../features/home/HomePage";
import DetallesActividad from "../../features/actividades/detalles/DetallesActividad";
import Counter from "../../features/counter/Counter";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'actividades', element: <PanelActividad /> },
            { path: 'actividades/:id', element: <DetallesActividad /> },
            { path: 'crearActividad', element: <FormularioActividad key='crear' /> },
            { path: 'editarActividad/:id', element: <FormularioActividad /> },
            { path: 'counter', element: <Counter />}
        ]
    }
])