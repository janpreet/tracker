async function loadComparison(provider) {
    const resultsDiv = document.getElementById('comparison-results');
    resultsDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch('./snapshots/comparison_latest.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
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
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.textContent = 'Error loading data. Please check the console for more information.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComparison('aws');
});