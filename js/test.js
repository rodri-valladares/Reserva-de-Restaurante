var expect = chai.expect;

describe('Al reservar un horario de un restaurante se modifica el arreglo o no según corresponda ', function(){
	it('Al reservar un horario , este se elimina del arreglo ',function(){
        var restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["12:00", "15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]);
        restaurant.reservarHorario("12:00");        
        expect(restaurant.horarios.length).to.equal(2);
    })

    it('Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual',function(){
        var restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]);
        horariosDisponibles=restaurant.horarios;
        
        restaurant.reservarHorario("12:00");
        
        for(i=0;i<horariosDisponibles.length;i++){
        	expect(restaurant.horarios[i]).to.equal(horariosDisponibles[i]); 
        }   
    })

    it('Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual',function(){
        var restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["15:00", "17:30"], "../img/pizza3.jpg", [8, 4, 6, 7, 7, 9, 1]);
        horariosDisponibles=restaurant.horarios;
        
        restaurant.reservarHorario();
        
        for(i=0;i<horariosDisponibles.length;i++){
        	expect(restaurant.horarios[i]).to.equal(horariosDisponibles[i]); 
        }   
    })    
})

describe('Se realiza la puntuación de un restaurante de forma correcta',function(){
	it('Dado un restaurante con determinadas calificaciones, la puntuación se calcula correctamente',function(){
		var restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["15:00", "17:30"], "../img/pizza3.jpg", [5, 4, 1, 7, 8, 4, 6]);		
		expect(restaurant.obtenerPuntuacion()).to.equal(5);
	})

	it('Dado un restaurante que no tiene ninguna calificación, la puntuación es igual a cero',function(){
		var restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["15:00", "17:30"], "../img/pizza3.jpg", []);		
		expect(restaurant.obtenerPuntuacion()).to.equal(0);
	})
})

describe('Se realiza la calificación de un restaurante de forma correcta',function(){
	it('Cuando se realiza una nueva calificación, se agrega correctamente',function(){
		var restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["15:00", "17:30"], "../img/pizza3.jpg", [5, 4, 1, 7, 8, 4, 6]);
		var calificacionesRestaurant = restaurant.calificaciones;
		restaurant.calificar(9)	
		expect(calificacionesRestaurant.length).to.equal(8);
	})	

	it('Cuando se intenta calificar con cero no sufre modificaciones',function(){
		var restaurant = new Restaurant(20, "Pappelli", "Pizza", "París", ["15:00", "17:30"], "../img/pizza3.jpg", [5, 4, 1, 7, 8, 4, 6]);
		var calificacionesRestaurant = restaurant.calificaciones;
		restaurant.calificar(0)	

        for(i=0;i<calificacionesRestaurant.length;i++){
        	expect(restaurant.calificaciones[i]).to.equal(calificacionesRestaurant[i]); 
        }   	
	})		
})

describe('Se realiza la busqueda de un restaurante correctamente',function(){ 
	it('Dado un restaurante, al buscarlo por su id es encontrado ',function(){
		
		var restauranteEncontrado = listado.buscarRestaurante(20);
		expect(restauranteEncontrado.id).to.equal(20);		
	})

	it('Al intentar buscar un restaurante no disponible devuelve un aviso ',function(){
		
		var resultadoBusqueda = listado.buscarRestaurante(30);
		expect(resultadoBusqueda).to.be.a('string');		
	})
})

describe('Al colocar filtros en la busqueda, se aplican correctamente',function(){ 
	it('Dado un rubro y un horario devuelve los restarurantes correspondiente',function(){
		var restaurantesFiltrados = listado.obtenerRestaurantes( "Hamburguesa", null, "12:00");
		expect(restaurantesFiltrados.length).to.equal(2);
	})

	it('Al no aplicar ningun filtro obtiene todos los restaurantes',function(){
		var restaurantesFiltrados = listado.obtenerRestaurantes( null, null, null);
		expect(restaurantesFiltrados.length).to.equal(24);
	})
})

//guia3 TDD

describe('El calculo del precio de la reserva se realiza correctamente',function(){
	it('Dada una reserva con "x" personas, el calculo del precio base es correcto',function(){
		var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
		expect(reserva2.calculaPrecioBase()).to.equal(300);
	})

	it('Al intentar reservar sin indicar la cantidad de personas devuelve un aviso',function(){
		var reserva3 = new Reserva (new Date(2018, 7, 27, 14, 100), 0, 150, "DES200");
		expect(reserva3.calculaPrecioBase()).to.be.a('string');		
	})


	it('Dada una reserva con descuentos y adicionales, se calcula el precio final',function(){
		var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
		expect(reserva2.calculaPrecioFinal()).to.equal(100);		
	})
})
