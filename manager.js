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
    var ol  = document.createElement('ol');



    titre2.textContent = " Temps total des pauses des employés (pour cette journée) ";


    art2.appendChild(titre2);
    art2.appendChild(ol);

    console.log(data);


    for (var i = 0; i < data.length; i++) {

      var li = document.createElement('li');
      var p = document.createElement('p');
      p.textContent = "  Utilisateur :  " + JSON.stringify(data[i].user_id) +
                      "  Début de la pause  " + JSON.stringify(data[i].date_debut.date) +
                      "  Fin de la pause " + JSON.stringify(data[i].date_fin.date);

      art2.appendChild(li);
      art2.appendChild(p);

    }

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
