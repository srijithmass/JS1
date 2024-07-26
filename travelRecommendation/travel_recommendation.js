function search() {
    const keyword = document.getElementById('search-bar').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            if (keyword.includes('beach')) {
                results = data.beaches;
            } else if (keyword.includes('temple')) {
                results = data.temples;
            } else {
                results = data.countries.filter(country => 
                    country.name.toLowerCase().includes(keyword));
            }
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    results.forEach(result => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.innerHTML = `
            <img src="${result.imageUrl}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        `;
        resultsContainer.appendChild(resultDiv);
    });
}

function resetResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('search-bar').value = '';
}
