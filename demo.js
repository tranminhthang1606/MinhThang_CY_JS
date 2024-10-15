const arr = [
    {
        brand: 'Huyndai',
        model: 'Santafe'
    },
    {
        brand: 'Huyndai',
        model: 'Sonata'
    },
    { brand: 'Toyota', model: 'Camry' },
    {
        brand: 'Vinfast',
        model: 'Vf9'
    },
    { brand: 'Toyota', model: 'Vios' }
]
const arr1 = [];

arr.forEach(car => {
    let brandGroup = arr1.find(group => group[0].brand === car.brand);
    console.log('brandGroup: ',arr1.find(group => group[0].brand === car.brand))
    if (brandGroup) {
        brandGroup.push(car);
    } else {
        arr1.push([car]);
    }
    console.log('arr1: ',arr1);
    
});

