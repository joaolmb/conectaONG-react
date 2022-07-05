import React from 'react'
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./Login.css"


function Login() {


    return (
        <>
            <Grid container className="grid1">
                <Grid xs={6} container justifyContent="flex-end" alignItems="center">
                    <Box paddingX={20} className="card">
                        <form>
                            <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className="textos1">Entrar</Typography>
                            <TextField id="usuario" label="usuário" variant="outlined" name="usuario" margin="normal" fullWidth />
                            <TextField id="senha" label="senha" variant="outlined" name="senha" margin="normal" type="password" fullWidth />
                            <Box marginTop={2} textAlign="center">
                                <Link to="/home" className="text-decorator-none">
                                    <Button type="submit" variant="contained" className="botao">Logar</Button>
                                </Link>
                            </Box>
                        </form>
                        <Box display="flex" justifyContent="center" marginTop={2}>
                            <Box marginRight={1}>
                                <Typography variant="subtitle1" gutterBottom align="center">Não tem uma conta?</Typography>
                            </Box>
                            <Link to='/cadastro'>
                                <Typography variant="subtitle1" gutterBottom align="center" className="textos1">Cadastre-se</Typography>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={6} container justifyContent="flex-start" alignItems="center">
                    <Box paddingX={20} className="imagem">
                    </Box>
                </Grid>
            </Grid >
        </>
    )
}

export default Login