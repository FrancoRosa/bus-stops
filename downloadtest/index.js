const data = {
  this: 1,
  that: 2
}
var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
var dlAnchorElem = document.getElementById('downloadAnchorElem');
dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "rutas.txt");

console.log('ashdkhasb as dkashd')