jQuery(document).ready(function($) 
{

$('#calculaLitros').click(function(event) 
	{
		var galones=$('#galones').val();
		if (galones!=="") 
		{
			calcularGalones(galones);
		}
		else
		{
			swal("Espacio de galones vacío, diligencia campo.")
		}

	});

function calcularGalones (valor) 
	{
		return swal(valor+" galones son: "+((valor*3.7854).toFixed(2))+" litros.");
	};
	


$('#calculaPeso').click(function(event) 
	{
		//Gravedad de la Luna %17 de la de la tierra
		var gravedadTierra=9.8; // m/s^2
		var gravedadLuna=gravedadTierra*0.17;
		///////////////////////////////////////////////////

		
		//Peso = Masa x Gravedad Planeta o Luna
		// Masa = Peso/Gravedad Planeta o Luna
		var pesoPersona=$('#peso').val();

		if (pesoPersona!=="") 
		{
			var masa=pesoPersona/gravedadTierra;
			var pesoenlaLuna= (gravedadLuna*masa).toFixed(2);
			swal("Una persona con un peso de "+pesoPersona+" Kg en la Luna pesará aproximadamente "+ pesoenlaLuna +" Kg");
		}
		else
		{
			swal("Campo de espacio vacío, diligencie campo.")
		}

		
	});


$('#respuestaFraccionario').click(function(event) 
	{
		//Buscar , y .
		var array="";
		var numerador_1		=$('#numerador_1').val();
		var denominador_1	=$('#denominador_1').val();
		var numerador_2		=$('#numerador_2').val();
		var denominador_2	=$('#denominador_2').val();
		var comas=false;




		if ((numerador_1&&denominador_1&&numerador_2&&denominador_2)!=="") 
			{
				if ((numerador_1!=="0")&&(numerador_2!=="0")&&(denominador_1!=="0")&&(denominador_2!=="0")) 
					{
						array=numerador_1+denominador_1+numerador_2+denominador_2;
						for (var i = 0; i < array.length; i++) 
						{
							if(array[i]===","||array[i]===".")
							{
								swal("No se aceptan puntos o comas");
								numerador_1		=$('#numerador_1').val("");
								denominador_1	=$('#denominador_1').val("");
								numerador_2		=$('#numerador_2').val("");
								denominador_2	=$('#denominador_2').val("");
								return !comas;
							}



								
						};

						if (!comas) 
							{
								array=[];
								var operacion = String($("#operaciones option:selected").html());


								switch (operacion) 
									{
										//Suma	
									    case " + ":
													var suma_numerador=(numerador_1*denominador_2)+(denominador_1*numerador_2);
											        var suma_denominador=(denominador_1*denominador_2);
											        //console.log(suma_numerador,suma_denominador);
											        swal("La suma de los fraccionarios es: "+simplificaFraccionario(String(suma_numerador+"/"+suma_denominador)));
							        	break;

							        	//Resta
										case " - ":
													var resta_numerador=(numerador_1*denominador_2)-(denominador_1*numerador_2);
											        var resta_denominador=(denominador_1*denominador_2);
											        swal("La resta de los fraccionarios es: "+simplificaFraccionario(String(resta_numerador+"/"+resta_denominador)));
							        	break;


							        	//Multiplicación
										case " * ":
													var multi_numerador=(numerador_1*numerador_2);
											        var multi_denominador=(denominador_1*denominador_2);
											        swal("La multiplicación de los fraccionarios es: "+simplificaFraccionario(String(multi_numerador+"/"+multi_denominador)));
								        break;


								        //División
										case " / ":
													var division_numerador=(numerador_1*denominador_2);
											        var division_denominador=(denominador_1*numerador_2);
											        swal("La division de los fraccionarios es: "+simplificaFraccionario(String(division_numerador+"/"+division_denominador)));
								        break;

								    }
								 }
					}
					else
					{
						swal("Operacion de fraccionarios por 0 es indeterminada");
					}

			}

	
		else
		{
			swal("Complete todos los campos");
			$('#numerador_1').focus();
		}



		
    
	});


//Simplicar fraccionarios, utilizando el máximo común divisor...
    var simplificaFraccionario = function(val)
   	{
   		var parteVal = val.split("/");
   		var numerador = Number(parteVal[0]);
   		var denominador = Number(parteVal[1]);
   		var maximoComunDivisor = function(a, b)
   		{
   			return b ? maximoComunDivisor(b, a%b) : a;
   		};
   		maximoComunDivisor = maximoComunDivisor(numerador,denominador);
        numerador /= maximoComunDivisor;
        denominador /= maximoComunDivisor;
        var respuesta = numerador + "/" + denominador;
        if(denominador === 1)
        {
            respuesta = numerador;
        }
   		return respuesta;
   	};



$('#calculaGrados').click(function(event) 
	{
		var grados= $('#grados').val();
		var lista_1 = $("#lista_1 option:selected").html();
		var lista_2 = $("#lista_2 option:selected").html();
		

		if (grados!=="") 
			{
				grados=Number(grados);

			//°C --> °C
			if (lista_1==="Centigrados"&&lista_2==="Centigrados")
				{
					$('#respuestaGrados').val(grados);
				};


			//°C --> °K
			if (lista_1==="Centigrados"&&lista_2==="Kelvin")
				{
					$('#respuestaGrados').val(grados+273.15);
				};


			//°C --> °F
			if (lista_1==="Centigrados"&&lista_2==="Fahrenheit")
				{
					$('#respuestaGrados').val(((grados*1.8)+32).toFixed(2));
				};


			//°K --> °C
			if (lista_1==="Kelvin"&&lista_2==="Centigrados")
				{
					$('#respuestaGrados').val((grados-273.15).toFixed(2));
				};


			//°K --> °K
			if (lista_1==="Kelvin"&&lista_2==="Kelvin")
				{
					$('#respuestaGrados').val(grados);
				};

			//°K --> °F
			if (lista_1==="Kelvin"&&lista_2==="Fahrenheit")
				{
					$('#respuestaGrados').val((((grados-273.15)*1.8)+32).toFixed(3));
				};


			//°F --> °C
			if (lista_1==="Fahrenheit"&&lista_2==="Centigrados")
				{
					$('#respuestaGrados').val(((grados-32)/1.8).toFixed(3));
				};
		

				//°F --> °K
			if (lista_1==="Fahrenheit"&&lista_2==="Kelvin")
				{
					$('#respuestaGrados').val((((grados-32)/1.8)+273.15).toFixed(3));
				};


			//°F --> °F
			if (lista_1==="Fahrenheit"&&lista_2==="Fahrenheit")
				{
					$('#respuestaGrados').val(grados);
				}
			}
						
		
		else
		{
			swal("Campo de grados vacío, digite campo.")
		}
	});

});