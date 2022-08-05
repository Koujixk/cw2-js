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

tableFetch.innerHTML = `
        <tr>
            <th>${Object.keys(filmsArray[0])[0]}</th>
            <th>${Object.keys(filmsArray[0])[1]}</th>
            <th>${Object.keys(filmsArray[0])[9]}</th>
            <th>${Object.keys(filmsArray[0])[4]}</th>
        </tr>
`
filmsArray.forEach((el, index) => {
    console.log(el)
    tableFetch.innerHTML += `
        <tr>
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.release_date}</td>
            <td><div class='table-images' id="${"table-image" + index}"></div></td>
        </tr>
    `
    document.getElementById(`${"table-image" + index}`).style.backgroundImage = `url(${el.image})`
});