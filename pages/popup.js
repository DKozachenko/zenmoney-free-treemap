(async () => {
  const storage = await chrome.storage.local.get("isTreemapUrl");
  const state = document.querySelector('.state');
  state.classList.add('state_show');
  
  const stateCircle = state.querySelector('.state__circle');
  const stateLabel = state.querySelector('.state__label');

  if (storage.isTreemapUrl) {
    stateCircle.classList.add('state__circle_green');
    stateCircle.style.boxShadow = '0 0 10px #29a325';
    stateLabel.textContent = 'Works';
  } else {
    stateCircle.classList.add('state__circle_red');
    stateCircle.style.boxShadow = '0 0 10px #ff7272';
    stateLabel.textContent = 'Doesn\'t work';
  }
})()