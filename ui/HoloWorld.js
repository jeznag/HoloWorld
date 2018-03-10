function holoWorldEntryCreate(message, world, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/fn/HoloWorld/holoWorldEntryCreate';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  var data = JSON.stringify({
    content: message,
    world: world,
    timestamp: new Date().toISOString()
  });
  console.log('create', data);
  xhr.send(data);
}

function holoWorldEntryRead(hash, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/fn/HoloWorld/holoWorldEntryRead';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  var data = JSON.stringify({ hash: hash });
  xhr.send(data);
}

function holoWorldEntryGetAll(worldName, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/fn/HoloWorld/holoWorldEntryGetAll';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  var data = JSON.stringify({ worldName: worldName });
  xhr.send(data);
}

function holoWorldAddWorld(worldName, callback) {
  var xhr = new XMLHttpRequest();
  var url = '/fn/HoloWorld/holoWorldAddWorld';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  var data = JSON.stringify({ worldName: worldName });
  xhr.send(data);
}

function holoWorldsGetAll(callback) {
  var xhr = new XMLHttpRequest();
  var url = '/fn/HoloWorld/holoWorldsGetAll';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(JSON.parse(xhr.responseText));
    }
  };
  var data = JSON.stringify({});
  xhr.send(data);
}
