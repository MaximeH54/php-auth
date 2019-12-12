const apiKey = 'AIzaSyAE4RVpUb7X1dp1_GFaqhF23_Q11maloBI'
//app Google
const clientId = '798194073310-46u2j7i62dopv0l5jffmb7nubn0stmeu.apps.googleusercontent.com' // Id Client Google

const displayUser = document.getElementById('user')
const displayName = document.getElementById('name')
const btnLogin = document.getElementById('login')
const btnLogout = document.getElementById('logout')

let auth
let user

function initGAuth () {
  auth = gapi.auth2.getAuthInstance()
  auth.isSignedIn.listen(loginStatus)
  loginStatus()
}

function loginStatus () {
  const isSignedIn = auth.isSignedIn.get()
  if (isSignedIn) {
    user = auth.currentUser.get()

    const idToken = user.getAuthResponse().id_token

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        const response = JSON.parse(this.response)
        console.log(response)
        document.getElementById('image').
        setAttribute('src', response.picture)
      }
    }
    xhr.open('POST', 'google.php', true)
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded")
    xhr.send(`id_token=${idToken}`)



    displayUser.style.display = 'block'
    document.getElementById('name').
    textContent = user.getBasicProfile().getName()
    btnLogin.style.display = 'none'
    btnLogout.style.display = 'block'
  } else {
    user = null
    displayUser.style.display = 'none'
    btnLogin.style.display = 'block'
    btnLogout.style.display = 'none'
  }
}

function loginGoogle () {
  auth.signIn()
}

function logoutGoogle () {
  auth.signOut().then(() => {
    auth.disconnect()
    auth.isSignedIn.set(null)
    window.location.href = 'logout.php'
  });
}

if (typeof gapi === 'object' && gapi.load) {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: apiKey,
      clientId: clientId,
      scope: 'profile',
    }).
    then(initGAuth)
  })
}


//AIzaSyAE4RVpUb7X1dp1_GFaqhF23_Q11maloBI
