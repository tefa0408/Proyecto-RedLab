import React, { useState, useEffect } from "react";
// import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography ,Box} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TablaPacientes = () => {
  const [paciente, setPacientes] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    const response = await fetch("http://localhost:4000/lab");
    const data = await response.json();
    setPacientes(data);
  };


  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/lab/${id}`, {
        method: "DELETE",
      });
      
      setPacientes(paciente.filter((task) => task.id !== id));
      navigate('/')
      navigate('/tablaPacientes')

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
    <br /><br />
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell align="right">Tipo Documento</TableCell>
            <TableCell align="right">N° Documento</TableCell>
            <TableCell align="right">Nombres</TableCell>
            <TableCell align="right">Apellido Paterno</TableCell>
            <TableCell align="right">Apellido Materno</TableCell>
            <TableCell align="right">Fecha Nacimiento</TableCell>
            <TableCell align="right">Edad</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paciente.map((task) => (
            <TableRow
              key={task.id_system}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.id_paciente}
              </TableCell>
              <TableCell align="right">{task.tipo_documento}</TableCell>
              <TableCell align="right">{task.num_documento}</TableCell>
              <TableCell align="right">{task.nombres}</TableCell>
              <TableCell align="right">{task.ape_pat}</TableCell>
              <TableCell align="right">{task.ape_mat}</TableCell>
              <TableCell align="right">{task.fecha_nac}</TableCell>
              <TableCell align="right">{task.edad}</TableCell>
              <TableCell size="medium" align="center">
              <Box sx={{ '& button': { m: 1 } }}>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={() => navigate(`/formPacientes/${task.id_system}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => handleDelete(task.id_system)}
                style={{ marginLeft: ".5rem" }}
              >
                Eliminar
              </Button>
              </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
    </>
  );
};

export default TablaPacientes;