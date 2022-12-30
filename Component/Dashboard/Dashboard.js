var app= angular.module("FundooApp",[]);


app.controller("fundooappCtrl",function($scope,$http){
    //-----Takenote one and two
    var note=this;
    note.toggle=false;
    $scope.showButtons = [0];
    $scope.toggle1 = function() {
      $scope.showButtons = [1];
  };

  $scope.postNote=function(title,note){
      var data={
        title: title,
        note: note,
      }
      //call the service
      $http.post("https://localhost:44340/api/Note/AllNotes",JSON.stringify(data))
      .then(function(response){
          console.log(response);
  
          if(response.data){
              $scope.msg="Post Data Submitted";
            
              $scope.title=response.data.title;
              $scope.note=response.data.note;
          }
      },function(error){
          console.log(error)
      })
  };
})