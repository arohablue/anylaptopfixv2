  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB0v08Cq8InyW_IKPGIQnlyAk4eimODqjQ",
    authDomain: "anylaptopfix-b2305.firebaseapp.com",
    databaseURL: "https://anylaptopfix-b2305.firebaseio.com",
    projectId: "anylaptopfix-b2305",
    storageBucket: "anylaptopfix-b2305.appspot.com",
    messagingSenderId: "750330966530"
  };
  firebase.initializeApp(config);


  function showimage() {
      var storageRef = firebase.storage().ref();
      storageRef.child('gla1.png').getDownloadURL().then(function(url) {
          var test = url;
          alert(url);
          document.querySelector('img').src = test;

      }).catch(function(error) {

      });
  }

  function uploadImage() {
    var timestamp = Number(new Date());
    var storageRef = firebase.storage().ref(timestamp.toString());
    var file_data = $('#product').prop('files')[0];
    storageRef.put(file_data);
  }

  function uploadProduct() {

  }

  function writeUserData(name, description, category, price) {
    firebase.database().ref('products/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

 
  //this function is called when the submit button is clicked
  function submitProduct() {
    var db = firebase.firestore();

    db.collection("products").add({
        name: $('#productName').val(), //another way you could write is $('#myForm [name="fullname"]').
        price: $('#productPrice').val(),
        category: $('#productCategory').val(),
        price: $('#productDesc').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
      
  };