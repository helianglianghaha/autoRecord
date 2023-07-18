// Define a global variable to store the whitelist
// Define a global variable to store the whitelist
let noticeList = [];


// Function to handle whitelist configuration
function configureNoticeList() {
  const domain = prompt('添加企信通知，例如：https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e7aa0419-ad36-458a-ac76-3240fcbdedd3');
  if (domain) {
    noticeList.push(domain);
    updateNoticeListDisplay();
    saveNoticelist();
  }
}
function saveNoticelist() {
  chrome.storage.local.set({ noticeList });
}

document.getElementById('noticeBtn').addEventListener('click', configureNoticeList);
function updateNoticeListDisplay() {
  const NoticeTable = document.getElementById('noticeTable');
  const NoticeBody = NoticeTable.querySelector('tbody');
  NoticeBody.innerHTML = '';

  noticeList.forEach((domain, index) => {
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
      editNoticeItem(index);
    });
    actionsCell.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', () => {
      noticeList.splice(index, 1);
      updateNoticeListDisplay();
      saveNoticelist();
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    NoticeBody.appendChild(row);
  });
}

function editNoticeItem(index) {
  const domain = noticeList[index];
  const editedDomain = prompt('输入域名格式', domain);
  if (editedDomain) {
    noticeList[index] = editedDomain;
    updateNoticeListDisplay();
    saveNoticelist();
  }
}


function loadNoticeList() {
  chrome.storage.local.get(['noticeList'], (result) => {
    if (result.noticeList && Array.isArray(result.noticeList)) {
      noticeList = result.noticeList;
      updateNoticeListDisplay();
    }
  });
}

updateNoticeListDisplay();
loadNoticeList();
