import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Select,
  Typography,
  CircularProgress,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

function FormPacientes() {

    const [pacientes, setPacientes] = useState({
        id_paciente:"PA",
        tipo_documento :"",
        num_documento :"",
        nombres :"",
        ape_pat :"",
        ape_mat :"",
        fecha_nac:"",
        edad:""
        
      });
    
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)
    const classes = useStyles();
    
    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        setLoading(true)

        if (editing){
            console.log('update')
            const response = await fetch(
                "http://localhost:4000/lab/" + params.id,
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(pacientes),
                });
                navigate('/tablaPacientes')
            const data = await response.json();
            console.log(data)

        }else{
            const res= await fetch('http://localhost:4000/lab',{
            method:'POST',
            body: JSON.stringify(pacientes),
            headers:{"Content-Type": "application/json"},
            })
            const data =await res.json();
            console.log(data);
            console.log(pacientes);
        }

        setLoading(false)
        navigate('/tablaPacientes')
    }


    const handleChange = (e) =>
    setPacientes({ ...pacientes, [e.target.name]: e.target.value });

    const loadPaciente = async (id) => {
        const response = await fetch(`http://localhost:4000/lab/${id}`);
        const data = await response.json();
        console.log(data)
        setPacientes({tipo_documento:data.tipo_documento,num_documento:data.num_documento,nombres:data.nombres, ape_pat:data.ape_pat, ape_mat:data.ape_mat, fecha_nac:data.fecha_nac, edad:data.edad });
        setEditing(true);
    };

    useEffect(()=>{

        if(params.id){
            loadPaciente(params.id);
        }

    }, [])
    
    return (
        <Grid
        container
        alignItems='center'
        direction='column'
        justifyContent='center'>

            <Grid item xs={3}>
                <Card
                sx= {{mt:5}}
                style={{
                    backgroundColor: "white",
                    padding: "1rem",
                  }}
                >
                    <Typography ariant="h5" textAlign="center" color="black">
                        Crear Paciente
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>

                        <TextField
                            variante='filled'
                            label='Tipo Documento'
                    
                            sx={{
                                display: "block",
                                margin: ".5rem 0",
                              }}
                              value={pacientes.tipo_documento}
                              name= "tipo_documento"
                              onChange={handleChange}
                              inputProps={{ style: { color: "black" } }}

                            >
                        </TextField>


                        <TextField
                            variante='filled'
                            label='N° documento'
                    
                            sx={{
                                display: "block",
                                margin: ".5rem 0",
                              }}
                              name= "num_documento"
                              value={pacientes.num_documento}
                              onChange={handleChange}
                              inputProps={{ style: { color: "black" } }}

                            >
                        </TextField>

                        

                        <TextField
                            variante='filled'
                            label='Nombres'
                            
                            sx={{
                                display: "block",
                                margin: ".5rem 0",
                              }}
                              value={pacientes.nombres}
                              name='nombres'
                              onChange={handleChange}
                              inputProps={{ style: { color: "black" } }}

                            >
                        </TextField>

                        <TextField
                            variante='filled'
                            label='Apellido Paterno'
                            sx={{
                                display: "block",
                                margin: ".5rem 0",
                              }}
                              value={pacientes.ape_pat}
                              name='ape_pat'
                              onChange={handleChange}
                              inputProps={{ style: { color: "black" } }}>
                        </TextField>

                        <TextField
                            variante='filled'
                            label='Apellido Materno'
                            sx={{
                                display: "block",
                                margin: ".5rem 0",
                              }}
                              value={pacientes.ape_mat}
                              name='ape_mat'
                              onChange={handleChange}
                              inputProps={{ style: { color: "black" } }}>
                        </TextField>

                        
                        <TextField
                            variante='filled'
                            label='Fecha Nacimiento'
                            type="date"
                            format="dd/mm/yyyy"
                            placeholder="dd/mm/yyyy"
                            sx={{
                                display: "block",
                                margin: ".5rem 0",
                              }}
                              value={pacientes.fecha_nac}
                              name='fecha_nac'
                              onChange={handleChange}
                              inputProps={{ style: { color: "black" } }}>
                        </TextField>

                        <TextField
                            variante='filled'
                            label='Edad'
                            sx={{
                                display: "block",
                                margin: ".5rem 0",
                              }}
                              value={pacientes.edad}
                              name='edad'
                              onChange={handleChange}
                              inputProps={{ style: { color: "black" } }}>
                        </TextField>
                       

                        {/*falta fecha y edad*/}
                            
                            <Button 
                            varainte= 'contained' 
                            color='primary' 
                            type="submit" 
                            disabled={!pacientes.tipo_documento || !pacientes.num_documento|| !pacientes.nombres|| !pacientes.ape_mat|| !pacientes.ape_pat}>
                                
                                {loading ? (
                                <CircularProgress color="inherit" size={25} />
                                ) : (
                                "Guardar"
                                )}
                            
                            </Button>

                        </form>
                    </CardContent>
                </Card>

            </Grid>

        </Grid>
    )
}

export default FormPacientes
