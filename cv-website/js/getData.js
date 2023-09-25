window.estimates=null;
function getData(districtClassName, realtyComplexClassName, flatClassName)  {
    if(window.estimates) {
        replace(districtClassName, realtyComplexClassName, flatClassName,window.estimates);
        return;
    }

    fetch('https://6502dc12a0f2c1f3faeafdf7.mockapi.io/test/estimates/1')
        .then(result => result.json())
        .then(itog => {
            window.estimates=itog;
        })
}

function replace(districtClassName, realtyComplexClassName, flatClassName,estimates){

    let element= document.getElementById(`${districtClassName}`);
    if(element) {
        element.textContent = estimates.district || '';
    }
    element= document.getElementById(`${realtyComplexClassName}`);
    if(element) {
        element.textContent = estimates["realty complex"]
            || '';
    }
    element= document.getElementById(`${flatClassName}`);
    if(element) {
        element.textContent = estimates.flate
            || '';
    }

}
