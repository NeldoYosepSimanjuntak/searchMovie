function searchMovie(){
    $("#movie-list").html("");
    $.ajax({
        url : "http://omdbapi.com",
        dataType : "json",
        type : "get",
        data : {
            "apikey" : "5d25f36d",
            "s" : $("#search-input").val()
        },
        success : function(result){
            // console.log(result);
            if(result.Response === "True"){
                let menu = result.Search;
                $.each(menu, function(i, daftarMenu) {
                    $("#movie-list").append(`
                    
                        <div class="col-md-4 mt-3">
                            <div class="card">
                                <img src="${daftarMenu.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${daftarMenu.Title}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${daftarMenu.Year}</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id= ${daftarMenu.imdbID}>See Detail</a>
                                </div>
                            </div>
                        </div>
                   `)
                })
                $("#search-input").val("")
            } else{
                $("#movie-list").html(`
                
                    <div class="col">
                        <h3 class="text-center">
                        ${result.Error} </h3>
                    </div>
                `)
            }
        }
    })
}

$("#search-button").on("click", function() {
    searchMovie();
});

$("#search-input").on("keyup", function(e) {
    if(e.keyCode === 13){
        searchMovie()
    }
});

// event binding

$("#movie-list").on("click", ".see-detail", function(){
    // console.log($(this).data("id"));
    $.ajax({
        url : "http://omdbapi.com",
        type: "get",
        dataType: "json",
        data : {
            "apikey": "5d25f36d",
            "i" : $(this).data("id")
        },
        success: function(result){
            
            if(result.Response === "True"){
                $(".modal-body").html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${result.Poster}" class="img-fluid">
                        </div>

                        <div class= "col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item">Title: ${result.Title}</li>
                                <li class="list-group-item">Year: ${result.Year}</li>
                                <li class="list-group-item">Director: ${result.Director}</li>
                                <li class="list-group-item">Writer: ${result.Writer}</li>
                                <li class="list-group-item">Actors: ${result.Actors}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                `)
            }
        }
    })
})