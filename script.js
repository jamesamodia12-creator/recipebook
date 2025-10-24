const mealGrid = document.getElementById('mealGrid');
const mealDetails = document.getElementById('mealDetails');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

// Load meals on start
window.addEventListener('DOMContentLoaded', loadRandomMeals);

// Search button
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    searchMeals(query);
  }
});

// Reset button
resetBtn.addEventListener('click', () => {
  searchInput.value = '';
  mealDetails.innerHTML = '';
  loadRandomMeals();
});

// Click handler for meals
mealGrid.addEventListener('click', e => {
  if (e.target.tagName === 'IMG') {
    const mealId = e.target.getAttribute('data-id');
    fetchMealDetails(mealId);
  }
});

// 🔄 Load multiple random meals
function loadRandomMeals(count = 12) {
  mealGrid.innerHTML = '';
  const fetches = Array.from({ length: count }, () =>
    fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
  );

  Promise.all(fetches).then(results => {
    const meals = results.map(r => r.meals[0]);
    showMealGrid(meals);
  });
}

// 🔍 Search meals by name
function searchMeals(name) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then(res => res.json())
    .then(data => {
      if (data.meals) {
        showMealGrid(data.meals);
      } else {
        mealGrid.innerHTML = `<p>No meals found for "${name}".</p>`;
        mealDetails.innerHTML = '';
      }
    });
}

// 📤 Render meals in grid
function showMealGrid(meals) {
  mealGrid.innerHTML = meals
    .map(
      meal => `
      <img 
        src="${meal.strMealThumb}" 
        alt="${meal.strMeal}" 
        data-id="${meal.idMeal}" 
        title="${meal.strMeal}">
    `
    )
    .join('');
}

// 📦 Get and display meal details
function fetchMealDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      displayMealDetails(meal);
    });
}

// 🧾 Show detailed recipe
function displayMealDetails(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${ing} - ${measure}`);
    }
  }

  mealDetails.innerHTML = `
    <div class="meal">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p><strong>Category:</strong> ${meal.strCategory || 'N/A'} | 
         <strong>Area:</strong> ${meal.strArea || 'N/A'}</p>
      <p>${meal.strInstructions.substring(0, 300)}...</p>

      <div class="ingredients">
        <h3>Ingredients:</h3>
        <ul>${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>

      <p><a href="${meal.strYoutube}" target="_blank">📺 Watch on YouTube</a></p>
    </div>
  `;
}
