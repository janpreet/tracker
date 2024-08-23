async function loadComparison(provider) {
    const resultsDiv = document.getElementById('comparison-results');
    resultsDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`./snapshots/${provider}/${provider}_permissions_latest.json`);
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
});

document.getElementById('aws-button').addEventListener('click', () => loadComparison('aws'));
document.getElementById('azure-button').addEventListener('click', () => loadComparison('azure'));
document.getElementById('gcp-button').addEventListener('click', () => loadComparison('gcp'));