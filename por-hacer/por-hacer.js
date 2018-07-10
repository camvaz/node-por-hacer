const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error(err);
        }
    })
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;

}

let getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
    /* let index = listadoPorHacer.findIndex(tarea => tarea.descripcion == descripcion);
    if (index >= 0) {
        delete listadoPorHacer[index];
        guardarDB();
        return true;
    } else {
        return false;
    } ESTO NO SE HACE PORQUE AL BORRAR QUEDA UN VAALOR NULL EN EL JSON Y TRUENA EL PROGRAMA AL 
    QUERER IMPRIMIR ALGO DEL NULL*/
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}