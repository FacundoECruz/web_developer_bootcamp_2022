const mcs = [
    {
        name: 'Aczino',
        level: 92,
        firstChamp: 2012,
        country: 'Mex'
    },
    {
        name: 'Gazir',
        level: 94,
        firstChamp: 2021,
        country: 'Esp'
    },
    {
        name: 'Chuty',
        level: 93,
        firstChamp: 2013,
        country: 'Esp'
    },
    {
        name: 'Kaiser',
        level: 79,
        firstChamp: 2014,
        country: 'Chi'
    },
    {
        name: 'Dtoke',
        level: 81,
        firstChamp: 2013,
        country: 'Arg'
    },
    {
        name: 'Jota',
        level: 85,
        firstChamp: 2015,
        country: 'Per'
    }
]

const levelMcs = mcs.map(n => n.level);

const totalLevel = levelMcs.reduce((inicial, suma) => inicial + suma);
console.log(totalLevel);

