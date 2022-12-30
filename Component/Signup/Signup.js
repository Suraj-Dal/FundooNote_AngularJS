var app = angular.module("FundooNoteApp", []);
app.controller("signupCtrl", function ($scope, $http) {
    $scope.firstName = null;
    $scope.lastName = null;
    $scope.email = null;
    $scope.password = null;
    $scope.confirmPassword = null;

    $scope.postdata = function (firstName, lastName, email, password, confirmPassword) {
        if (password == confirmPassword) {
            var data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
            //call the service
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
    };
})