const pool = require('../db')

//mostrar todos los pacientes
const getAllPaciente=async (req,res)=>{

    try {
        const allPacientes= await pool.query('SELECT * FROM pacientes')

        console.log(allPacientes)
        res.jSON(allPacientes.rows)
    } catch (error) {
        res.json({error:error.message});
    }
    
}

//mostrar un paciente
const getPaciente = async(req,res)=>{

    try {
        const {id} = req.params

        const result=await pool.query('SELECT * FROM pacientes WHERE id_system= $1',[id])
        console.log(result)

        if(result.rows.length=== 0) return res.status(404).json({
            message: "Paciente no encontrado"
        })

        res.json(result.rows[0]);
    } catch (error) {
        res.json({error:error.message});
    }
}

//crear paciente
const createPaciente = async(req,res)=>{
    
    const {id_paciente,tipo_documento,num_documento,nombres,ape_pat,ape_mat,fecha_nac,edad}=req.body
    
    try {
        const result=await pool.query('INSERT INTO pacientes (id_paciente, tipo_documento, num_documento, nombres, ape_pat,ape_mat, fecha_nac, edad) VALUES ($1 , $2,  $3, $4, $5, $6, $7, $8) RETURNING *', [
            id_paciente,tipo_documento,num_documento,nombres,ape_pat,ape_mat,fecha_nac,edad
        ]);
        const result2=await pool.query('SELECT id_system FROM pacientes WHERE num_documento= $1', [num_documento]);
        await pool.query("UPDATE pacientes SET id_paciente = CONCAT(id_paciente ,right('000000'||cast($1 as text),6)) WHERE num_documento= $2", [result2.rows[0]["id_system"],num_documento]);

        
        res.json(result.rows[0])
    } catch (error) {
        res.json({error:error.message});
    }
    
}


//eliminar paciente
const deletePaciente = async(req,res)=>{
    const {id }= req.params

    const result=await pool.query ('DELETE FROM pacientes WHERE id_system= $1', [id]);

    if (result.rowCount ===0)
        return res.status(404).json({
            message: "Paciente no encontrado"
        });
    
    return res.sendStatus(204);
}

//actualizar paciente
const updatePaciente = async(req,res)=>{
    const { id }= req.params
    const {id_paciente,tipo_documento,num_documento,nombres,ape_pat,ape_mat,fecha_nac,edad}=req.body 

    console.log(id.padStart(6,0).padStart(8,'PA'))

    const result=await pool.query('UPDATE pacientes SET  id_paciente= $1 ,tipo_documento= $2,num_documento= $3,nombres= $4,ape_pat=$5,ape_mat= $6,fecha_nac= $7,edad= $8 WHERE id_system= $9 RETURNING *',[
        id_paciente,tipo_documento,num_documento,nombres,ape_pat,ape_mat,fecha_nac,edad,id
    ])
    res.send ('actualizando pacientes');

    if(result.rows.length=== 0) 
        return res.status(404).json({
            message: "Paciente no encontrado",
        })

    //console.log(result);
}

function concatenar( id , width)
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // siempre devuelve tipo cadena
}

module.exports = {
    getAllPaciente,
    getPaciente,
    createPaciente,
    deletePaciente,
    updatePaciente
}