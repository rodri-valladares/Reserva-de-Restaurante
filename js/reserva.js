var Reserva = function(horario, cantPersonas, precioXpersona, codDescuento) {
    this.horario = horario;
    this.cantPersonas = cantPersonas;
    this.precioXpersona = precioXpersona;
    this.codDescuento = codDescuento;
}

Reserva.prototype.calculaPrecioBase = function() {
	if(this.cantPersonas != 0){
    	var precioBase= this.cantPersonas*this.precioXpersona;
    	return precioBase; 
	}
	else{
		return "Debe indicar la cantidad de personas en la reserva";
	}
}

//Funciones utilizadas para el calculo del precio final
function calculaPorcentaje(totalParcial,porcentaje){
	var montoPorcentual= (porcentaje*totalParcial)/100;
	return montoPorcentual;
}

function adicionalesReserva(horario, precioBase){
	var dia=horario.getDay();
	var hora=horario.getHours();
	var minutos=horario.getMinutes();	
	var totalMinutos=hora*60+minutos;
	
	var adicionalHorario=5;
	var adicionalFinde=10;
	var totalAdicional=0;
	
	if((totalMinutos<900 && totalMinutos>720) || (totalMinutos<1320 && totalMinutos>1140)){
		totalAdicional+=calculaPorcentaje(precioBase, adicionalHorario);		
	}

	if(dia==5 || dia==6 || dia==0){
		totalAdicional+=calculaPorcentaje(precioBase, adicionalFinde);
	}
	
	return totalAdicional;
}

function descuentoPersona(personas, precioBase){
	var descuento1=5;
	var descuento2=10;
	var descuento3=15;
	if(personas>8){
		personas=9;
	}

	switch(personas){
		case 4:
		case 5:
		case 6:
			return calculaPorcentaje(precioBase, descuento1);
			break;
		case 7:
		case 8:
			return calculaPorcentaje(precioBase, descuento2);
			break;
		case 9:
			return calculaPorcentaje(precioBase, descuento3);
			break;
		default:
			return 0;
	}
}

function descuentoCodigo(codigo, precioXpersona){
	var descuentoCod1=15;
	var descuentoCod2=200;
	switch(codigo){
		case 'DES15':
			return calculaPorcentaje(precioBase, descuentoCod1);
			break;
		case 'DES200':
			return 200;
			break;
		case 'DES1':
			return precioXpersona;
			break;
	}
}

function descuentos(precioBase, personas, codigoDescuento, precioXpersona){
	var totalDescuento=0;
	totalDescuento = descuentoPersona(personas, precioBase) + descuentoCodigo(codigoDescuento, precioXpersona);
	return totalDescuento;
}

Reserva.prototype.calculaPrecioFinal = function() {
	var precioFinal=0;
	var precioBase= this.calculaPrecioBase();	
	precioFinal = precioBase + adicionalesReserva(this.horario, precioBase) - descuentos(precioBase, this.cantPersonas, this.codDescuento, this.precioXpersona);
	return precioFinal;
}