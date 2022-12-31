var app = angular.module("FundooNoteApp", ['ngRoute', 'ngStorage']);

// -----------------------Routing----------------------

app.config(["$routeProvider", function($routeProvider) {
    $routeProvider.
        when("/Signin", {
            templateUrl: "Component/Signin/Signin.html",
            controller: "signinCtrl"
        }).
        when("/Signup", {
            templateUrl: "Component/Signup/Signup.html",
        }).
        when("/Dashboard", {
            templateUrl: "Component/Dashboard/Dashboard.html",
            controller: "dashboardCtrl"
        }).
        otherwise({
            redirectTo: "/Signin"
        });
}]);
