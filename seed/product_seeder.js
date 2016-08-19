var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping_database');
var products = [
  new Product({
    imagePath:"http://images4.fanpop.com/image/photos/19800000/Supernatural-Logo-winchesters-journal-19842155-448-250.png",
    title:'Supernatural',
    description:'This haunting series follows the thrilling yet terrifying journeys of Sam and Dean Winchester, two brothers who face an increasingly sinister landscape as they hunt monsters. After losing their mother to a supernatural force, the brothers were raised by their father as soldiers who track mysterious and demonic creatures. Violent memories and relationship-threatening secrets add additional burdens on Sam and Dean as they investigate all things that go bump in the night. As old tricks and tools are rendered useless and friends betray them, the brothers must rely on each other as they encounter new enemies.',
    price:1300
  }),
  new Product({
    imagePath:"http://cdn-static.denofgeek.com/sites/denofgeek/files/styles/article_main_wide_image/public/1/30//mr_robot_cropped.jpg?itok=wCuFW4ur",
    title:'Mr. Robot',
    description:'Young, anti-social computer programmer Elliot works as a cybersecurity engineer during the day, but at night he is a vigilante hacker. He is recruited by the mysterious leader of an underground group of hackers to join their organization. Elliot\'s task? Help bring down corporate America, including the company he is paid to protect, which presents him with a moral dilemma. Although he works for a corporation, his personal beliefs make it hard to resist the urge to take down the heads of multinational companies that he believes are running -- and ruining -- the world.',
    price:1300
  }),
  new Product({
    imagePath:"http://i.newsarama.com/images/i/000/163/336/i02/Vikings1_Cover_A_ShanePierce.jpg?1453485220",
    title:'Vikings',
    description:'Viking Ragnar Lothbrok is a young farmer and family man who is frustrated by the policies of Earl Haraldson, his local chieftain who sends his Viking raiders east to the Baltic states and Russia, whose residents are as poor as the Norsemen. Ragnar wants to head west, across the ocean, to discover new civilizations. With assistance from his friend Floki, Ragnar builds a faster, sleeker fleet of boats to help him make it to the Western world. Through the years Ragnar, who claims to be a direct descendant of the god Odin, continues to struggle with Earl until the two face each other in a final battle for supremacy. Following that, Ragnar goes on a search for new lands to conquer.',
    price:1300
  }),
  new Product({
    imagePath:"http://new.comicraft.com/wp-content/uploads/2015/05/daredevil00.jpg",
    title:'Daredevil',
    description:'The first in a planned series of shows detailing the Marvel universe, "Daredevil" follows Matt Murdock, attorney by day and vigilante by night. Blinded in an accident as a child, Murdock uses his heightened senses as Daredevil to fight crime on the streets of New York after the sun goes down. While Murdock\'s day job requires him to believe in the criminal justice system, his alter ego does not follow suit, leading him to take the law into his own hands to protect his Hell\'s Kitchen neighborhood and the surrounding communities.',
    price:1300
  }),
  new Product({
    imagePath:"http://overmental.com/wp-content/uploads/2015/06/sense8-logo.jpg",
    title:'Sense8',
    description:'Eight strangers around the globe find themselves connected -- first by a violent vision, then by their shared ability to connect with one another\'s thoughts and actions, and finally by the urgent need to find out what happened and why. Their need to know goes beyond simple curiosity -- as they pursue answers, a mysterious organization hunts them down, intent on destroying them. The intense thriller is the first foray into television (or, more accurately, Netflix) for renowned filmmakers Lana Wachowski and Andy Wachowski ("The Matrix Reloaded"), who created the series with J. Michael Straczynski ("Thor"). The international cast includes veteran actors known to U.S. audiences, like Daryl Hannah ("Kill Bill") and Naveen Andrews ("Lost"), and others well-known in their home countries, like German actor Max Riemelt and Doona Bae of South Korea. In keeping with the global premise of the series, shooting takes place all over the world, including London, Reykjavik, Nairobi and Mumbai.',
    price:1300
  }),
  new Product({
    imagePath:"https://tctechcrunch2011.files.wordpress.com/2016/08/stranger-things.jpg ",
    title:'Stranger Things',
    description:'This thrilling Netflix-original drama stars award-winning actress Winona Ryder as Joyce Byers, who lives in a small Indiana town in 1983 -- inspired by a time when tales of science fiction captivated audiences. When Joyce\'s 12-year-old son, Will, goes missing, she launches a terrifying investigation into his disappearance with local authorities. As they search for answers, they unravel a series of extraordinary mysteries involving secret government experiments, unnerving supernatural forces, and a very unusual little girl.',
        price:1300
  })
];
var done =0;
for (var i=0;i<products.length;i++)
{
  products[i].save(function(err,result){
    done++;
    if(done === products.length){
        mongoose.disconnect();
    }
  });
}
