import { Grid2 } from "@mui/material";
import HeaderPerfil from "./HeaderPerfil";
import ContenidoPerfil from "./ContenidoPerfil";

export default function PaginaPerfil() {
  return (
    <Grid2 container>
        <Grid2 size={12}>
            <HeaderPerfil />
            <ContenidoPerfil />
        </Grid2>
    </Grid2>
  )
}
