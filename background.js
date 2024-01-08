const treemapUrl = 'https://zenmoney.ru/a/#reports/treemap';

/** {@link https://developer.chrome.com/docs/extensions/reference/api/tabs?hl=en#get_the_current_tab Get the current tab} */
async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [ tab ] = await chrome.tabs.query(queryOptions);
  return tab;
}

function isTreemapUrl(tab) {
  return tab.url.startsWith(treemapUrl);
}

async function getText() {
  const currentTab = await getCurrentTab();
  return isTreemapUrl(currentTab) ? 'ON' : 'OFF'; 
}

async function updateState() {
  await chrome.action.setBadgeText({
    text: await getText(),
  });

  const currentTab = await getCurrentTab();
  await chrome.storage.local.set({ isTreemapUrl: isTreemapUrl(currentTab) });  
}

/** On extension initializing */
chrome.runtime.onInstalled.addListener(updateState);
/** On switching tabs */
chrome.tabs.onActivated.addListener(updateState);
/** On updating tabs */
chrome.tabs.onUpdated.addListener(updateState);
