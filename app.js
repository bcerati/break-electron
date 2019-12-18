


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




  var b = document.getElementById('break-button');
    b.onclick = function(event) {

      if (b.value = "Début d'une Pause") {
        b.value = "Fin d'une Pause";
        b.style.background = "red";
      }

      else if (b.value = "Fin d'une Pause") {
        b.value = "Début d'une Pause";
        b.style.background = "green";
    }
    }




   document.getElementById('btn-bdd').onclick = function(event) {
      var mysql = require("mysql");

      var connection = mysql.createConnection({
        host:'devbdd.iutmetz.univ-lorraine.fr',
        port: '3306',
        database: 'coqueron3u_breaks',
        user: 'coqueron3u_appli',
        password: '31805219'

      })

     // connect to mysql
     connection.connect(function(err) {
       // in case of error
       if(err){
         console.log(err.code);
         console.log(err.fatal);
       } else {

         document.getElementById('btn-bdd').value = "Connecté";
         document.getElementById('btn-bdd').disable = true;
       }
     });

     // Close the connection
     connection.end(function(){
       // The connection has been closed
     });

   }

  function el(selector) {
    return document.getElementById(selector);
  }

  el('action-btn').addEventListener('click', function(){
    // Get the mysql service
    getFirstTenRows(function(rows){
      var html = '';

      rows.forEach(function(row){
        html += '<tr>';
        html += '<td>';
        html += row.ad_mail;
        html += '</td>';
        html += '<td>';
        html += row.id_utilisateur;
        html += '</td>';
        html += '</tr>';
        console.log(row);
      });

      document.querySelector('#table > tbody').innerHTML = html;
    });
  },false);

  function getFirstTenRows(callback){
    var mysql = require("mysql");
    var connection = mysql.createConnection({
      host:'devbdd.iutmetz.univ-lorraine.fr',
      port: '3306',
      database: 'coqueron3u_breaks',
      user: 'coqueron3u_appli',
      password: '31805219'

    })

    // Perform a query
    $query = 'SELECT id_utilisateur, ad_mail FROM `utilisateur` LIMIT 10';

    connection.query($query, function(err, rows, fields) {
      if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
      }

      callback(rows);

      console.log("Query succesfully executed");
    });

    // Close the connection
    connection.end(function(){
      // The connection has been closed
    });
  }



  document.getElementById('app-close').onclick = function(event) {
    const remote = require('electron').remote // chargement de l'api remote
    var window = remote.getCurrentWindow() // on récupère la fenetre courante
    window.close() // on ferme la fenetre
  }

})
