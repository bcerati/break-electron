function ajax(method, path, data, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, `http://127.0.0.1:8000/api${path}`);
    let token = localStorage.getItem('user-token');

    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

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


  ajax('GET', '/tempstotalmanager', undefined, function (data) {

    var section2 = document.getElementById('statistiques')
    var art2 = document.createElement('article');
    var titre2 = document.createElement('h3');
    var para2 = document.createElement('p');


    titre2.textContent = " Temps total des pauses des employés (pour cette journée) ";
    para2.textContent = JSON.stringify(data[0][1]);

    art2.appendChild(titre2);
    art2.appendChild(para2);
    section2.appendChild(art2);


  })






  var section = document.getElementById('userconnected')
  var art = document.createElement('article');
  var titre = document.createElement('h3');
  var para = document.createElement('p');
  var u = localStorage.getItem('user-id');

  para.textContent = 'Manager connecté : ' + u ;


  art.appendChild(titre);
  art.appendChild(para);
  section.appendChild(art);



  document.getElementById('btn-stat').onclick = function(event) {

    document.getElementById('statistiques').style.display="inherit";

  }


  document.getElementById('app-close').onclick = function(event) {
    const remote = require('electron').remote // chargement de l'api remote
    var window = remote.getCurrentWindow() // on récupère la fenetre courante
    window.close() // on ferme la fenetre
  }

})
