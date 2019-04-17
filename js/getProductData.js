
//   1) Image Link - "img/products/predator.jpg"
//   2) Image Name - Lorem ipsum dolor sit amet
//   3) Product Id - For Product Detail Page
//   4) Product Desc - For Product Detail Page

    var array = Array();
    array  = [{image : "img/products/Dell.jpg", id : "0"}, {image : "img/products/mac-screen.jpg", id : "1"}, {image : "img/products/mac-screen.jpg", id : "2"}, {image: "img/products/mac-screen.jpg", id : "3"}]
    // var product = document.getElementById('addProduct').value;
    // array.push(product);

    var productList = [];

    for (var y=0; y<array.length; y++)
   {
    productList += '<li class="item-thumbs span3 design" data-id="id-0" data-type="web"><a class="hover-wrap fancybox" data-fancybox-group="gallery" title="Portfolio name" onclick="productDetail(' + array[y].id + ')"><span class="overlay-img"></span><span class="overlay-img-thumb font-icon-plus"></span></a><img src="' + array[y].image + '" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis."></li>';
   }

   document.getElementById('productAppender').innerHTML = productList;


   //var product = {} json object
   // how to create objects in java script... implement the code by saving this in array object hard code it first 
   // onclick = functionName(array[Y].productId)
   function productDetail(productId){
    console.log(productId+"tejas chutiya")
    var product = Array();
    sessionStorage.setItem("id", productId);
    location.href="portfolio-detail.html";
   } 
    function displayProductDetail(){
        prodId = sessionStorage.getItem("id");
        product = [
            {description : "This is Dell" ,
         specification : "intel core i5" , pic : "img/products/Dell.jpg" },
     
            {description : "This is mac book" ,
            specification : "Old processor" , pic : "img/products/mac-screen.jpg"},
     
            {description : "This is Macbook Air" ,
            specification : " fully working" , pic : "img/products/mac-screen.jpg"},
     
            {description : "this is macintosh pc" ,
            specification : "vintage model" , pic : "img/products/mac-screen.jpg"}
        ]
     
        var display = '<section id="content"><div class="container"><div class="row"><div class="span8"><article><div class="top-wrapper"><div class="post-heading"><h3><a href="#">This is an example of portfolio detail</a></h3></div><div class="flexslider"><ul class="slides"><li class="flex-active-slide" data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"><img src="'+ product[prodId].pic +'" alt="" draggable="false"></li><li class="flex-active-slide" data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"><img src="'+ product[prodId].pic +'" alt="" draggable="false"></li><li class="flex-active-slide" data-thumb-alt="" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"><img src="'+ product[prodId].pic +'" alt="" draggable="false"></li></ul></div></div><p>'+ product[prodId].description +'</p></article></div><div class="span4"><aside class="right-sidebar"><div class="widget"><h5 class="widgetheading">Project information</h5><ul class="folio-detail"><li><label>Category :</label> Web design</li><li><label>Client :</label> ASU Company</li><li><label>Project date :</label> 26 March, 2013</li><li><label>Project URL :</label><a href="#">www.projectsiteurl.com</a></li></ul></div><div class="widget"><h5 class="widgetheading">Text widget</h5><p>'+ product[prodId].specification +'</p></div></aside></div></div></div></section>';
        document.getElementById('productDetails').innerHTML = display;
    }
 
    
 
 


