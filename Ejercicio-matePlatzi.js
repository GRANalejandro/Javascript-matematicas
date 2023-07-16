const namesPersons = document.querySelectorAll('.names__p');
const salarysPersons = document.querySelectorAll('.salary__p');
const borrowingPersons = document.querySelectorAll('.borrowing__p');
const inputBorrowing = document.querySelector('#inputBorrowing');
const buttonBorrowing = document.querySelector('.buttonBorrowing');
const buttonBorrowingGeneral = document.querySelector('.pBorrowingGeneral');
const pBorrowing = document.querySelector('.pBorrowing');


buttonBorrowing.addEventListener('click', () => {
    const capacidadDeEndeudamientoPersonal = (nombrepersona) => {
        const Nombrepersona = encontrarPersona(nombrepersona).name;
        if (!Nombrepersona) {
            pBorrowing.innerHTML = 'No es una persona de la lista';
            return;
        }
        const trabajos = encontrarPersona(nombrepersona).trabajos;
        const salario2023 = trabajos.find(trabajo => trabajo.year === 2023).salario;
    
        const capacidadDeEndeudamiento = salario2023 * 0.35; 
        
        pBorrowing.innerHTML = `La capacidad de endeudamiento de ${nombrepersona} es ${capacidadDeEndeudamiento}`;
    
        // Resto del código...
    };

    capacidadDeEndeudamientoPersonal(inputBorrowing.value);
});

buttonBorrowingGeneral.addEventListener('click', () => {
    const capacidadDeEndeudamientoGeneral = () => {
        // const personas = salarios.map(persona => persona.name);
    
        // const capacidadDeEndeudamiento = personas.forEach
        // (persona => persona.find(trabajo => trabajo.year === 2023).salario)
    
        // return capacidadDeEndeudamiento;
    
    
        const personas = salarios.map(persona => persona.name);
    
        const salarios2023 = [];
    
        personas.forEach(nombre => {
            const persona = salarios.find(person => person.name === nombre);
            const salariosPorPersona = persona.trabajos.find(trabajo => trabajo.year === 2023).salario;
            salarios2023.push(salariosPorPersona);
        });
    
        const capacidadDeEndeudamiento = salarios2023.map(salario => salario * 0.35);
    
        // For normal
        // for (let i = 0; i < personas.length; i++) {
        //     const persona = personas[i];
        //     const salario = salarios2023[i];
        //     const capacidad = capacidadDeEndeudamiento[i];
        //     console.log(`${persona} gana un total de ${salario}, su capacidad de endeudamiento es de ${capacidad}`)
        // }
    
        //For each
    
        personas.forEach((persona,index) => {
            salario = salarios2023[index];
            capacidad = capacidadDeEndeudamiento[index];
    
            const nameP = namesPersons[index];
            const salaryP = salarysPersons[index];
            const borrowingP = borrowingPersons[index];
          
            nameP.textContent = persona;
            salaryP.textContent = salario;
            borrowingP.textContent = capacidad;
    
            //console.log(`${persona} gana un total de ${salario}, su capacidad de endeudamiento es de ${capacidad}`)
        });
    
    
    };
    capacidadDeEndeudamientoGeneral()    
})

