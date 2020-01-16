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


  ajax('GET', '/daily', undefined, function (data) {
    console.log('Temps total journée ', data);

    var section2 = document.getElementById('infjourn')
    var art2 = document.createElement('article');
    var titre2 = document.createElement('h3');
    var para2 = document.createElement('p');


    titre2.textContent = " Temps total de pause de la journée :";
    para2.textContent = JSON.stringify(data[0][1]);

    art2.appendChild(titre2);
    art2.appendChild(para2);
    section2.appendChild(art2);


  })




    ajax('GET', '/tempstotal', undefined, function (data) {
      console.log('Temps total 5 jours ', data);

      var section3 = document.getElementById('inf5')
      var art3 = document.createElement('article');
      var titre3 = document.createElement('h3');
      var para3 = document.createElement('p');


      titre3.textContent = " Temps total de pause des 5 derniers jours :";
      para3.textContent = JSON.stringify(data[0][1]);

      art3.appendChild(titre3);
      art3.appendChild(para3);
      section3.appendChild(art3);


    })


  var section = document.getElementById('userconnected')
  var art = document.createElement('article');
  var titre = document.createElement('h3');
  var para = document.createElement('p');
  var u = localStorage.getItem('user-id');

  para.textContent = 'Utilisateur connecté : ' + u ;


  art.appendChild(titre);
  art.appendChild(para);
  section.appendChild(art);


// document.getElementById('login').onclick = function(event) {
//         var email = document.getElementById('email-input').value;
//
//         fetch('http://127.0.0.1:8000/api/login?email=' + email).then(function (data) {
//           alert(data);
//         });
// }



  var b = document.getElementById('break-button');
    b.onclick = function() {

      if (b.value === "Début d'une Pause") {

        ajax('POST', '/breaks', undefined, function (data){});
        b.value = "Fin d'une Pause";
        b.style.background = "red";


    } else {
      ajax('PATCH', '/breaks', undefined, function (data){});
      b.value = "Début d'une Pause";
      b.style.background = "LimeGreen";
      location.reload();
  }


}



  document.getElementById('app-close').onclick = function(event) {
    const remote = require('electron').remote // chargement de l'api remote
    var window = remote.getCurrentWindow() // on récupère la fenetre courante
    window.close() // on ferme la fenetre
  }

})
