const resultsDiv = document.getElementById('results');
const results = document.getElementsByClassName('results');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value;
    const url = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.results.length === 0) {
                results.innerHTML = '<p>Nema rezultata</p>';
            } else {
                const resultList = document.createElement('ul');
                for (const result of data.results) {
                    const resultItem = document.createElement('li');
                    const artistName = result.artistName;
                    const genreName = result.primaryGenreName || 'Nepoznato';
                    resultItem.textContent = `${artistName} (${genreName})`;
                    resultList.appendChild(resultItem);
                }
                resultsDiv.appendChild(resultList);
            }
        })
        .catch((error) => {
            console.error(error);
            resultsDiv.innerHTML =
                '<p>Došlo je do greške prilikom dohvacanja rezultata</p>';
        });
});
