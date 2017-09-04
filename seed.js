// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

const profileList = [];
profileList.push({
  name: 'Ray Choi',
  userName: 'raybchoi',
  image: '/images/userimages/ray.png',
  title: 'Student',
  workPlace: 'General Assembly',
  quote: `Don't worry about what you can't control.`,
  aboutMe: `I am a former Technology Consultant who built internal products leveraging ERP systems, and for a brief period, was also an acting co-owner of a small business. I graduated with an MBA from the Kellogg School of Management and was most recently the Lead Global Product Manager of the Find-A-ProAdvisor Marketplace at Intuit.`,
  socialNetwork: ['https://www.linkedin.com/in/raybchoi/', 'https://github.com/raybchoi'],
  skills: ['JavaScript', 'CSS', 'HTML', 'Mongo', 'Mongoose'],
  markedForDeletion: true,
})
profileList.push({
  name: 'Eric Choi',
  userName: 'ericchoi35',
  image: '/images/userimages/ericchoi.jpg',
  title: 'Application Developer',
  workPlace: 'JPMorgan Chase & Co.',
  quote: `Live life to the fullest. Enjoy every moment.`,
  aboutMe: `I'm currently with JPMorgan Chase as an Application Developer for the Commercial Term Lending Division and I was previously on the Digital Media Technology Team as a UI Developer helping to create the new Chase Online website.

  Prior to JPMorgan Chase, I was a Web Development Teaching Assistant for Coding Dojo. Having gone through the curriculum myself, I was able to relate to the challenges the students faced and being able to help students gain knowledge and confidence in this field has been a very rewarding experience. Progressing my skills as a developer and sharing my knowledge with others is something I look forward to every day.`,
  socialNetwork: ['https://www.linkedin.com/in/ericchoi35/',''],
  skills: ['JavaScript', 'CSS', 'HTML', 'Mongo', 'Mongoose', 'Mocha', 'Java'],
  markedForDeletion: false,
})
profileList.push({
  name: 'Huan Ming Liao',
  userName: 'hml',
  image: '/images/userimages/huan.jpg',
  title: 'Wed Development Immersive',
  workPlace: 'General Assembly',
  quote: `My fingers do all the talking`,
  aboutMe: `I'm an graduate from UCSC where I studied Technology Management.  I have a passion for Web development and excited for the future`,
  socialNetwork: ['https://www.linkedin.com/in/huan-ming-liao-1a690897/',''],
  skills: ['JavaScript', 'CSS', 'GitHub', 'React', 'Node'],
  markedForDeletion: false,
})
profileList.push({
  name: 'Jevell Rollins',
  userName: 'jevell',
  image: '/images/userimages/jevell.jpg',
  title: 'Full Stack Developer Student',
  workPlace: 'General Assembly',
  quote: `Always striving.`,
  aboutMe: `I am result-driven, efficient, adaptable and enthusiastic person who likes to work on challenging projects. Good problem solving ability, and like to take initiative for a given task. I have passion for programming and like to solve challenges. I have strong personal and inter-communication skills.`,
  socialNetwork: ['https://www.linkedin.com/in/jevell/', 'https://github.com/jkwr'],
  skills: ['CSS', 'Materialize', 'HTML', 'Mongo', 'Mongoose'],
  markedForDeletion: false,
})
profileList.push({
  name: 'Connor Martinelli',
  userName: 'conmart',
  image: '/images/userimages/connor.jpg',
  title: 'Web Development Student',
  workPlace: 'General Assembly',
  quote: `When something is important enough, you do it even if the odds are not in your favor. - Elon Musk`,
  aboutMe: `Bay area native, UC Berkeley and Cal Band alumnus, I am now working with an amazingly passionate and driven team at NerdWallet.com to bring much-needed transparency into the world of personal finance, and help consumers find the best financial products for their unique needs.`,
  socialNetwork: ['https://www.linkedin.com/in/connormartinelli/', 'https://github.com/conmart'],
  skills: ['CSS', 'Materialize', 'Postman', 'Bootstrap', 'Mongoose'],
  markedForDeletion: false,
})
profileList.push({
  name: 'Carlynn Espinoza',
  userName: 'Carlynn',
  image: '/images/userimages/carlynn.jpg',
  title: 'WDI Design Student',
  workPlace: 'General Assembly',
  quote: `The sun makes everything better`,
  aboutMe: `Former Civil Engineer who found her true path with coding. As an engineer I always looked for ways to design new and exciting projects. Ultimately, I needed more ways to express my creative nature. The combination of creative and logical problem solving in the technology world was the outlet I had been seeking.`,
  socialNetwork: ['https://www.linkedin.com/in/carlynn-espinoza/',''],
  skills: ['JavaScript', 'CSS', 'jQuery', 'In-Design', 'Node'],
  markedForDeletion: false,
})
profileList.push({
  name: 'Tommy Thai',
  userName: 'tthai',
  image: '/images/userimages/tommy.jpg',
  title: 'Software Developer',
  workPlace: 'Freelancer',
  quote: `Coding is life`,
  aboutMe: `Self-motivated web developer with a strong understanding of web development, great communication skills, and the ability to thrive in a fast-paced environment, looking to work with a fun and creative team to transform good ideas into great products.`,
  socialNetwork: ['', 'https://github.com/tommythai'],
  skills: ['Ruby', 'SQL', 'Angular', 'Bootstrap', 'Mongoose'],
  markedForDeletion: false,
})
profileList.push({
  name: 'Anil Suryanarayana',
  userName: 'anilsurya',
  image: '/images/userimages/anil.jpg',
  title: 'Engineering lead',
  workPlace: 'Intuit',
  quote: `Testing is a way of life.`,
  aboutMe: `10+ years of experience with product development, program management and data analytics while working at Intuit, Yahoo and Wipro Technologies.`,
  socialNetwork: ['https://www.linkedin.com/in/anilsurya/', 'https://github.com/tommythai'],
  skills: ['TDD', 'SQL', 'React', 'Node', 'Mongoose'],
  markedForDeletion: false,
})
profileList.push({
  name: 'Ganesh Velu Rajendran',
  userName: 'ganz7',
  image: '/images/userimages/ganesh.jpg',
  title: 'Software Engineer 2',
  workPlace: 'Intuit',
  quote: `[ software === art ]`,
  aboutMe: `I love thinking through customer problems and making magic with my hands.`,
  socialNetwork: ['https://www.linkedin.com/in/ganeshkumarvr/',''],
  skills: ['JavaScript', 'Ruby', 'Rails', 'Node', 'React'],
  markedForDeletion: false,
})

db.Profile.remove({}, function(err, allExistingProfiles){

  db.Profile.create(profileList, function(err, profiles) {
    if (err) {
      return console.log('ERROR during seeding', err);
    }
    console.log("all profiles created:", profiles);
    console.log("created", profiles.length, "profiles");
    process.exit();
  });

});
