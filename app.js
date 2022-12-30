var app = angular.module("FundooNoteApp", ['ngRoute', 'ngStorage']);

// -----------------------Routing----------------------

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
        when("/Signin", {
            templateUrl: "Component/Signin/Signin.html",
        }).
        when("/Signup", {
            templateUrl: "Component/Signup/Signup.html",
        }).
        when("/Dashboard", {
            templateUrl: "Component/Dashboard/Dashboard.html",
        }).
        otherwise({
            redirectTo: "/Signin"
        });
}]);

// -------------------------Functions/API Calling--------------------------------

app.controller("fundooappCtrl", function ($scope, $http, $window, $location, $localStorage) {
    var note = this;
    var noteToTrash = 0
    note.toggle = false;
    $scope.showButtons = [0];
    $scope.toggle1 = function () {
        $scope.showButtons = [1];
    };
    // -----------------------Add Note-------------------------------------------------
    $scope.postNote = function (title, note) {
        var token = $window.localStorage.getItem("token");
        console.log(token);
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        var data = {
            title: title,
            description: note
        }
        $http.post("https://localhost:44347/api/Notes/Create", JSON.stringify(data), headersConfig)
            .then(function (response) {
                console.log(response);

                if (response.data) {
                    $scope.msg = "Post Data Submitted";
                    $scope.showButtons = [0];
                    $scope.title = response.data.title;
                    $scope.note = response.data.description;
                    window.location.reload();
                }
            }, function (error) {
                console.log(error)
            })
    };

    // ---------------------------------Signin-------------------------------------------
    $scope.login = function (email, password) {
        var data = {
            email: email,
            password: password
        }
        $http.post("https://localhost:44347/api/User/Login", JSON.stringify(data))
            .then(function (response) {
                console.log(response);

                if (response.data) {
                    $window.localStorage.setItem('token', response.data.data);
                    console.log($localStorage.message);
                    $location.path('/Dashboard');
                    $scope.email = response.data.email;
                    $scope.password = response.data.password;
                    alert("Logged in successfuly.")
                }
                else
                {
                    alert("Invalid Credentials.")
                }
            }, function (error) {
                console.log(error)
            })
    };
// -------------------------------getAllNotes--------------------------------------
    $scope.getAllNotes = function () {
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.get("https://localhost:44347/api/Notes/Get", headersConfig)
            .then(function (response) {
                console.log(response);
                $scope.myNotes = response.data.data
            }, function (error) {
                console.log(error);
            })
    };
    // --------------------------------------Signup-----------------------------------------
    $scope.postdata = function (firstName, lastName, email, password, confirmPassword) {
        if (password == confirmPassword) {
            var data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            $http.post("https://localhost:44347/api/User/Register", JSON.stringify(data))
                .then(function (response) {
                    console.log(response);
                    if (response.data) {
                        $scope.msg = "Post Data Submitted";
                        $scope.firstName = response.data.firstName;
                        $scope.lastName = response.data.lastName;
                        $scope.email = response.data.email;
                        $scope.password = response.data.password;
                    }
                }, function (error) {
                    console.log(error)
                })
        }
        else {
            alert("Password does not match.")
        }
    };
    // ---------------------------Popper-----------------------------------
    $scope.pop = [0]
    $scope.popper = function (noteID) {
        noteToTrash = noteID
        if ($scope.pop.includes(0))
        {
            $scope.pop = [1];
        }
        else{
            $scope.pop = [0]
        }
    };
    //-------------------------------Trash---------------------------------
    $scope.trashNote = function (){
        console.log(noteToTrash)
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.put(`https://localhost:44347/api/Notes/Trash?NoteID=${noteToTrash}`, null, headersConfig)
        .then(function (response){
            console.log(response)
        }, function (error){
            console.log(error)
        })
    }
    //---------------------------------Pin-----------------------
    $scope.pinNote = function (noteID){
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.put(`https://localhost:44347/api/Notes/Pin?NoteID=${noteID}`, null, headersConfig)
        .then(function (response){
            console.log(response)
        }, function (error){
            console.log(error)
        })
    }
    //----------------------------Archive---------------------------
    $scope.archiveNote = function (noteID){
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log(noteID)
        $http.put(`https://localhost:44347/api/Notes/Archive?NoteID=${noteID}`, null, headersConfig)
        .then(function (response){
            console.log(response)
        }, function (error){
            console.log(error)
        })
    }
})