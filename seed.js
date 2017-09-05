// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');


var duckList = [{
  name: "Princess Sadness",
  bff: "Aly",
  description: "While her pretty, pink crown and her on-trend wand say 'it-girl', her eternally down-turned gaze should make clear, there's more to this fancy, flock-popular girl than meets the eye. Princess Sadness, or P.S., as most call her, would give all her feathers to keep a friend from getting wet. She's got a knack for problem solving and with her endlessly giving spirit, she makes sure her girl, Aly is never left searching for solutions.",
  favQuote: "You've got a friend in me.",
  cohort: "WDI38",
  gender: "F"
},
{
  name: "Mortimer",
  bff: "Michelle",
  description: "Mortimer loves racquetball. He is rarely seen without his Champion brand cross-trainers and his plastic, protective sports-goggles. When he's not winding-up his backswing on the four-wall court, you can be sure he's not floating around the lazy-pond...Mortimer is an All-Star coach and he gets Team Michelle across the finish line every time!!",
  favQuote: "The ball is in your court, now go score!",
  cohort: "Many",
  gender: "M"
},
{
  name: "Gustav",
  bff: "Nathan",
  description: "Gustav's plumage is as dark as the night sky and his eyes are as crystal-blue as the sky but his mysterious and dreamy looks aren't all this dapper drake has going on...his soulful, crooning quack could calm a duckling lost at sea during a category 5 hurricane. Despite his ability to capture any chick's heart with the flick of a feather...Gustav doesn't spend much time playing the pond. His focus lies with Nathan...together, they leave no questions unanswered!",
  favQuote: "Mmmmmhmmmm, ::wink:: ",
  cohort: "Many",
  gender: "M"
},
{
  name: "Ori",
  bff: "Younji",
  description: "Ori has the courage of 10,000 ducks! Recently, after nearly a year of meticulous planning, she successfully escaped the church of Scientology to fulfill her lifelong dream of becoming a breakdancer. While her newfound career is proving to be less profitable than she had imagined, Ori has another passion to which she is happily dedicated...her friend, Younji! When Younji is feeling a bit lost and is having trouble finding the right moves, Ori is always there to ensure she's never left spinning on her head. Together, they can throw down at any battle!",
  favQuote: "Who runs the world? GIRLS!",
  cohort: "WDI38",
  gender: "F"
},
{
  name: "Po-Po",
  bff: "Shridar",
  description: "Don't let Po-Po's squatty, pot-bellied stature fool you...he's got hawk-like speed and the agility of a super hero ninja cat! After 14 years on the feather-force, he is a legendary authority known throughout ponds far and wide. Po-Po has the thickest of skin yet still this tough & dedicated defender of the law has a soft side...or maybe it is best described as a 'warm' side.  Just drop by any local quilting fair and you'll find Po-Po there, admiring the cozy, patterned blankets & even showing-off his own wing-woven work! In fact, he met his very best pal, Shridar at a quilting fair years ago! The two of them are inseparable & whenever Shridar feels like he is falling apart, Po-Po is always there to stitch him back together.",
  favQuote: "Don't drink & fly!",
  cohort: "WDI38",
  gender: "F"
}
];


// remove all records that match {} -- which means remove ALL records
db.Duck.remove({}, function itsDuckSeason(err, ducks){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log("It's duck season! All ducks removed.")
  }
    // create new records based on the array duckList

    db.Duck.create(duckList, function quackAttack(err, ducks){
      if (err) { return console.log('error: ', err); }
      console.log(`QUACK ATTACK!! Created ", ${ducks.length}  ducks.`);
      process.exit();
    });

});
