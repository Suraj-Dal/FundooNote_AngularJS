app.controller("signinCtrl",function($scope,$http,$localStorage,$location, $window){
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
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.get("https://localhost:44347/api/User/getUser", headersConfig)
        .then(function (response){
            if (response.data) {
                $window.localStorage.setItem('user', response.data.data);
            }
        }, function (error){
            console.log(error)
        })
    };
})