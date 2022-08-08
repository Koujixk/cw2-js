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
let tableHeaders

const addingValuesToTable = (arr) => {
    tableFetch.innerHTML = `
    <tr>
        <th>${Object.keys(arr[0])[0]}</th>
        <th><div id='tableHeaderYear' onclick='sortingArray(filmsArray)' class='table-header'><span>${Object.keys(arr[0])[1]}</span><div class='arrow arrow-down' id='arrow'></div></div></th>
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
        <th><div id='tableHeaderYear' onclick='sortingArray(filmsArray)' class='table-header'><span>${Object.keys(arr[0])[1]}</span><div class='arrow'  id='arrow'></div></div></th>
        <th>${Object.keys(arr[0])[9]}</div></th>
        <th>${Object.keys(arr[0])[4]}</th>
    </tr>
    `
    tableHeaders = document.querySelectorAll('th > button:last-child')
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

const reset = (arr) => {
    searchInput.value = ''
    tableFetch.innerHTML = `
    <tr>
        <th>${Object.keys(arr[0])[0]}</th>
        <th><div id='tableHeaderYear' onclick='sortingArray(filmsArray)' class='table-header'><span>${Object.keys(arr[0])[1]}</span><div class='arrow' id='arrow'></div></div></th>
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
let isClicked = false
const sortingArray = (arr) => {
    if(isClicked == false){
        tableFetch.innerHTML =''
        tableFetch.innerHTML = `
        <tr>
            <th>${Object.keys(arr[0])[0]}</th>
            <th><div id='tableHeaderYear' onclick='sortingArray(filmsArray)'><span>${Object.keys(arr[0])[1]}</span><div class='arrow arrow-up'></div></div></th>
            <th>${Object.keys(arr[0])[9]}</th>
            <th>${Object.keys(arr[0])[4]}</th>
        </tr>
        `
        let sortedFilms = arr.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
              }
              if (a.title < b.title) {
                return -1;
              }
              return 0;
        })
        sortedFilms.forEach((el, index) => {
    
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
        isClicked = true
        console.log(isClicked)
    }else if(isClicked == true){
        tableFetch.innerHTML = ''
        tableFetch.innerHTML = `
        <tr>
            <th>${Object.keys(arr[0])[0]}</th>
            <th><div id='tableHeaderYear' onclick='sortingArray(filmsArray)' class='table-header'><span>${Object.keys(arr[0])[1]}</span><div class='arrow arrow-down' id='arrow'></div></div></th>
            <th>${Object.keys(arr[0])[9]}</th>
            <th>${Object.keys(arr[0])[4]}</th>
        </tr>
        `
        let sortedFilms = arr.sort((a, b) => {
            if (a.title > b.title) {
                return -1;
              }
              if (a.title < b.title) {
                return 1;
              }
              return 0;
        })
        sortedFilms.forEach((el, index) => {
    
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
        isClicked = false
        console.log('works', isClicked)
    }
    
}