function index(req, res) {
  res.json({
    name: "Jonathan Mules",
    nickName: "Trunkes",
    githubUsername: "supertrunkes",
    githubProfileImage: "https://avatars3.githubusercontent.com/u/30474956?v=4&s=460",
    currentCity: "San Francisco",
    myCats: [
      {
        realName: "Templeton",
        nameCalled: "Black Cat",
        gender:"Male",
        color: "Black",
        traits:["Old","Adventurous","Drooly"],
      },
      {
        realName:"Pickwick",
        nameCalled:"Pinky",
        gender:"Male",
        color:"Grey",
        traits:["Rambunctious","Curious","Naive"],
      },
      {
        realName:"Dorrie",
        nameCalled:"Dorrie",
        gender:"Female",
        color:"Grey and White",
        traits:["Timid","Cautious","Snuggly"],
      },
    ],
    myIntrests: ["Movies", "Art", "Board Games","Tiki Bars"],


  })
}

module.exports={
  index: index,
}
