function getData(districtClassName, realtyComplexClassName, flatClassName)  {

    console.log(districtClassName, realtyComplexClassName, flatClassName);
    fetch('https://6502dc12a0f2c1f3faeafdf7.mockapi.io/test/estimates/1')
        .then(result => result.json())
        .then(itog => {
            console.log(itog);
            const element= document.getElementById(`${districtClassName}`);
            if(element) {
                console.log(element)
                element.textContent = itog.district || '';
            }
        })
}
