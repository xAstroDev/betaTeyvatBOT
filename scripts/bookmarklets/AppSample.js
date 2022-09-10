const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert('Copied data to clipboard.');
};

const getAppSampleData = () => {
  return JSON.stringify([
    ...document.getElementById('app').__vue_app__._context.provides.store._state.data.user.userData
      .doneMarkers,
    ...JSON.parse(window.localStorage['gim-local-markers']).markerIds,
  ]);
};

copyToClipboard(getAppSampleData());
