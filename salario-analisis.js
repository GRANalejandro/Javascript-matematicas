console.log(salarios);

// Análisis personal para Juanita

const encontrarPersona = (personaEnBusqueda) => {
    return salarios.find(persona => persona.name == personaEnBusqueda);
/*
    const persona = salarios.find((persona) => {
        return persona.name == personaEnBusqueda;
    })

    return persona;
*/
} 

const medianaPorPersona = (Nombrepersona) => {
    const trabajos = encontrarPersona(Nombrepersona).trabajos;

    const salarios = trabajos.map(elemento => {
        return elemento.salario;
    });

    const medianaSalarios = PlatziMatch.calcularMediana(salarios);

    // console.log(medianaSalarios)
    return medianaSalarios;
};

const proyeccionPorPersona = (Nombrepersona) => {
    const trabajos = encontrarPersona(Nombrepersona).trabajos;

    let porcentajesCrecimiento = [];

    for (let i = 1; i < trabajos.length; i++) {
        const salarioActual = trabajos[i].salario;
        const salarioPasado = trabajos[i - 1].salario;
        const crecimiento = salarioActual - salarioPasado;
        const porcentajeCrecimiento = crecimiento / salarioPasado;
        porcentajesCrecimiento.push(porcentajeCrecimiento);
    }

    const medianaPorcentajesCrecimiento = PlatziMatch.calcularMediana(porcentajesCrecimiento);

    console.log({porcentajesCrecimiento, medianaPorcentajesCrecimiento});

    const ultimoSalario = trabajos[trabajos.length - 1].salario;
    const aumento = ultimoSalario * medianaPorcentajesCrecimiento;
    const nuevoSalario = ultimoSalario + aumento;

    return {nuevoSalario}
}

/*
{
    Industrias Mokepon: {
        2018:  [name: salario, name: salario, name: salario]
        2019:
        2025:
        2026:
    },
    Industrias Mokepon: {},
    Industrias Mokepon: {},
    Industrias Mokepon: {},
}
*/

const empresasNombre = {};

for (persona of salarios){
    for (trabajo of persona.trabajos){
        if (!empresasNombre[trabajo.empresa]){
            empresasNombre[trabajo.empresa] = {};
        }

        if (!empresasNombre[trabajo.empresa][trabajo.year]){
            empresasNombre[trabajo.empresa][trabajo.year] = [];
        }

        empresasNombre[trabajo.empresa][trabajo.year].push(`${persona.name}: ${trabajo.salario}`);
    }
}

// console.log({empresasNombre});

// Analisis empresarial

/*
{
    Industrias Mokepon: {
        2018:  [salario, salario, salario]
        2019:
        2025:
        2026:
    },
    Industrias Mokepon: {},
    Industrias Mokepon: {},
    Industrias Mokepon: {},
}
*/

const empresas = {};

for (persona of salarios){
    for (trabajo of persona.trabajos){
        if (!empresas[trabajo.empresa]){
            empresas[trabajo.empresa] = {};
        }

        if (!empresas[trabajo.empresa][trabajo.year]){
            empresas[trabajo.empresa][trabajo.year] = [];
        }

        empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
    }
}

// console.log({empresas});
/*


//Moda

const empresasModa = {};

for (persona of salarios){
    for (trabajo of persona.trabajos){
        if (!empresasModa[trabajo.empresa]){
            empresasModa[trabajo.empresa] = {};
        }

        if (!empresasModa[trabajo.empresa][trabajo.year]){
            empresasModa[trabajo.empresa][trabajo.year] = null;
        }

        let moda = [];
        let medianaLista = [];
        moda.push(trabajo.salario)
        let mediana = PlatziMatch.calcularMediana(moda);
        medianaLista.push(mediana)

        empresasModa[trabajo.empresa][trabajo.year].push(`${moda} + ${medianaLista}`);
    }
}

console.log({empresasModa});


//Mediana

*/

//Aunque no este definido una clave llamada 'name', este lo que hara es verificar si en ESA POSICION hay algo.
const medianaEmpresaYear = (name, year) => {
    if (!empresas[name]) {
        console.warn('La empresa no existe');
    } else if (!empresas[name][year]) {
        console.warn('La empresa no dio salarios ese año');
    } else {
        return PlatziMatch.calcularMediana(empresas[name][year]);
    }
};

const proyeccionPorEmpresa = (nombre) =>{
    if (!empresas[nombre]) {
        console.warn('La empresa no existe');
    } else{
        // Con esto logramos que nos de las llaves o los nombres que contienen los arrays, en este caso son los nombres de las empresas.
        const empresaYears = Object.keys(empresas[nombre]);
        //Con map, haremos que el codigo nos devuelva un array con lo que le estamos pidiendo, en este caso estamos obteniendo una serie de fechas y estas la usamos con el nombre de la empresa, es decir, usamos la funcion calcularMediana para tener la mediana de cada años. 
        const listaMedianaYears = empresaYears.map(year => {
            return medianaEmpresaYear(nombre, year);
        });

        let porcentajesCrecimiento = [];

        for (let i = 1; i < listaMedianaYears.length; i++) {
            const salarioActual = listaMedianaYears[i];
            const salarioPasado = listaMedianaYears[i - 1];
            const crecimiento = salarioActual - salarioPasado;
            const porcentajeCrecimiento = crecimiento / salarioPasado;
            porcentajesCrecimiento.push(porcentajeCrecimiento);
        }
    
        const medianaPorcentajesCrecimiento = PlatziMatch.calcularMediana(porcentajesCrecimiento);

        const ultimaMediana = listaMedianaYears[listaMedianaYears.length - 1];
        const aumento = ultimaMediana * medianaPorcentajesCrecimiento;
        const nuevaMediana = ultimaMediana + aumento;

        // console.log({nuevaMediana});
    };
};

//Solucion Propia

/*let empresaConMediana = {};

for(persona of salarios){
    for(trabajo of persona.trabajos){
        if(!empresaConMediana[trabajo.empresa]){
            empresaConMediana[trabajo.empresa] = {};
        } 
        if(!empresaConMediana[trabajo.empresa][trabajo.year]){
            empresaConMediana[trabajo.empresa][trabajo.year] = [];
            empresaConMediana[trabajo.empresa][trabajo.year]['mediana'] = [];
        }
        empresaConMediana[trabajo.empresa][trabajo.year].push(trabajo.salario);
        
        if(empresaConMediana[trabajo.empresa][trabajo.year]['mediana'] == 0){
            empresaConMediana[trabajo.empresa][trabajo.year]['mediana'].push(PlatziMatch.calcularMediana(empresaConMediana[trabajo.empresa][trabajo.year]))
        }
    }
}

console.log({empresaConMediana})


const medianaPorEmpresa = (name, year) =>{
    if (!empresas[name]) {
        console.warn('La empresa no existe');
    } else if (!empresas[name][year]) {
        console.warn('La empresa no dio salarios ese año');
    } else {
        console.log(empresaConMediana[name][year]['mediana']);
    }

  
}

*/

//Solucion Platzi

/*let empresas = {}
      for(persona of salarios){
            for( trabajo of persona.trabajos){
                  if(!empresas[trabajo.empresa]){
                        empresas[trabajo.empresa] = {}
                  }
                  if(!empresas[trabajo.empresa][trabajo.year]){
                        empresas[trabajo.empresa][trabajo.year] = []
                        empresas[trabajo.empresa][trabajo.year]["Mediana"] = []
                  }
                  empresas[trabajo.empresa][trabajo.year].push(trabajo.salario)
            }
      }
      if(!(empresas[nombreEmpresa][anioEmpresa13C]==undefined)){
            for(persona of salarios){
                  for( trabajo of persona.trabajos){
                        empresas[trabajo.empresa][trabajo.year]["Mediana"] = ( [calcularMediana(empresas[trabajo.empresa][trabajo.year])] )
                  }
            }
            respuesta.innerText = `Respuesta = La mediana de ${nombreEmpresa} para el año ${anioEmpresa13C} es de ${empresas[nombreEmpresa][anioEmpresa13C]["Mediana"]} `
      }else{

            respuesta.innerText = `La empresa no registra salarios en ${anioEmpresa13C}`
      }*/


// Análisis general

//Version larga
/*const medianaGeneral = () => {
    const nombres = salarios.map(persona => persona.name);
    const medianaPorCadaNombre = nombres.map(nombre => medianaPorPersona(nombre));
    console.log({nombres}, {medianaPorCadaNombre});
}
*/

//Version corta
const medianaGeneral = () => {
    const listaMedianas = salarios.map(persona => medianaPorPersona(persona.name));
    console.log({listaMedianas});

    const mediana = PlatziMatch.calcularMediana(listaMedianas);

    return mediana;
};

const medianaTop10 = () => {
    //Para saber cuanto es el 10% de 20, hacemos el calculo de: 20 / 10 = 2;, este 2 seria el 10% de las personas que mas ganan.

    const listaMedianas = salarios.map(
        persona => medianaPorPersona(persona.name)
    );

    const medianasOrdenadas = PlatziMatch.ordenarLista(listaMedianas);

        //Primero hacemos el calculo del 10%
        const cantidad = listaMedianas.length / 10;
        //Lo restamos con la cantidad de lenght total, para asi tener las dos ultimas personas, ya que se buscara a los que mas dinero ganan.
        const limite = listaMedianas.length - cantidad;

        /*Usaremos dos nuevos metodos, los cuales son, el metodo slice y el metodo splice
        
        slice: crea un nuevo arreglo a partir de lo que le demos:

        const top10 = medianasOrdenadas.slice(limite, medianasOrdenadas.length);

        const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

        console.log(animals.slice(2));
        // Expected output: Array ["camel", "duck", "elephant"]

        console.log(animals.slice(2, 4));
        // Expected output: Array ["camel", "duck"]

        console.log(animals.slice(1, 5));
        // Expected output: Array ["bison", "camel", "duck", "elephant"]

        console.log(animals.slice(-2));
        // Expected output: Array ["duck", "elephant"]

        console.log(animals.slice(2, -1));
        // Expected output: Array ["camel", "duck"]

        console.log(animals.slice());
        // Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]


        En este caso devuelve desde el limite al numero total de elementos del array que se esta usando (.lenght).

        splice: A diferencia de slice, splice agarra los elementos que cumplen o que buscamos y los pone en el array, por ejemplo si llamamos top10 y medianasOrdenadas, podremos ver que medianasOrdenadas ya no tendra 20 sino 18. a diferencia que en slice seguira teniendo 20.

        const top10 = medianasOrdenadas.splice(limite, medianasOrdenadas.length);

        console.log({top10}, {medianasOrdenadas});

        Asi mismo splice cambia el contenido del array:

        const months = ['Jan', 'March', 'April', 'June'];
        months.splice(1, 0, 'Feb');
        // Inserts at index 1
        console.log(months);
        // Expected output: Array ["Jan", "Feb", "March", "April", "June"]

        months.splice(4, 1, 'May');
        // Replaces 1 element at index 4
        console.log(months);
        // Expected output: Array ["Jan", "Feb", "March", "April", "May"]

        */
       
        const top10 = medianasOrdenadas.slice(limite, medianasOrdenadas.length);

        const medianaTop10 = PlatziMatch.calcularMediana(top10);

    return console.log({medianaTop10});
};