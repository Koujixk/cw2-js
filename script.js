const fetchingApi = () => {
    fetch('https://ghibliapi.herokuapp.com/films')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            localStorage.setItem('films', JSON.stringify(data))
        });
}
let filmsArray 
function findApiFromLocalStorage() {
    if(localStorage.getItem('films')){
        filmsArray = JSON.parse(localStorage.getItem('films'))

    }else{
        fetchingApi()
    }
}
findApiFromLocalStorage()
const tableFetch = document.getElementById('table-fetch')

const addingValuesToTable = (arr) => {
    tableFetch.innerHTML = `
    <tr>
        <th>${Object.keys(arr[0])[0]}</th>
        <th>${Object.keys(arr[0])[1]}</th>
        <th>${Object.keys(arr[0])[9]}</th>
        <th>${Object.keys(arr[0])[4]}</th>
    </tr>
    `
    arr.forEach((el, index) => {

        tableFetch.innerHTML += `
        <tr>
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.release_date}</td>
            <td><div id="${"table-image" + index}" class='table-images'></div></td>
        </tr>
        `
        document.getElementById(`${"table-image" + index}`).style.backgroundImage = `url(${el.image})`
    })
    
}
addingValuesToTable(filmsArray)
const searchInput = document.getElementById('search-input')
const refreshingTableUsingInput = (arr) => {
    tableFetch.innerHTML = ''
    tableFetch.innerHTML += `
    <tr>
        <th>${Object.keys(arr[0])[0]}</th>
        <th>${Object.keys(arr[0])[1]}</th>
        <th>${Object.keys(arr[0])[9]}</th>
        <th>${Object.keys(arr[0])[4]}</th>
    </tr>
    `
    arr.forEach((el, index) => {
        if(el.title.toLowerCase().includes(searchInput.value.toLowerCase())){

            tableFetch.innerHTML += `
            <tr>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td>${el.release_date}</td>
                <td><div id="${"table-image" + index}" class='table-images'></div></td>
            </tr>
            `
            document.getElementById(`${"table-image" + index}`).style.backgroundImage = `url(${el.image})`
        }else if(searchInput.value == false){
            tableFetch.innerHTML += `
            <tr>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td>${el.release_date}</td>
                <td><div id="${"table-image" + index}" class='table-images'></div></td>
            </tr>
            `
        }
    });
}