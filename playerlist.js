var app = angular.module("myApp",[]);
app.controller("myCtrl",function($scope){
    $scope.playerlist = [
        {sno:"1",name:"Lionel Messi",nationality:"Argentina",club:"Paris-saint-germain",img:"french-ligue1/paris-saint-germain.png"},
        {sno:"2",name:"Neymar",nationality:"Brazil",club:"Paris-saint-germain",img:"french-ligue1/paris-saint-germain.png"},
        {sno:"3",name:"Marcus Rashford",nationality:"England",club:"Manchester-United",img:"premier-league/manchester-united.png"},
        {sno:"4",name:"Kevin De Bruyne",nationality:"Belguim",club:"Manchester City",img:"premier-league/manchester-city.png"},
        {sno:"5",name:"Robert Lewandowski",nationality:"Poland",club:"Barcelona FC",img:"la-liga/barcelona.png"}
    ];
});