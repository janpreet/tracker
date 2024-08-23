let currentProvider = 'aws';
let allRoles = [];

function sortObjectKeys(obj) {
    return Object.keys(obj).sort().reduce((result, key) => {
        result[key] = obj[key];
        return result;
    }, {});
}

function formatPermissions(permissions, provider) {
    if (provider === 'aws') {
        return formatAWSPermissions(permissions);
    } else if (provider === 'azure') {
        return formatAzurePermissions(permissions);
    } else if (provider === 'gcp') {
        return formatGCPPermissions(permissions);
    }
    return `<div>${JSON.stringify(sortObjectKeys(permissions), null, 2)}</div>`;
}

function formatAWSPermissions(permissions) {
    const policy = permissions.PolicyDocument;
    let output = `<div class="policy">
        <div><strong>Policy Name:</strong> ${permissions.PolicyName}</div>
        <div><strong>Version:</strong> ${policy.Version}</div>
        <div><strong>Statements:</strong></div>`;
    
    output += policy.Statement.map(statement => {
        let statementOutput = `<div class="statement">
            <div><strong>Effect:</strong> ${statement.Effect}</div>`;
        
        if (statement.Action) {
            statementOutput += `<div><strong>Action:</strong></div>
            <ul>${Array.isArray(statement.Action) ? statement.Action.sort().map(action => `<li>${action}</li>`).join('') : `<li>${statement.Action}</li>`}</ul>`;
        }
        
        if (statement.NotAction) {
            statementOutput += `<div><strong>NotAction:</strong></div>
            <ul>${Array.isArray(statement.NotAction) ? statement.NotAction.sort().map(notAction => `<li>${notAction}</li>`).join('') : `<li>${statement.NotAction}</li>`}</ul>`;
        }
        
        statementOutput += `<div><strong>Resource:</strong> ${Array.isArray(statement.Resource) ? statement.Resource.sort().join(', ') : statement.Resource}</div>`;
        
        return statementOutput + '</div>';
    }).join('');
    
    return output + '</div>';
}

function formatAzurePermissions(permissions) {
    let output = `<div class="policy">
        <div><strong>Role Name:</strong> ${permissions.RoleName}</div>
        <div><strong>Description:</strong> ${permissions.Description}</div>
        <div><strong>Permissions:</strong></div>`;
    
    output += permissions.Permissions.map(perm => `
        <div class="statement">
            <div><strong>Actions:</strong> ${perm.actions.sort().join(', ')}</div>
            <div><strong>Not Actions:</strong> ${perm.not_actions.sort().join(', ')}</div>
            <div><strong>Data Actions:</strong> ${perm.data_actions.sort().join(', ')}</div>
            <div><strong>Not Data Actions:</strong> ${perm.not_data_actions.sort().join(', ')}</div>
        </div>
    `).join('');
    
    return output + '</div>';
}

function formatGCPPermissions(permissions) {
    let output = `<div class="policy">
        <div><strong>Role Name:</strong> ${permissions.name}</div>
        <div><strong>Title:</strong> ${permissions.title}</div>
        <div><strong>Description:</strong> ${permissions.description}</div>
        <div><strong>Included Permissions:</strong></div>
        <ul>`;
    
    output += permissions.includedPermissions.sort().map(perm => `<li>${perm}</li>`).join('');
    output += '</ul></div>';
    
    return output;
}

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
        
        allRoles = data.sort((a, b) => {
            const nameA = a.PolicyName || a.RoleName || a.name;
            const nameB = b.PolicyName || b.RoleName || b.name;
            return nameA.localeCompare(nameB);
        });
        displayRoles(allRoles);

        const lastModified = new Date(response.headers.get('last-modified'));
        lastSnapshotSpan.textContent = lastModified.toLocaleString();
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.textContent = 'Error loading data. Please check the console for more information.';
    }
}

function displayRoles(roles) {
    const resultsDiv = document.getElementById('comparison-results');
    resultsDiv.innerHTML = '';

    if (roles.length > 0) {
        const list = document.createElement('ul');
        roles.forEach((item, index) => {
            const li = document.createElement('li');
            const roleName = item.PolicyName || item.RoleName || item.name || `Role ${index + 1}`;
            li.innerHTML = `
                <div class="role-header" onclick="togglePermissions(${index})">
                    <span class="expand-icon">+</span> ${roleName}
                </div>
                <div id="permissions-${index}" class="permissions-list" style="display: none;">
                    ${formatPermissions(item, currentProvider)}
                </div>
            `;
            list.appendChild(li);
        });
        resultsDiv.appendChild(list);
    } else {
        resultsDiv.textContent = 'No data available for ' + currentProvider;
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

function filterRoles() {
    const searchTerm = document.getElementById('role-search').value.toLowerCase();
    const filteredRoles = allRoles.filter(role => {
        const roleName = role.PolicyName || role.RoleName || role.name;
        return roleName.toLowerCase().includes(searchTerm);
    });
    displayRoles(filteredRoles);
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

    document.getElementById('role-search').addEventListener('input', filterRoles);
});