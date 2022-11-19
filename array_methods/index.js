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

const negocios = negociosCuadra.some(n => n.id === 4)

console.log(negocios)