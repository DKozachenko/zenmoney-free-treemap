const treemapUrl = 'https://zenmoney.ru/a/#reports/treemap';

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function isTreemapUrl(tab) {
  return tab.url.startsWith(treemapUrl);
}

async function getText() {
  const currentTab = await getCurrentTab();
  console.log(currentTab, 1);

  return isTreemapUrl(currentTab) ? 'ON' : 'OFF'; 
}

async function updateState() {
  await chrome.action.setBadgeText({
    text: await getText(),
  });

  const currentTab = await getCurrentTab();

  await chrome.storage.local.set({ isTreemapUrl: isTreemapUrl(currentTab) });  
}

chrome.runtime.onInstalled.addListener(updateState);
chrome.tabs.onActivated.addListener(updateState);
chrome.tabs.onUpdated.addListener(updateState);
