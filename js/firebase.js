var config = {
  apiKey: "AIzaSyAIC3dXjQqbZtqUWdu3NjYqW6oGlje2r9U",
  authDomain: "anylaptopfix-3ca9a.firebaseapp.com",
  databaseURL: "https://anylaptopfix-3ca9a.firebaseio.com",
  projectId: "anylaptopfix-3ca9a",
  storageBucket: "anylaptopfix-3ca9a.appspot.com",
  messagingSenderId: "978382312662"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  var db = firebase.firestore();
}
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

  function getImage(doc){
    var storageRef = firebase.storage().ref();
    storageRef.child(doc.id).getDownloadURL().then(function (url) {
    //document.querySelector("#" + imgId).src = url;  
    var URL = 'background-image: url('+url+');';
    productList = '<li onclick="productDetail('+doc.id+')" class="item-thumbs span3 design " data-id="id-0" data-type="'+doc.data().category+'"><div><article class="card-wrapper" ><div class="image-holder" style="width: 100%; height: 60%; float:center;"><a href="#" class="image-holder__link" ></a><div id="' + doc.id + '" class="image-liquid image-holder--original"  ></div></div><div class="product-description"><!-- title --><h1 class="product-description__title"><a href="#">'+doc.data().name+'</a></h1><div class=" product-description__category secondary-text">'+doc.data().category+'</div><div class="product-description__price">₹'+doc.data().price+'</div><!-- divider --><hr /><div>'+doc.data().specification+'</div></article></div></div></li>';
    document.getElementById('thumbs').innerHTML += productList;
    document.querySelector("#" + doc.id).setAttribute("style",URL );
    });
  }


  function fetchProduct() {
    var productId = sessionStorage.getItem("productId");
    var docRef = db.collection("products").doc(productId);
    docRef.get().then(function (doc) {
       if (doc.exists) {
        var storageRef = firebase.storage().ref();
        storageRef.child(productId).getDownloadURL().then(function (url) {
          var test = url;
          document.querySelector('#proImg').src = test;
        })
        var display = '<section id="content"><div class="container"><div class="row"><div class="span8"><article><div class="top-wrapper"><div class="post-heading"><h3><a href="#">' + doc.data().name + '</a></h3></div><div class="flexslider"><ul class="slides"><li class="flex-active-slide" data-thumb-alt="" style="width: 60%; float: center; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"><img id="proImg" src="" alt="" draggable="false" ></li><li data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"><img id="proImg" src="" alt="" draggable="false"></li><li data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"><img id="proImg" src="" alt="" draggable="false"></li></ul><ol class="flex-control-nav flex-control-paging"><li><a href="#" class="flex-active">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li></ol><ul class="flex-direction-nav"><li class="flex-nav-prev"><a class="flex-prev" href="#">Previous</a></li><li class="flex-nav-next"><a class="flex-next" href="#">Next</a></li></ul></div></div><p>' + doc.data().description + '</p></article></div><div class="span4"><aside class="right-sidebar"><div class="widget"><h5 class="widgetheading">Product information</h5><ul class="folio-detail"><li><label>Category :</label> ' + doc.data().category + '</li><li><label>Brand :</label> ' + doc.data().brand + '</li><li><label>Price :</label> ' + doc.data().price + '</li><li><label>Items left :</label>' + doc.data().quantity + '</li></ul></div><div class="widget"><h5 class="widgetheading">Product Specifications</h5><p>' + doc.data().specification + '</p></div></aside> <div id = "productDetails"></div><div class="span3"></div></div></div></div></section>';
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
    var fetch;
    switch(key) {
      case "all": fetch = db.collection("products").get();
            break;
      case "motherboard": fetch = db.collection("products").where("category", "==", "Motherboard").get();
            break;
      case "adapters": fetch =  fetch = db.collection("products").where("category", "==", "Adapters").get();
            break;
      case "laptop": fetch = db.collection("products").where("category", "==", "Laptop").get();
            break;
      case "cpu": fetch = db.collection("products").where("category", "==", "CPU").get();
            break;
          }
       $('#thumbs').html("");
       $('#projects').append('<ul id="thumbs" class="portfolio"></ul>');
      fetch.then(function (querySnapshot) {
        fetchMyProducts(querySnapshot);
        });
}

function fetchMyProducts(querySnapshot) {
  querySnapshot.forEach(function (doc) {
    var url = getImage(doc);
  });
}


function productDetail(product){
  sessionStorage.setItem("productId", product.id);
  location.href = "product-detail.html";
}

function sorter(){
  sessionStorage.setItem("sorting", product.id);
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
        specification: $('#productSpecification').val(),
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        uploadImage(docRef.id)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }
