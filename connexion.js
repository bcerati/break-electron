function connecttoken (username, password, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', `http://127.0.0.1:8000/api/login`);

  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);



  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    username,
    password
  }))


  ;


  xhr.onload = function() {
    if (xhr.status < 500 && xhr.status >= 400) { // analyze HTTP status of the response
      document.getElementById('loginerror').innerHTML= "Identifiants incorrects";
    } else {
      cb(JSON.parse(xhr.response))
      document.getElementById('loginerror').innerHTML= "";
    }
  };
}


function roleuser(data, cb) {

   let xhr = new XMLHttpRequest();
   xhr.open('GET', `http://127.0.0.1:8000/api/me`);
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

  document.getElementById('login-button').onclick = function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    localStorage.setItem('user-id', username);

    connecttoken(username, password, function ({ token }) {

    localStorage.setItem('user-token', token);


    roleuser(undefined, function(data) {
      const isManager = data.roles.includes('ROLE_MANAGER')
      localStorage.setItem('user-is-manager', isManager)

      if (isManager) {
        document.getElementById('go-to-manager').click();
      }
      else {
        document.getElementById('go-to-index').click();
      }});

    });
  }
});
