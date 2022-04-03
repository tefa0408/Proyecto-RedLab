CREATE DATABASE labdb

CREATE TABLE pacientes(
    id_system SERIAL PRIMARY KEY,
    id_paciente VARCHAR(10),
    tipo_documento VARCHAR(255),
    num_documento CHAR(12) UNIQUE,
    nombres VARCHAR(255),
    ape_pat VARCHAR(255),
    ape_mat VARCHAR(255),
    fecha_nac DATE,
    edad integer
);