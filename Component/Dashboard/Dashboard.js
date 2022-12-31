// var app= angular.module("FundooNoteApp",[]);
app.controller("dashboardCtrl", function ($scope,$http,$localStorage,$location, $window) {
    //-----Takenote one and two
    var note = this;
    var noteToTrash = 0;
    $scope.titleName = ["Notes"]
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
})