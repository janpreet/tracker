async function loadComparison(provider) {
    const response = await fetch('snapshots/comparison_latest.json');
    const data = await response.json();
    
    const resultsDiv = document.getElementById('comparison-results');
    resultsDiv.innerHTML = '';

    if (data[provider] && data[provider].length > 0) {
        const list = document.createElement('ul');
        data[provider].forEach(change => {
            const item = document.createElement('li');
            item.textContent = change;
            list.appendChild(item);
        });
        resultsDiv.appendChild(list);
    } else {
        resultsDiv.textContent = 'No changes detected for ' + provider;
    }
}