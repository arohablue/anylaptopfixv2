
//   1) Image Link - "img/products/predator.jpg"
//   2) Image Name - Lorem ipsum dolor sit amet
//   3) Product Id - For Product Detail Page
//   4) Product Desc - For Product Detail Page

    var array = Array();
    array  = ["img/products/Dell.jpg", "img/products/mac-screen.jpg", "img/products/mac-screen.jpg", "img/products/mac-screen.jpg"]
    // var product = document.getElementById('addProduct').value;
    // array.push(product);

    var e = [];

    for (var y=0; y<array.length; y++)
   {
     e += '<li class="item-thumbs span3 design" data-id="id-0" data-type="web"><a class="hover-wrap fancybox" data-fancybox-group="gallery" title="Portfolio name" href="' + array[y] + '"><span class="overlay-img"></span><span class="overlay-img-thumb font-icon-plus"></span></a><img src="' + array[y] + '" alt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis elementum odio. Curabitur pellentesque, dolor vel pharetra mollis."></li>';
   }

   document.getElementById('productAppender').innerHTML = e;
