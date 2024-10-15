let arr = [
    {
        brand: 'Huyndai',
        model: 'Santafe'
    }, {
        brand: 'Huyndai',
        model: 'Sonata'
    }, {
        brand: 'Vinfast',
        model: 'Lux SA'
    }, {
        brand: 'Toyota',
        model: 'Camry'
    }, {
        brand: 'Vinfast',
        model: 'Lux A'
    }, {
        brand: 'Toyota',
        model: 'Vios'
    }
]


function mergeByBrand(arr) {
    let brands = [];
    arr.forEach(e => {
        if (!brands.includes(e.brand)) {
            brands.push(e.brand);
        }
    });
    let newArr = [];
    for (let index = 0; index < brands.length; index++) {
        newArr[index] = []
        arr.forEach(el => {
            if (el.brand === brands[index]) {
                newArr[index].push(el)
            }
        });

    }

    return newArr;
}


console.log(mergeByBrand(arr));


