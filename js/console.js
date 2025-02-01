const search = 'https://duckduckgo.com/?q='
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        window.location = search + event.target.value;
    }
}

const searchInput = document.getElementById('console-bar');
function keepFocus() {
    searchInput.focus();
}; setInterval(keepFocus, 100);

searchInput.value = '';
searchInput.addEventListener('keypress', handleEnterKey);