console.log("Sanity Check: JS is working!");

$(document).ready(function(){
   //initialize all modals           
   $('.modal').modal();
   $('select').material_select();

  $.ajax({
    method: 'GET',
    url: '/api/shops',
    success: renderAllShops
  });






  $('#shop-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/shops', formData, function(shop) {
      console.log('shop after POST', shop);
      renderShop(shop);  //render the server's response
    });
    $(this).trigger("reset");
  });

  // catch and handle the click on an add song button
   	$('#modal1').on('click', '#submit', handleAddShopClick);
	$('#submit').on('click', handleNewShopSubmit);
	$('#shops').on('click','.delete-shop', handleDeleteShopClick);




});



function renderAllShops (shops) {
	
	shops.forEach(function (shop) {
		console.log(shops)
		renderShop(shop);
	});
}










// render shop function
function renderShop (shop) {
	console.log('Rending these damn pet shops', shop)

var shopsHTML = (`
	 	  <div class="card card-shop" data-shop-id = "${shop._id}">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${shop.image}">
            </div>
            <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${shop.shopName}<i class="material-icons right">${shop.careTakerType}</i></span>
              <p><a href="#">${shop.website}</a></p>

            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">${shop.address}<i class="material-icons right">${shop.phoneNumber}</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
              <div class='card-footer hidden' >
              <button class='btn btn-info edit-shop'>Edit Shop</button>
              <button class='btn btn-danger delete-shop'>Delete</button>
            </div>
          </div>`);
$('#shops').prepend(shopsHTML)
 		
};












function handleAddShopClick(e) {
  console.log('add-shop clicked!');
  var currentShopId = $(this).closest('.card-shop').data('shop-id'); // "5665ff1678209c64e51b4e7b"
  console.log('id',currentShopId);
  $('#modal1').data('shop-id', currentShopId);
  $('#modal1').modal();  // display the modal!
}




function handleDeleteShopClick(e) {
  console.log('store deleted!');
  var shop = $(this).closest('.card-shop');
  console.log(shop);
  var shopId = shop.data('shop-id')
  console.log('id', shopId);
  $.ajax ({
    method: 'DELETE',
    url: '/api/shops/' + shopId,
    success: function() {
      shop.remove()
    }

  })
}
















// when the song modal submit button is clicked:
function handleNewShopSubmit(e) {
  e.preventDefault();
  var $modal = $('#modal1');
  var $NameField = $modal.find('#name');
  var $Address = $modal.find('#textarea1');
  var $telephone = $modal.find('#tel');
  var $website = $modal.find('#url');
  // get data from modal fields
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var dataToPost = {
    name: $NameField.val(),
    address: $Address.val(),
    phoneNumber: $telephone.val(), 
    website: $website.val(),
  };
  

  
  // POST to SERVER
  var shopPostToServerUrl = '/api/shops/' ;
  $.post(shopPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /shops:', data);
   
    // clear form
	$NameField.val('');
    $Address.val('');
    $telephone.val('');
    $website.val('');
    // close modal

    // update the correct shop to show the new song
    // re-render it with the new shop data (including songs)
  	renderShop(data);
  }).fail(function(err) {
    console.log('post to /api/shops/:shopId/shops resulted in error', err);
  });
}