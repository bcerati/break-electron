function ajax(method, path, data, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, `http://127.0.0.1:8080/api${path}`);

    if (typeof data !== 'undefined') {
      let formData = new FormData();
      Object
        .keys(data)
        .map(function (name) {
          formData.append(name, data[name]);
        });
        xhr.send(formData);
    } else {
      xhr.send();
    }


  xhr.onload = function() {
    if (xhr.status != 200) { // analyze HTTP status of the response
      console.log('err', xhr.statusText);
    } else {
      cb(JSON.parse(xhr.response))
    }
  };
}


window.addEventListener('load', function load(event) {
  ajax('GET', '/breaks', undefined, function (data) {
    console.log('My response is ', data);
  })

  //ajax('POST', '/breaks', {
  //  boris: 'cerati'
  //}, function (data) {
  //  console.log('My response is ', data);
  //})
  let personne = require('./file.json')


  var section = document.querySelector('section');
  var art = document.createElement('article');
  var myH2 = document.createElement('h2');
  var myPara1 = document.createElement('p');

  myPara1.textContent = 'Age: ' + personne.age;

  art.appendChild(myH2);
  art.appendChild(myPara1);

  section.appendChild(art);


// document.getElementById('login').onclick = function(event) {
//         var email = document.getElementById('email-input').value;
//
//         fetch('http://127.0.0.1:8000/api/login?email=' + email).then(function (data) {
//           alert(data);
//         });
// }


  var b = document.getElementById('break-button');
    b.onclick = function(event) {

      if (b.value === "Début d'une Pause") {
        b.value = "Fin d'une Pause";
        b.style.background = "red";
    } else {
      b.value = "Début d'une Pause";
      b.style.background = "green";
  }


}



  document.getElementById('app-close').onclick = function(event) {
    const remote = require('electron').remote // chargement de l'api remote
    var window = remote.getCurrentWindow() // on récupère la fenetre courante
    window.close() // on ferme la fenetre
  }

})
