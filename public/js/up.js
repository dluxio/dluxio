var data = new FormData();
data.append("", "");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://ipfs-dev.dlux.io/api/v0/add?stream-channels=true");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.setRequestHeader("Postman-Token", "fdec21ea-58cf-46ce-91b6-b493e1c68978");

xhr.send(data);
