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

        if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
            const list = document.createElement('ul');
            (Array.isArray(data) ? data : [data]).forEach((item, index) => {
                const li = document.createElement('li');
                const roleName = item.PolicyName || item.RoleName || `Role ${index + 1}`;
                li.innerHTML = `
                    <div class="role-header" onclick="togglePermissions(${index})">
                        <span class="expand-icon">+</span> ${roleName}
                    </div>
                    <div id="permissions-${index}" class="permissions-list" style="display: none;">
                        ${formatPermissions(item.PolicyDocument || item.Permissions)}
                    </div>
                `;
                list.appendChild(li);
            });
            resultsDiv.appendChild(list);

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

function formatPermissions(permissions) {
    try {
        if (Array.isArray(permissions)) {
            return permissions.map(perm => `
                <div>
                    <strong>Actions:</strong> ${perm.actions.join(', ')}<br>
                    <strong>Not Actions:</strong> ${perm.not_actions.join(', ')}<br>
                    <strong>Data Actions:</strong> ${perm.data_actions.join(', ')}<br>
                    <strong>Not Data Actions:</strong> ${perm.not_data_actions.join(', ')}
                </div>
            `).join('<hr>');
        } else if (typeof permissions === 'object' && permissions.PolicyDocument) {
            const policy = permissions.PolicyDocument;
            let output = `<div><strong>Policy Name:</strong> ${permissions.PolicyName}<br>`;
            output += `<strong>Version:</strong> ${policy.Version}<br>`;
            output += `<strong>Statements:</strong><br>`;
            output += policy.Statement.map(statement => `
                <div style="margin-left: 20px;">
                    <strong>Effect:</strong> ${statement.Effect}<br>
                    ${statement.Action ? `<strong>Action:</strong> ${Array.isArray(statement.Action) ? statement.Action.join(', ') : statement.Action}<br>` : ''}
                    ${statement.NotAction ? `<strong>NotAction:</strong> ${Array.isArray(statement.NotAction) ? statement.NotAction.join(', ') : statement.NotAction}<br>` : ''}
                    <strong>Resource:</strong> ${statement.Resource}
                </div>
            `).join('<hr>');
            output += '</div>';
            return output;
        } else {
            return `<div>${JSON.stringify(permissions)}</div>`;
        }
    } catch (error) {
        console.error('Error formatting permissions:', error);
        console.log('Permissions object:', permissions);
        return '<div>Error formatting permissions. Check console for details.</div>';
    }
}

function togglePermissions(index) {
    const permissionsDiv = document.getElementById(`permissions-${index}`);
    const expandIcon = permissionsDiv.previousElementSibling.querySelector('.expand-icon');
    if (permissionsDiv.style.display === 'none') {
        permissionsDiv.style.display = 'block';
        expandIcon.textContent = '-';
    } else {
        permissionsDiv.style.display = 'none';
        expandIcon.textContent = '+';
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