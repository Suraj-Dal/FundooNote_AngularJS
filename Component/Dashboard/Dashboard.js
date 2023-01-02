// var app= angular.module("FundooNoteApp",[]);
app.controller("dashboardCtrl", function ($scope,$http,$localStorage,$location, $window) {
    //-----Takenote one and two
    var note = this;
    var noteToTrash = 0;
    $scope.titleName = ["Notes"];
    $scope.userView = [0];
    $scope.collabView = [0];
    $scope.collabNote = 0;
    $scope.collabData = [];
    note.toggle = false;
    $scope.colorArray = ["LightSalmon","Pink","PapayaWhip","Khaki","Lavender","Thistle","GreenYellow","Aquamarine","BlanchedAlmond","Gainsboro","AliceBlue"]
    $scope.showButtons = [0];
    $scope.toggle1 = function () {
        $scope.showButtons = [1];
    };

    let headersConfig = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }
    $scope.postNote = function (title, note) {
        var token = $window.localStorage.getItem("token");
        console.log(token);

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
            var nav = document.getElementById('notetnh');
            nav.style.backgroundColor = "pink";
    };

    $scope.getAllNotes = function () {
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.get("https://localhost:44347/api/Notes/Get", headersConfig)
            .then(function (response) {
                console.log(response);
                $scope.myNotes = response.data.data.filter((note) => {
                    if(note.archive == false && note.trash == false)
                    {
                        return note
                    }
                })
                $scope.filterNotes = response.data.data
            }, function (error) {
                console.log(error);
            })
            $scope.titleName = ["Notes"]

        $http.get("https://localhost:44347/api/Collabs/Get", headersConfig)
        .then(function (response){
            $scope.collabArray = response.data.data
            angular.forEach($scope.collabArray, function(id) {
                $http.get(`https://localhost:44347/api/Notes/getNoteByID?noteID=${id.noteID}`, headersConfig)
                .then(function (response) {
                    $scope.collabData.push(response.data.data[0])
                }, function (error)
                {
                    console.log(error)
                })
            });
        },function (error){
            console.log(error)
        })
    };
    $scope.setArchView = function () {
        $scope.myNotes = $scope.filterNotes.filter((note) => {
            if(note.archive == true && note.trash == false)
            {
                return note
            }
        })
        $scope.titleName = ["Archive"]
    }
    $scope.setTrashView = function () {
        $scope.myNotes = $scope.filterNotes.filter((note) => {
            if(note.archive == false && note.trash == true)
            {
                return note
            }
        })
        $scope.titleName = ["Trash"]
    }

    $scope.pop = [0]
    $scope.popper = function (noteID) {
        noteToTrash = noteID
        if ($scope.pop.includes(0)) {
            $scope.pop = [1];
        }
        else {
            $scope.pop = [0]
        }
    };

    $scope.colorPop = [0]
    $scope.colorPopup = function () {
        if ($scope.colorPop.includes(0)) {
            $scope.colorPop = [1];
        }
        else {
            $scope.colorPop = [0]
        }
    };

    $scope.changeColor = function (noteID, color){
        $http.put(`https://localhost:44347/api/Notes/Color?NoteID=${noteID}&color=${color}`, null, headersConfig)
            .then(function (response) {
                console.log(response)
            }, function (error) {
                console.log(error)
            })
            window.location.reload()
    }
    //-------------------------------Trash---------------------------------
    $scope.trashNote = function () {
        console.log(noteToTrash)
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.put(`https://localhost:44347/api/Notes/Trash?NoteID=${noteToTrash}`, null, headersConfig)
            .then(function (response) {
                console.log(response)
            }, function (error) {
                console.log(error)
            })
            window.location.reload();
    }

    $scope.pinNote = function (noteID) {
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.put(`https://localhost:44347/api/Notes/Pin?NoteID=${noteID}`, null, headersConfig)
            .then(function (response) {
                console.log(response)
            }, function (error) {
                console.log(error)
            })
            window.location.reload();
    }
    //----------------------------Archive---------------------------
    $scope.archiveNote = function (noteID) {
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        console.log(noteID)
        $http.put(`https://localhost:44347/api/Notes/Archive?NoteID=${noteID}`, null, headersConfig)
            .then(function (response) {
                console.log(response)
            }, function (error) {
                console.log(error)
            })
            window.location.reload();
    }
    $scope.userDetails = function (){
        console.log($scope.userView)
        let headersConfig = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
        $http.get("https://localhost:44347/api/User/getUser", headersConfig)
        .then(function (response){
            if (response.data) {
                $scope.User = response.data.data
            }
        }, function (error){
            console.log(error)
        })

        if ($scope.userView.includes(0)) {
            $scope.userView = [1];
        }
        else {
            $scope.userView = [0]
        }
    }
    $scope.createAccount = function (){
        $location.path('/Signup');
    }
    $scope.signout = function (){
        $location.path('/Signin');
        $window.localStorage.clear();
    }
    $scope.collabPopup = function (noteID){
        $scope.collabView = [1]
        $scope.collabNote = noteID
    }
    $scope.setCollab = function (collabEmail){
        var noteID = $scope.collabNote
        $http.post(`https://localhost:44347/api/Collabs/Create?NoteID=${noteID}&Email=${collabEmail}`, null, headersConfig)
        .then(function (response){
            console.log(response)
        }, function (error){
            console.log(error)
        })
        $scope.collabView = [0]
    }
    $scope.refreshWindow = function (){
        window.location.reload();
    }
})