window.addEventListener('load', function load(event) {


  let personne = require('./file.json')
  console.log(personne)

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
