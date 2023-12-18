const foodName = document.getElementById('food-name')
const specialDishImg = document.getElementById('today-img')
const specialDishName = document.getElementById('sp-dish-name')
const searchButton = document.getElementById('search-btn')
const closeBtn = document.getElementById('close')
const modal = document.querySelector('.mid')

const seafood = document.getElementById('Seafood')
const breakfast = document.getElementById('Breakfast')
const Vegetarian = document.getElementById('Vegetarian')
const Side = document.getElementById('Side')
const Pasta = document.getElementById('Pasta')
const Dessert = document.getElementById('Dessert')


// Viewing the data
searchButton.onclick=()=>{
    let name = foodName.value.trim()
        console.log(name)
        async function getData(name) {
            try {
                    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    let data = await response.json();
                    console.log(data.meals);
                    
                    displayData(data.meals)
                } catch (err) {
                console.error("Error fetching data:", err);
            }
        }
        getData(name)
};

function displayData(data){
    document.querySelector(".items-flex").innerHTML = ""
    let cards = ""
    data.forEach((ele)=>{
        cards += 
        `<div class="cards">
        <img src="${ele.strMealThumb}" id="res-img">
        <h1 id="h1">${ele.strMeal}</h1>
        <div class="go-btn">
            <h1>Recipe</h1>
        </div>
    </div>`
    })
    document.querySelector(".items-flex").innerHTML = cards
}

async function randomData() {
    try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            console.log(data.meals);
            
            displayRandom(data.meals[0])
        } catch (err) {
        console.error("Error fetching data:", err);
    }
}
randomData()

function displayRandom(data){
    specialDishName.innerText = `${data.strMeal}`
    specialDishImg.src = `${data.strMealThumb}`
}

closeBtn.onclick=()=>{
    modal.style.display = none
    console.log('jhi')
}
