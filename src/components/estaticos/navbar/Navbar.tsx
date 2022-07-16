import { ChangeEvent, useEffect, useState } from "react";
import { Box, Avatar, Grid, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Typography, AppBar, Toolbar, Menu, MenuItem } from "@material-ui/core";
import "./Navbar.css"
import { AccountCircle } from "@material-ui/icons";
import InfoIcon from '@mui/icons-material/Info';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokenReducer";
import { addToken } from "../../../store/tokens/action";
import { buscarId } from "../../../services/Service";
import User from "../../../models/User";
import { Home } from "@mui/icons-material";


export default function Navbar() {
    const token = useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    );

    const userId = useSelector<TokenState, TokenState["id"]>(
        (state) => state.id
    );

    const [user, setUser] = useState<User>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        postagem: null
    });

    useEffect(() => {
        if (userId !== undefined) {
            findById(userId)
        }
    }, [userId]);

    async function findById(id: string) {
        buscarId(`/usuarios/${userId}`, setUser, {
            headers: {
                'Authorization': token
            }
        })
    }

    // var fotoPerfil = user.foto;
    // console.log(fotoPerfil);
    // console.log(user.foto);

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();

    let navigate = useNavigate();

    function goLogout() {
        dispatch(addToken(""))
        alert("Usuário deslogado.")
        navigate("/login")
    }

    function goEditar() {
        navigate(`/atualizarusuario/${userId}`)
    }

    var componentsNavbar;
    if (token !== "") {
        componentsNavbar = <AppBar position="sticky" className="appbar">
            <Toolbar variant="dense" className="toolbar">
                <Link to="/feed">
                    <Box className="cursor" >
                        <img src="https://i.imgur.com/H31Qdmr.png" alt="Nome Horizontal" className="nomeHorizontal" />
                    </Box>
                </Link>
                <Box display="flex" justifyContent="start" >
                    <Link to="/feed" className="text-decoration-none">
                        <Box mx={1.5} className="cursor">
                            <Typography className="line0" variant="h6" color="inherit">
                                <Grid className="navBarItem" container >
                                    <Grid container item direction={"column"} alignItems={"center"}>
                                        <Grid item > <Home className="navBarIcon"/> </Grid>
                                        <Grid item className="navBarTxt"> Home </Grid>
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Box>
                    </Link>
                    {/* <Link to="/home" className="text-decoration-none">
                        <Box mx={1.5} className="cursor">
                            <Typography variant="h6" color="inherit">
                                HomeAntiga
                            </Typography>
                        </Box>
                    </Link> */}

                    <Link to="/postagens" className="text-decoration-none">
                        <Box mx={1.5} className="cursor">
                            <Typography className="line0" variant="h6" color="inherit">
                            <Grid className="navBarItem" container >
                                    <Grid container item direction={"column"} alignItems={"center"}>
                                        <Grid item > <LibraryBooksIcon className="navBarIcon"/> </Grid>
                                        <Grid item className="navBarTxt"> Postagens </Grid>
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Box>
                    </Link>
                    {/*<Link to="/tema" className="text-decoration-none">
                        <Box mx={1.5} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/formularioTema" className="text-decoration-none">
                        <Box mx={1.5} className="cursor">
                            <Typography variant="h6" color="inherit">
                                Cadastrar Tema
                            </Typography>
                        </Box>
                    </Link> */}
                    <Link to="/sobre" className="text-decoration-none">
                        <Box mx={1.5} className="cursor">
                            <Typography className="line0" variant="h6" color="inherit">
                            <Grid className="navBarItem" container >
                                    <Grid container item direction={"column"} alignItems={"center"}>
                                        <Grid item > <InfoIcon className="navBarIcon"/> </Grid>
                                        <Grid item className="navBarTxt"> Sobre nós </Grid>
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Box>
                    </Link>

                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                {/* <Avatar
                                    alt={user.nome}
                                    src={user.foto}
                                    sx={{ width: 40, height: 40 }}
                                /> */}
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Typography variant="h6" color="inherit" onClick={goEditar}>
                                        Editar Perfil
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleClose} >
                                    <Typography variant="h6" color="inherit" onClick={goLogout}>
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    } else {

    }

    return (
        <>
            {componentsNavbar}
        </>
    );
}