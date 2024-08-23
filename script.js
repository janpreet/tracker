let currentProvider = 'aws';

async function loadComparison(provider, date = null) {
    currentProvider = provider;
    const resultsDiv = document.getElementById('comparison-results');
    const lastSnapshotSpan = document.getElementById('last-snapshot-date');
    resultsDiv.innerHTML = 'Loading...';

    try {
        const filename = date 
            ? `${provider}_permissions_${date.replace(/-/g, '')}.json`
            : `${provider}_permissions_latest.json`;
        const response = await fetch(`./snapshots/${provider}/${filename}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        resultsDiv.innerHTML = '';

        if (data && data.length > 0) {
            const list = document.createElement('ul');
            data.forEach(role => {
                const li = document.createElement('li');
                li.textContent = `Role: ${role.RoleName || role.name}`;
                list.appendChild(li);
            });
            resultsDiv.appendChild(list);

            // Update last snapshot date
            const lastModified = new Date(response.headers.get('last-modified'));
            lastSnapshotSpan.textContent = lastModified.toLocaleString();
        } else {
            resultsDiv.textContent = 'No data available for ' + provider;
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.textContent = 'Error loading data. Please check the console for more information.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComparison('aws');

    document.getElementById('aws-button').addEventListener('click', () => loadComparison('aws'));
    document.getElementById('azure-button').addEventListener('click', () => loadComparison('azure'));
    document.getElementById('gcp-button').addEventListener('click', () => loadComparison('gcp'));

    document.getElementById('compare-button').addEventListener('click', () => {
        const date = document.getElementById('snapshot-date').value;
        if (date) {
            loadComparison(currentProvider, date);
        } else {
            alert('Please select a date to compare.');
        }
    });
});