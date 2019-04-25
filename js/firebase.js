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
    storageRef.child(productId).getDownloadURL().then(function (url) {
      var test = url;
      alert(url);
      document.querySelector('#imgPro').src = test;

    }).catch(function (error) {
      console.log("Error getting document:", error)
    });
  }


  function fetchProduct() {
    console.log("called");
    var productId = sessionStorage.getItem("productId");
    console.log(productId);
    var docRef = db.collection("products").doc(productId);
    docRef.get().then(function (doc) {
       if (doc.exists) {
        console.log("Product data:", doc.data());
        var storageRef = firebase.storage().ref();
        storageRef.child(productId).getDownloadURL().then(function (url) {
          var test = url;
          document.querySelector('#proImg').src = test;
        })
        var display = '<section id="content"><div class="container"><div class="row"><div class="span8"><article><div class="top-wrapper"><div class="post-heading"><h3><a href="#">' + doc.data().name + '</a></h3></div><div class="flexslider"><ul class="slides"><li class="flex-active-slide" data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"><img id="proImg" src="" alt="" draggable="false"></li><li data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"><img id="proImg" src="" alt="" draggable="false"></li><li data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"><img id="proImg" src="" alt="" draggable="false"></li></ul><ol class="flex-control-nav flex-control-paging"><li><a href="#" class="flex-active">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li></ol><ul class="flex-direction-nav"><li class="flex-nav-prev"><a class="flex-prev" href="#">Previous</a></li><li class="flex-nav-next"><a class="flex-next" href="#">Next</a></li></ul></div></div><p>' + doc.data().description + '</p></article></div><div class="span4"><aside class="right-sidebar"><div class="widget"><h5 class="widgetheading">Project information</h5><ul class="folio-detail"><li><label>Category :</label> ' + doc.data().category + '</li><li><label>Brand :</label> ' + doc.data().brand + '</li><li><label>Price :</label> ' + doc.data().price + '</li><li><label>Items left :</label>' + doc.data().quantity + '</li></ul></div><div class="widget"><h5 class="widgetheading">Text widget</h5><p>' + doc.data().specification + '</p></div></aside></div></div></div></section>';
        document.getElementById('productDetails').innerHTML = display;

      } else {
        console.log("No such product!");
      }
    }).catch(function (error) {
      console.log("Error getting product:", error);
    });
  }


  function fetchProducts(key) {
    var productList ;
    var count = 0;
    var show=key;
    console.log(show);
    var fetch;
    if(key=="all"){
      fetch = db.collection("products").get();
    }
    else if(key=="motherboard"){
      fetch = db.collection("products").where("category", "==", "MOTHERBOARD").get();
    }
    else if(key=="adapters"){
      fetch = db.collection("products").where("category", "==", "Adapters").get();
    }
    else if(key=="laptop"){
      fetch = db.collection("products").where("category", "==", "Laptop").get();
    }
    else if(key=="cpu"){
      fetch = db.collection("products").where("category", "==", "CPU").get();
    }
    fetch.then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc);
        var imgId = doc.id;
        var imgLink ;
        console.log(doc.id);
        var storageRef = firebase.storage().ref();
        storageRef.child(doc.id).getDownloadURL().then(function (url) {
            console.log(url);
           // imgLink = url;
           var Test = doc.id;
           productList = '<li onclick="productDetail('+imgId+')" class="item-thumbs span3 design col-md-4 col-xs-6" data-id="id-0" data-type="'+doc.data().category+'"><a class="hover-wrap" data-fancybox-group="gallery" title="' + doc.data().name + '"><span class="overlay-img"></span><span class="overlay-img-thumb font-icon-plus"></span></a><img id="' + imgId + '" alt="' + doc.data().description + '"><div class="product-body"><h6 class="product-category">Category: '+doc.data().category+'</h6><h6 class="product-name">Name: '+doc.data().name+'</h6><h6 class="product-price">Price: ₹'+doc.data().price+'</h6></div></li>';
           console.log(doc.id, " => ", doc.data()); 
           $('#thumbs').load(document.URL + '#thumbs');
           document.getElementById('thumbs').innerHTML += productList;
           document.querySelector("#" + imgId).src = url;  
          });
        count++
      
      });
      
    }).catch(function (error) {
        console.log("Error getting Products:", error);
       });
}


function productDetail(product){
  console.log(product.id);
  sessionStorage.setItem("productId", product.id);
  location.href = "portfolio-detail.html";
}

function sorter(){
  sessionStorage.setItem("sorting", product.id);
}

 document.getElementById("imageId").addEventListener("click", function storeInSession(event){
 console.log(this);   
});

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
        specification: $('#productSpecification').val(),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        uploadImage(docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  };