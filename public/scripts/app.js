console.log("Sanity Check: JS is working!");

$(document).ready(function(){

    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: 'https://agile-inlet-98335.herokuapp.com/api/',
        success: function(responseData){
            
        }
        
    })

});
