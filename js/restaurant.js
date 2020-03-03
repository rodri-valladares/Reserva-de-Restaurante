var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

Restaurant.prototype.reservarHorario = function(horarioReservado) {
    horariosConReservas= this.horarios.filter(horario => horario!=horarioReservado);
    this.horarios=horariosConReservas;
    return;
}

Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

//Funciones utilizadas en obtener puntuacion
function sumatoria(arrayCalificaciones){
    var sumatoria = 0;
    arrayCalificaciones.forEach(function(numero){
        sumatoria+=numero
    }); 
    return sumatoria; 
}

function promedio(arrayCalificaciones){
    var promedio = sumatoria(arrayCalificaciones) / arrayCalificaciones.length;
    return Math.round(promedio*10) / 10;
}

Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return promedio(this.calificaciones);
    }
}

