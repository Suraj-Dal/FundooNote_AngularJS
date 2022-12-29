var app = angular.module("FundooNoteApp", ['ngRoute', 'ngStorage']);

app.config(["$routeProvider", function ($routeProvider) {


    $routeProvider.
        when("/Signin", {
            templateUrl: "Component/Signin/Signin.html"
        }).
        when("/Signup", {
            templateUrl: "Component/Signup/Signup.html"
        }).
        // when("/Dashboard",{
        //     templateUrl:"Components/DashBoard/Dashboard.html"
        // }).
        otherwise({
            redirectTo: "/Signin"
        });
}]);
app.controller("fundooappCtrl", function ($scope, $http, $window, $location, $localStorage) {
    //-----Takenote one and two
    var note = this;
    note.toggle = false;
    $scope.showButtons = [0];
    $scope.toggle1 = function () {
        $scope.showButtons = [1];
    };

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
            description: note,
            userId: ''
        }
        //call post service to add note
        $http.post("https://localhost:44347/api/Notes/Create", JSON.stringify(data), headersConfig)
            .then(function (response) {
                console.log(response);

                if (response.data) {
                    $scope.msg = "Post Data Submitted";

                    $scope.title = response.data.title;
                    $scope.note = response.data.description;
                }
            }, function (error) {
                console.log(error)
            })
    };

    //    // Singnin
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
                }
            }, function (error) {
                console.log(error)
            })
    };

    // Signup 
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
        else
        {
            alert("Password does not match.")
        }
    };
})