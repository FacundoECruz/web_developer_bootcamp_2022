const negociosCuadra = [
    {
        id: 1,
        nombre: 'Kiosco Emi',
        calif: 7,
        tags: ['Kiosco', 'Lacteos', 'Verduras']
    },
    {
        id: 2,
        nombre: 'Granja Nahuel',
        calif: 8,
        tags: ['Kiosco', 'Lacteos', 'Campo']
    },
    {
        id: 3,
        nombre: 'Carnica Emi',
        calif: 6,
        tags: ['Carnes', 'Bebidas']
    },
    {
        id: 4,
        nombre: 'Kiosco Media Cuadra',
        calif: 5,
        tags: ['Kiosco', 'Bebidas']
    }
]

const nombreCarnica = () => {
    const carnica = negociosCuadra.find(n => n.tags.includes('Carnes'))
    const nombreDeletreado = Array.from(carnica.nombre)
    const nombreUnido = nombreDeletreado.join('')
    console.log(nombreUnido)    
}

nombreCarnica();