import {  Card, CardContent, Grid, Typography } from "@material-ui/core";
import { Box, Avatar, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { buscarId } from "../../../services/Service";
import { TokenState } from "../../../store/tokens/tokenReducer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import "./MinhasPostagens.css"
import User from "../../../models/User";
import { CheckBox, Favorite, FavoriteBorder, Label } from "@material-ui/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";


export default function MinhasPostagens() {
  const [posts, setPosts] = useState<Postagem[]>([])
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );
  let navigate = useNavigate();

  const userId = useSelector<TokenState, TokenState["id"]>(
    (state) => state.id
  );

  const [user, setUser] = useState<User | any>({
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
    console.log(user)
  }, [userId]);

  async function findById(id: string) {
    buscarId(`/usuarios/${userId}`, setUser, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    if (token === "") {
      toast.info('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        });
      navigate("/login")

    }
  }, [token]);
  return (
    <>
      <Grid container direction="column-reverse">
        {user.postagem?.map((post: any) => (
          <Box>
            <Card variant="outlined" className="postagensFeed">
              <CardContent>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="stretch"
                  spacing={1}
                >
                  <Grid item
                    container
                    direction="row"
                    spacing={2}
                  >
                    <Grid item>
                      <Box marginLeft={1} >
                        <Avatar
                          alt={user.nome}
                          src={user.foto}
                          sx={{ width: 72, height: 72 }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h6">{user.nome}</Typography>
                        <Box>
                          <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                            <IconButton>
                              <CreateIcon />
                            </IconButton>
                          </Link>
                          <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none" >
                            <IconButton>
                              <DeleteIcon />
                            </IconButton>
                          </Link>
                        </Box>
                      </Box>
                      <Box>
                        <Typography>Contato: {post.contato}</Typography>
                      </Box>
                      <Box>
                        <Typography>Publicada no dia: {new Date(post.data).toLocaleDateString()}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item >
                    <Box sx={{ textAlign: 'justify', m: 1 }}>
                      <Typography variant="h5" component="h2">{post.titulo}</Typography>
                      <Typography variant="body2" component="p">{post.mensagem}</Typography>
                      <Box display="flex" justifyContent="space-between" sx={{ paddingTop: 1, fontStyle: "italic", fontWeight: "bold" }}>Tema: {post.tema?.tema}
                        <Checkbox icon={<FavoriteBorderIcon color="error" />} checkedIcon={< FavoriteIcon color="error" />} />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box >
        ))
        }
      </Grid >
    </>
  )
}