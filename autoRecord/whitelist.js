// Define a global variable to store the whitelist
// Define a global variable to store the whitelist
let whitelist = [];


// Function to handle whitelist configuration
function configureWhitelist() {
  const domain = prompt('添加白名单，例如：platformtest.api.qidianbox.com');
  if (domain) {
    whitelist.push(domain);
    updateWhitelistDisplay();
    saveWhitelist();
  }
}
function saveWhitelist() {
  chrome.storage.local.set({ whitelist });
}

document.getElementById('whitelistBtn').addEventListener('click', configureWhitelist);
function updateWhitelistDisplay() {
  const whitelistTable = document.getElementById('whitelistTable');
  const whitelistBody = whitelistTable.querySelector('tbody');
  whitelistBody.innerHTML = '';

  whitelist.forEach((domain, index) => {
    const row = document.createElement('tr');

    // Domain column
    const domainCell = document.createElement('td');
    domainCell.textContent = domain;
    row.appendChild(domainCell);

    // Actions column
    const actionsCell = document.createElement('td');

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = '编辑';
    editButton.addEventListener('click', () => {
      editWhitelistItem(index);
    });
    actionsCell.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', () => {
      whitelist.splice(index, 1);
      updateWhitelistDisplay();
      saveWhitelist();
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    whitelistBody.appendChild(row);
  });
}

function editWhitelistItem(index) {
  const domain = whitelist[index];
  const editedDomain = prompt('输入域名格式', domain);
  if (editedDomain) {
    whitelist[index] = editedDomain;
    updateWhitelistDisplay();
    saveWhitelist();
  }
}


function loadWhitelist() {
  chrome.storage.local.get(['whitelist'], (result) => {
    if (result.whitelist && Array.isArray(result.whitelist)) {
      whitelist = result.whitelist;
      updateWhitelistDisplay();
    }
  });
}

updateWhitelistDisplay();
loadWhitelist();
