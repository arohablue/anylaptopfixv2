  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAIC3dXjQqbZtqUWdu3NjYqW6oGlje2r9U",
      authDomain: "anylaptopfix-3ca9a.firebaseapp.com",
      databaseURL: "https://anylaptopfix-3ca9a.firebaseio.com",
      projectId: "anylaptopfix-3ca9a",
      storageBucket: "anylaptopfix-3ca9a.appspot.com",
      messagingSenderId: "978382312662"
    };
  firebase.initializeApp(config);
  var db = firebase.firestore();

  function fetchImage(productId) {
      var storageRef = firebase.storage().ref();
      storageRef.child('fn7gKULPpMf9vsCb1XMR').getDownloadURL().then(function(url) {
          var test = url;
          alert(url);
          document.querySelector('#imgPro').src = test;

      }).catch(function(error) {
        console.log("Error getting document:", error)
      });
  }



 function fetchProduct(productId) {
  var docRef = db.collection("products").doc("fn7gKULPpMf9vsCb1XMR");
  docRef.get().then(function(doc) {
    
      if (doc.exists) {
          console.log("Product data:", doc.data());
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such product!");
      }
  }).catch(function(error) {
      console.log("Error getting product:", error);
  });
 }


function fetchProducts() {
  db.collection("products").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
  }).catch(function(error) {
    console.log("Error getting Products:", error);
});
}


  function uploadImage(productId) {
    var storageRef = firebase.storage().ref(productId);
    var file_data = $('#productImage').prop('files')[0];
    storageRef.put(file_data);
    alert('Image uploaded')
  }

 
  //this function is called when the submit button is clicked
  function submitProduct() {
    db.collection("products").add({
        name: $('#productName').val(), 
        price: $('#productPrice').val(),
        category: $('#productCategory').val(),
        description: $('#productDesc').val(),
        quantity: $('#productQuantity').val(),
        brand: $('#productBrand').val(),

    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        uploadImage(docRef.id)
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
      
  };