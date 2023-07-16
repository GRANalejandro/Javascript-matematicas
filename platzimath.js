//Para poner las funciones dentro de un objecto, ponemos las funciones asi: PlatziMatch.calcularMediana = lista => {}, asi las guardamos dentro del objecto.

const PlatziMatch = {};

/*
// [1,2,3]

function calcularPromedio(lista){
    // Sumar todos los elementos del array // cantidad de elementos

    let sumaLista = 0;

    for (let i = 0; i < lista.length; i++){
        // En cada ciclo, se sumara lo que esta en sumaLista, mas cada elemento del array en cada iteracion.
        lista[i] = sumaLista + lista[i];
    }

    const promedio = sumaLista / lista.length;
    return console.log(promedio);
}
*/

// Metodo reduce

PlatziMatch.calcularPromedio = function calcularPromedio(lista){
    // Sumar todos los elementos del array // cantidad de elementos

    // Reduce toma uno de los argumentos de la funcion y lo toma como un valor inicial o acumulador, luego toma el segundo valor y lo coje como valor actual, es decir, si pasamos una lista a la funcion, cada numeros se sumara.
    const sumaLista = lista.reduce((valorAcumulado, nuevoValor) => valorAcumulado + nuevoValor);

    const promedio = sumaLista / lista.length;
    return console.log(promedio);
}

//PlatziMatch.calcularPromedio([10,22,53,14,10000])

// Saber si el numero de elementos en un array es par o impar

/*
const arrayParorImpar = array => {
    let operacion = array.length % 2;
    if (operacion === 0){
        return console.log("El array es par");
    } else {
        return console.log("El array es impar")
    }
};

arrayParorImpar([1,2,3,4])
*/
// Aportes de compañeros

// const esPar = lista => lista.length % 2 ? console.log("El array es impar") : console.log("El array es par");

// Devuelve verdadero o falso

//Muy largo y redundante
// const esPar = lista => lista.length % 2 ? false : true;

/* function esPar (lista) {
    const CANTIDAD_DE_ELEMENTOS = lista.length;

    if (CANTIDAD_DE_ELEMENTOS % 2 === 0) {
        return true;
    } else {
        return false;
    }
}
*/

//Sin redundancia y corto

/*
function esPar(lista) {
    const CANTIDAD_DE_ELEMENTOS = lista.length;

    return CANTIDAD_DE_ELEMENTOS % 2 === 0;
}

*/
PlatziMatch.esParOImpar = lista => lista.length % 2 === 0;

//esParOImpar([1,2,3,4])

// soluction del profe

/*
//Devuelve true, ya que si devuelve 0 (false) al negarlo devuelve 1.
const esPar = lista => !(lista.length % 2);
// Devuelve false, ya que el 0 es false.
const esImpar = lista => lista.length % 2;

// Mediana
*/

PlatziMatch.calcularMediana = listas => {

    let listaOrganizada = listas.sort((a,b) => a - b);

 
	/*
    function ordenarLista(valorAcumulado, nuevoValor){
        // Sin abreviar
        
        if (valorAcumulado > nuevoValor){
            //Ascendente
            return 1;
            //Descendente
            return -1;
        } else if (valorAcumulado == nuevoValor){
            return 0
        } else if (valorAcumulado < nuevoValor){
            //Ascendente
            return -1;
            //Descendente
            return 1;
        }
        
       // Abreviado ascendente
       //return valorAcumulado - nuevoValor;
       // Abreviado descendente
       //return nuevovalor - valorAcumulado;
    }

    const listaOrganizada = lista.sort(ordenarLista);
 */
    
    
	//Si es true calculara la media, es decir, los dos numeros del medio y sacara un promedio de ellos
    if (PlatziMatch.esParOImpar(listas) === true) {
        const indexMitadListaparIzquierda = (listaOrganizada.length / 2) - 1;
        const indexMitadListaparDerecha = listaOrganizada.length / 2;
        const mediaListaparIzquierda = listaOrganizada[indexMitadListaparIzquierda];
        const mediaListaparDerecha = listaOrganizada[indexMitadListaparDerecha];
        const mediaListapar = (mediaListaparDerecha + mediaListaparIzquierda) / 2;
        return mediaListapar;

        //solucion del Profe

        /*
        medianaListaPar = [];
        medianaListaPar.push(mediaListaParIzquierda);
        medianaListaPar.push(mediaListaParDerecha);

        //Se llama la funcion anterior para sacar el promedio
        return calcularPromedio(medianaListaPar);
        */
    } else{
        //Para encontrar los numeros
        
		//Si es impar sacara el numero central, atraves de dividir el length y luego subirlo al siguiente numero ya que no da exacto.
		const indexMitadListaImpar = Math.floor(listaOrganizada.length / 2);
        const mediaListaImpar = listaOrganizada[indexMitadListaImpar];
        return mediaListaImpar;
    }
}

// Moda

PlatziMatch.calcularModa = lista => {
	//Hacemos un objecto vacio
    const listaCount = {};

	//Usamo for hasta el numero del lenght, es decir, se repetira pr el numero de la lista.
    for (let i = 0; i < lista.length; i++){
		//Servira para meter cada numero o string que este en la lista en el objeto
        const elemento = lista[i];
        
		//Si ya esta el elemento lo sumara denuevo con el valor dado primeramente, es decir, de uno en uno.
        if (listaCount[elemento]){
            listaCount[elemento] += 1;
		//Si no esta repetido, se le pondra un 1, solamente.
        } else {
            listaCount[elemento] = 1;
        }
    }

	//Se convierte el objecto ya formado a array con arrays bidimensionales adentro.
    const listaArray = Object.entries(listaCount);

	//Se organiza la lista de manera ascendente, para esto se buscan los numeros dentro los array bidimensionales
	const listaOrganizada = listaArray.sort((a,b) => a[1] - b[1]);
	//Se busca ultimo numero, para esto se usa el numero del lenght y se le resta 1, para asi encontrar el ultimo numero.
	const listadesordenadaMaxNumber = listaOrganizada[listaOrganizada.length - 1]
	//Se busca el penultimo numero o elemento, para asi saber si hay moda o no.
	const listadesordenadaMaxNumber2 = listaOrganizada[listaOrganizada.length - 2]

	//Se saca el nombre de la moda, si hay
	const moda = listadesordenadaMaxNumber[0];
	//Si el penultimo numero es igual a la moda, entonces no hay moda.
	if (listadesordenadaMaxNumber[1] === listadesordenadaMaxNumber2[1]){
		return console.log("No hay moda");
	} else {
	//Si hay moda, se retorna el nombre de la moda
		return console.log(`La moda es: ${moda}`);
	}

	
	/*
	Organizar las listas solucion del profe

	const ordenarListaBidimensional = (listadesordenada) => {
		const ordenarListaSorft = (valorAcumulado, nuevoValor) => {
			return valorAcumulado[1] - nuevoValor[1];
		}

		const lista = listadesordenada.sort(ordenarListaSorft)
	}
	*/
};

PlatziMatch.ordenarLista = (listadesordenada) => {
	const ordenarListaSorft = (valorAcumulado, nuevoValor) => {
		return valorAcumulado - nuevoValor;
	}

	const lista = listadesordenada.sort(ordenarListaSorft);

	return lista;
}

PlatziMatch.ordenarListaBidimensional = (listadesordenada) => {
	const ordenarListaSorft = (valorAcumulado, nuevoValor) => {
		return valorAcumulado[1] - nuevoValor[1];
	}

	const lista = listadesordenada.sort(ordenarListaSorft);

	return lista;
}

// Que aprender 

/*
Algoritmos de organamiento: Quicksort, Insertion sort, Bubble sort, Merge sort, Binary tree sort.

Algoritmos con JS: Estruturas de datos, Complejidad algorítmica (muchos codigo o datos a manejar).
*/

// Aportes compañeros Platzi:

/*
let people = [
    { name: "John", age: 30 },
    { name: "Mike", age: 25 },
    { name: "Sarah", age: 35 }
];
people.sort(function (a, b) {
    return a.age - b.age;
});
console.log(people);

Output:

[
    { name: "Mike", age: 25 },
    { name: "John", age: 30 },
    { name: "Sarah", age: 35 }
]
*/

// Diferencia Keys, Values, Entries:

/*
const obj = {1: "a", 2: "b"; 3: "c"};

Object.keys(obj)
(3) ['a', 'b', 'c']

Object.values(obj)
(3) [1, 2, 3]

Object.entries(obj)
(3) [Array(2), Array(2), Array(2)]
0
: 
(2) ['a', 1]
1
: 
(2) ['b', 2]
2
: 
(2) ['c', 3]
length
: 
3
[[Prototype]]
: 
Array(0)

*/
//Ejercicio de objecto a array con objecto

const obj = {
	123: 'Juanito Alcachofa',
	456: 'Juanita Alcaparra',
  };

//Se pasa el arreglo
const arreglo = (obj) => {
	//Se forma el primer objecto y el segundo
	let objecto1 = {};
	let objecto2 = {};
	//Se forma el array contenedor
	let resultado = [];
	//Se forma el array a partir del objecto ingresado a la funcion
	const array = Object.entries(obj);

	//Se busca los elementos por los indices de los elementos, para esto primero se ingresa a los array bidimensionales y luego se busca los elementos que se necesitan dentro de estos
	let id = array[0][0];
	let id2 = array[1][0];
	let name = array[0][1];
	let name2 = array[1][1];
	//Se ingresa estos datos a los objectos
	objecto1['id'] = id;
	objecto1['name'] = name;
	objecto2['id'] = id2;
	objecto2['name'] = name2;

	//Se ingresa los datos al array contenedor y se retorna
	resultado.push(objecto1);
	resultado.push(objecto2);

	return resultado;
}

//Solucion compañeros

/*

const arreglo = (obj) => {
	//Solo se crea el array contenedor
	let resultado = [];

	const array = Object.entries(obj);
	//Se usa el for para iterar por el numero de elementos que tiene el array organizado
	for (let i = 0; i < array.length; i++){
		Se le ingresan al array contenedor los objecto que se crean en cada iteracion del for
		resultado.push(
			{
				//Se usa i como primer indice, ya que inicia en 0 y termina un numero antes del numero del lenght.
				id: array[i][0],
				name: array[i][1]
			}
		)
	}

	//Se retorna
	return resultado;
}
*/

// Solucion compañeros foreach

/*
const arreglo = (obj) => {
	let resultado = [];

	const array = Object.entries(obj);
	//Foreach tomara el array y desde alli mismo se usa una variable para ingresar a los datos, es decir, a los array bidimensionales.
	array.forEach((result) => {
		resultado.push({
				//En vez de usar i, se usa la variable "result", ya que esta toma los valores de cada uno de los array bidimensionales, y ya con el indice se busca los datos que se necesiten.
				id: result[0],
				name: result[1]
			
			})
	})

	return resultado;
}
*/

// Solucion compañeros for of
/*
const arreglo = (obj) => {
	let resultado = [];

	const array = Object.entries(obj);
	//En for of, el argumento element toma cada dato de "array", y con este se hace un proceso muy parecido al de for each. 
	for (let element of array){
		resultado.push(
			{
				id: element[0],
				name: element[1]
			}
		)
	}

	return resultado;
}
*/

//Solucion map, chatgpt

/*
const arreglo = (obj) => {
  const array = Object.entries(obj);

  const resultado = array.map(element => {
    return {
      id: element[0],
      name: element[1]
    };
  });

  return resultado;
};
*/

//const numbers = [2, 3, 14];

PlatziMatch.mediaGeometrica = list => {
	let productResult = list.reduce((a,b) => a * b);
	let result = Math.pow(productResult, (1/list.length));
	console.log(productResult);
	return console.log(result);
};

//mediaGeometrica(numbers)

let numbers = [2, 3, 14];

let mediaGeometrica = list => {
	let productResult = list.reduce((a,b) => a * b);
	let result = Math.pow(productResult, (1/list.length));
	console.log(productResult);
	return console.log(result);
};
