const foodName = document.getElementById('food-name')
const specialDishImg = document.getElementById('today-img')
const specialDishName = document.getElementById('sp-dish-name')
const searchButton = document.getElementById('search-btn')
const closeBtn = document.getElementById('close')
const modal = document.querySelector('.mid')
const refresh = document.getElementById("refresh")
const scroll = document.getElementById('scrollButton')

const seafood = document.getElementById('Seafood')
const breakfast = document.getElementById('Breakfast')
const Vegetarian = document.getElementById('Vegetarian')
const Side = document.getElementById('Side')
const Pasta = document.getElementById('Pasta')
const Dessert = document.getElementById('Dessert')

const recipeButton = document.querySelector('.recipe')

searchButton.onclick=()=>{
    let name = foodName.value.trim()
    console.log(name)
    fetchData(name,foodName)
}

seafood.onclick=()=>fetchData('Seafood',foodName)
breakfast.onclick=()=>fetchData('Breakfast',foodName)
Vegetarian.onclick=()=>fetchData('Vegetarian',foodName)
Side.onclick=()=>fetchData('Side',foodName)
Pasta.onclick=()=>fetchData('Pasta',foodName)
Dessert.onclick=()=>fetchData('Dessert',foodName)

async function randomData() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        let data = await response.json()
        console.log(data.meals)

        displayRandom(data.meals[0])
        createRecipe(data.meals[0].idMeal,false)
    } catch (err) {
        console.error("Error fetching data:",err)
    }
}

randomData()

//viewing the random meal data
function displayRandom(data){
    specialDishName.innerText = `${data.strMeal}`
    specialDishImg.src = `${data.strMealThumb}`

    recipeButton.innerHTML = `<h1 class="recipe-btn" data-mealid="${data.idMeal}">Recipe</h1>`
}

closeBtn.onclick=()=>{
    modal.style.display = 'none'
    document.getElementById('h2').textContent = ''
    document.getElementById('list').innerHTML = ''
};

function fetchData(foodCategory, inputBox) {
    async function getData(foodCategory) {
        try {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${foodCategory}`)
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            let data = await response.json()
            console.log(data.meals)

            displayData(data.meals)
        } catch (err) {
            console.error("Error fetching data:", err)
        }
    }
    inputBox.value = foodCategory

    getData(foodCategory)
}

