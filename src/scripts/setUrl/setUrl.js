export default function setUrl(url) {
  const urlHash = url.pathname + url.hash;
  //   console.log(history);
  if (history.state !== null) {
    // history.replaceState({ hash: url.hash }, "", urlHash);
  }
}
