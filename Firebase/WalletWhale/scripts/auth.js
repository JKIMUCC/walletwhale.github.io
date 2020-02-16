const auth = firebase.auth();
const db = firebase.firestore();


auth.onAuthStateChanged(user => {
  if(user != null) {
    uid =user.uid
    db.collection('users').doc(uid).collection('cards').onSnapshot(snapshot => {
      setupCards(snapshot.docs);
      setupUI(user);
    });

  } else {
    setupUI();
    setupCards([]);
  }
});


const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e)=> {
  e.preventDefault();

  const user = auth.currentUser;
  if (user !=null) {
    uid =user.uid;
  }

  db.collection('users').doc(uid).collection('cards').add({
    title: createForm['title'].value,
    name: createForm['name'].value,
    goodthru: createForm['goodthru'].value,
    cardnum: createForm['card#'].value,
    cvv: createForm['cvv'].value,
    address: createForm['address'].value,
    postcode: createForm['postcode'].value
  }).then(()=> {
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  })

});


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({});

  }).then(() => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  }) 
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});