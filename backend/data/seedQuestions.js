const mongoose = require('mongoose');
const Question = require('../models/Question');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz-app';

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    correctAnswer: "Albert Einstein",
    category: "Science",
    difficulty: "Medium"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    category: "Literature",
    difficulty: "Easy"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
    category: "Geography",
    difficulty: "Medium"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    correctAnswer: "Au",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Who was the first President of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correctAnswer: "George Washington",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Which language is primarily spoken in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    correctAnswer: "Portuguese",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
    category: "Mathematics",
    difficulty: "Easy"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    category: "Art",
    difficulty: "Medium"
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: "100°C",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which country gifted the Statue of Liberty to the USA?",
    options: ["Germany", "France", "Italy", "Spain"],
    correctAnswer: "France",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: "Diamond",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Who is known as the Father of Computers?",
    options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    correctAnswer: "Charles Babbage",
    category: "Technology",
    difficulty: "Medium"
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    correctAnswer: "Africa",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    correctAnswer: "Avocado",
    category: "Food",
    difficulty: "Easy"
  },
  {
    question: "Who discovered penicillin?",
    options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"],
    correctAnswer: "Alexander Fleming",
    category: "Science",
    difficulty: "Medium"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    correctAnswer: "Jupiter",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which year did World War II end?",
    options: ["1945", "1944", "1943", "1946"],
    correctAnswer: "1945",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    correctAnswer: "Yen",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Who wrote 'Pride and Prejudice'?",
    options: ["Jane Austen", "Emily Brontë", "Charles Dickens", "George Eliot"],
    correctAnswer: "Jane Austen",
    category: "Literature",
    difficulty: "Medium"
  },
  {
    question: "What is the process by which plants make their food?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"],
    correctAnswer: "Photosynthesis",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    correctAnswer: "Japan",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
    correctAnswer: "Alexander Graham Bell",
    category: "Technology",
    difficulty: "Medium"
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
    category: "Mathematics",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "In which year did World War II end?",
    options: ["1945", "1939", "1941", "1948"],
    correctAnswer: "1945",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Who was the Egyptian queen famous for her relationship with Julius Caesar?",
    options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Ankhesenamun"],
    correctAnswer: "Cleopatra",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Which ancient civilization built the pyramids of Giza?",
    options: ["Egyptians", "Mayans", "Incas", "Mesopotamians"],
    correctAnswer: "Egyptians",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "What was the name of the ship that sank in 1912 after hitting an iceberg?",
    options: ["Titanic", "Lusitania", "Britannic", "Olympic"],
    correctAnswer: "Titanic",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Who was the leader of the Soviet Union during World War II?",
    options: ["Joseph Stalin", "Vladimir Lenin", "Leon Trotsky", "Nikita Khrushchev"],
    correctAnswer: "Joseph Stalin",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Which war was fought between the North and South of the United States?",
    options: ["Civil War", "Revolutionary War", "World War I", "Vietnam War"],
    correctAnswer: "Civil War",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Who was the first woman to win a Nobel Prize?",
    options: ["Marie Curie", "Mother Teresa", "Jane Addams", "Pearl S. Buck"],
    correctAnswer: "Marie Curie",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Which empire was ruled by Genghis Khan?",
    options: ["Mongol Empire", "Ottoman Empire", "Roman Empire", "Persian Empire"],
    correctAnswer: "Mongol Empire",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "What was the name of the first successful English colony in America?",
    options: ["Jamestown", "Plymouth", "Roanoke", "Massachusetts Bay"],
    correctAnswer: "Jamestown",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "Which French military leader was defeated at the Battle of Waterloo?",
    options: ["Napoleon Bonaparte", "Louis XIV", "Charles de Gaulle", "Joan of Arc"],
    correctAnswer: "Napoleon Bonaparte",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What was the primary language of the Roman Empire?",
    options: ["Latin", "Greek", "Italian", "Aramaic"],
    correctAnswer: "Latin",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which document declared the 13 American colonies independent from Britain?",
    options: ["Declaration of Independence", "Constitution", "Bill of Rights", "Magna Carta"],
    correctAnswer: "Declaration of Independence",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Who was the first Emperor of the Roman Empire?",
    options: ["Augustus", "Julius Caesar", "Nero", "Constantine"],
    correctAnswer: "Augustus",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which ancient city was destroyed by a volcanic eruption in 79 AD?",
    options: ["Pompeii", "Athens", "Carthage", "Troy"],
    correctAnswer: "Pompeii",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What was the name of the period of renewed interest in art and learning in Europe during the 14th to 17th centuries?",
    options: ["Renaissance", "Reformation", "Enlightenment", "Industrial Revolution"],
    correctAnswer: "Renaissance",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which explorer is credited with discovering the New World in 1492?",
    options: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "Marco Polo"],
    correctAnswer: "Christopher Columbus",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which queen ruled England for 44 years and is associated with the Elizabethan Era?",
    options: ["Elizabeth I", "Victoria", "Mary I", "Anne"],
    correctAnswer: "Elizabeth I",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What was the name of the wall built to divide East and West Berlin?",
    options: ["Berlin Wall", "Great Wall", "Iron Curtain", "Hadrian's Wall"],
    correctAnswer: "Berlin Wall",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Who was the civil rights leader who delivered the 'I Have a Dream' speech?",
    options: ["Martin Luther King Jr.", "Malcolm X", "Rosa Parks", "Frederick Douglass"],
    correctAnswer: "Martin Luther King Jr.",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which battle is considered the turning point of the American Revolutionary War?",
    options: ["Battle of Saratoga", "Battle of Yorktown", "Battle of Bunker Hill", "Battle of Lexington"],
    correctAnswer: "Battle of Saratoga",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What was the name of the project that developed the first atomic bomb?",
    options: ["Manhattan Project", "Apollo Project", "Enigma Project", "Trinity Project"],
    correctAnswer: "Manhattan Project",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which ancient Greek philosopher was a student of Socrates?",
    options: ["Plato", "Aristotle", "Epicurus", "Pythagoras"],
    correctAnswer: "Plato",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which country was the first to grant women the right to vote?",
    options: ["New Zealand", "United States", "United Kingdom", "France"],
    correctAnswer: "New Zealand",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What was the name of the treaty that ended World War I?",
    options: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Tordesillas", "Treaty of Ghent"],
    correctAnswer: "Treaty of Versailles",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "What is the primary source of energy for Earth's climate system?",
    options: ["Sun", "Moon", "Earth's core", "Wind"],
    correctAnswer: "Sun",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which organ in the human body is responsible for pumping blood?",
    options: ["Heart", "Lungs", "Liver", "Kidneys"],
    correctAnswer: "Heart",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the main source of energy for Earth's climate system?",
    options: ["Sun", "Geothermal", "Fossil Fuels", "Nuclear"],
    correctAnswer: "Sun",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which planet is closest to the Sun?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctAnswer: "Mercury",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the process by which plants make their food?",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"],
    correctAnswer: "Photosynthesis",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What gas do humans exhale when they breathe out?",
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Helium"],
    correctAnswer: "Carbon Dioxide",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which scientist is known for the laws of motion?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
    correctAnswer: "Isaac Newton",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the unit of electric current?",
    options: ["Ampere", "Volt", "Watt", "Ohm"],
    correctAnswer: "Ampere",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which part of the cell contains genetic material?",
    options: ["Nucleus", "Cytoplasm", "Mitochondria", "Cell Membrane"],
    correctAnswer: "Nucleus",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["100°C", "0°C", "50°C", "200°C"],
    correctAnswer: "100°C",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which type of rock is formed from cooled lava?",
    options: ["Igneous", "Sedimentary", "Metamorphic", "Fossil"],
    correctAnswer: "Igneous",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the name of the closest star to Earth?",
    options: ["Sun", "Proxima Centauri", "Sirius", "Betelgeuse"],
    correctAnswer: "Sun",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which gas is essential for human respiration?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
    correctAnswer: "Oxygen",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the primary function of red blood cells?",
    options: ["Carry oxygen", "Fight infection", "Clot blood", "Digest food"],
    correctAnswer: "Carry oxygen",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which scientist discovered the theory of evolution by natural selection?",
    options: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Francis Bacon"],
    correctAnswer: "Charles Darwin",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the hardest naturally occurring substance known?",
    options: ["Diamond", "Quartz", "Granite", "Iron"],
    correctAnswer: "Diamond",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Jupiter",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Ir", "In", "I"],
    correctAnswer: "Fe",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which force keeps planets in orbit around the Sun?",
    options: ["Gravity", "Magnetism", "Friction", "Electromagnetism"],
    correctAnswer: "Gravity",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the study of earthquakes called?",
    options: ["Seismology", "Geology", "Meteorology", "Volcanology"],
    correctAnswer: "Seismology",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which organ is responsible for filtering blood in the human body?",
    options: ["Kidneys", "Liver", "Spleen", "Pancreas"],
    correctAnswer: "Kidneys",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the speed of light in a vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: "300,000 km/s",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which type of energy is stored in a stretched rubber band?",
    options: ["Elastic Potential", "Kinetic", "Thermal", "Chemical"],
    correctAnswer: "Elastic Potential",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the primary gas found in a star?",
    options: ["Hydrogen", "Helium", "Oxygen", "Nitrogen"],
    correctAnswer: "Hydrogen",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which scientist discovered radioactivity?",
    options: ["Marie Curie", "Albert Einstein", "Ernest Rutherford", "Niels Bohr"],
    correctAnswer: "Marie Curie",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which continent is the largest by land area?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    correctAnswer: "Asia",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the capital city of Brazil?",
    options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
    correctAnswer: "Brasília",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which desert is the largest in the world?",
    options: ["Sahara", "Gobi", "Kalahari", "Antarctic"],
    correctAnswer: "Sahara",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which country has the most population?",
    options: ["China", "India", "United States", "Indonesia"],
    correctAnswer: "India",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the longest river in South America?",
    options: ["Amazon River", "Paraná River", "Orinoco River", "São Francisco River"],
    correctAnswer: "Amazon River",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which mountain range separates Europe from Asia?",
    options: ["Ural Mountains", "Alps", "Himalayas", "Andes"],
    correctAnswer: "Ural Mountains",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of South Africa?",
    options: ["Pretoria", "Cape Town", "Johannesburg", "Durban"],
    correctAnswer: "Pretoria",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which country is known as the 'Land of a Thousand Lakes'?",
    options: ["Finland", "Sweden", "Norway", "Canada"],
    correctAnswer: "Finland",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the largest island in the world?",
    options: ["Greenland", "Australia", "Borneo", "Madagascar"],
    correctAnswer: "Greenland",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which ocean lies between Africa and Australia?",
    options: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Southern Ocean"],
    correctAnswer: "Indian Ocean",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of Egypt?",
    options: ["Cairo", "Alexandria", "Giza", "Luxor"],
    correctAnswer: "Cairo",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which country is the smallest in South America?",
    options: ["Suriname", "Uruguay", "Guyana", "Paraguay"],
    correctAnswer: "Suriname",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the highest waterfall in the world?",
    options: ["Angel Falls", "Niagara Falls", "Victoria Falls", "Iguazu Falls"],
    correctAnswer: "Angel Falls",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which country is known for its fjords?",
    options: ["Norway", "Sweden", "Denmark", "Finland"],
    correctAnswer: "Norway",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of Russia?",
    options: ["Moscow", "Saint Petersburg", "Kazan", "Novosibirsk"],
    correctAnswer: "Moscow",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    options: ["Africa", "Asia", "Australia", "Antarctica"],
    correctAnswer: "Africa",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the largest lake in Africa?",
    options: ["Lake Victoria", "Lake Tanganyika", "Lake Malawi", "Lake Chad"],
    correctAnswer: "Lake Victoria",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which country is located on the Iberian Peninsula?",
    options: ["Spain", "France", "Italy", "Greece"],
    correctAnswer: "Spain",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of New Zealand?",
    options: ["Wellington", "Auckland", "Christchurch", "Hamilton"],
    correctAnswer: "Wellington",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which river flows through Paris?",
    options: ["Seine", "Thames", "Danube", "Rhine"],
    correctAnswer: "Seine",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the smallest continent by land area?",
    options: ["Australia", "Antarctica", "Europe", "South America"],
    correctAnswer: "Australia",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which country is known as the 'Land of Fire and Ice'?",
    options: ["Iceland", "Greenland", "Norway", "Sweden"],
    correctAnswer: "Iceland",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of Mexico?",
    options: ["Mexico City", "Guadalajara", "Monterrey", "Cancún"],
    correctAnswer: "Mexico City",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which mountain range is the longest in the world?",
    options: ["Andes", "Himalayas", "Rocky Mountains", "Alps"],
    correctAnswer: "Andes",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of Argentina?",
    options: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
    correctAnswer: "Buenos Aires",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Who directed the movie 'Titanic'?",
    options: ["James Cameron", "Steven Spielberg", "Christopher Nolan", "Quentin Tarantino"],
    correctAnswer: "James Cameron",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which band is known for the song 'Bohemian Rhapsody'?",
    options: ["Queen", "The Beatles", "Led Zeppelin", "Pink Floyd"],
    correctAnswer: "Queen",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Who played Harry Potter in the movie series?",
    options: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson", "Tom Felton"],
    correctAnswer: "Daniel Radcliffe",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the fictional school in the Harry Potter series?",
    options: ["Hogwarts", "Beauxbatons", "Durmstrang", "Ilvermorny"],
    correctAnswer: "Hogwarts",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which actor portrayed Iron Man in the Marvel Cinematic Universe?",
    options: ["Robert Downey Jr.", "Chris Hemsworth", "Chris Evans", "Mark Ruffalo"],
    correctAnswer: "Robert Downey Jr.",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Who wrote the 'Game of Thrones' book series?",
    options: ["George R.R. Martin", "J.K. Rowling", "J.R.R. Tolkien", "Stephen King"],
    correctAnswer: "George R.R. Martin",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which movie won the Best Picture Oscar in 2020?",
    options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"],
    correctAnswer: "Parasite",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the lion in Disney's 'The Lion King'?",
    options: ["Simba", "Mufasa", "Scar", "Nala"],
    correctAnswer: "Simba",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which singer is known as the 'Queen of Pop'?",
    options: ["Madonna", "Beyoncé", "Lady Gaga", "Taylor Swift"],
    correctAnswer: "Madonna",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Who directed 'The Dark Knight'?",
    options: ["Christopher Nolan", "Tim Burton", "Zack Snyder", "Joss Whedon"],
    correctAnswer: "Christopher Nolan",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which TV show features the character Walter White?",
    options: ["Breaking Bad", "The Sopranos", "Mad Men", "The Wire"],
    correctAnswer: "Breaking Bad",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the fictional continent in 'Game of Thrones'?",
    options: ["Westeros", "Essos", "Sothoryos", "Ulthos"],
    correctAnswer: "Westeros",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which animated movie features a character named Woody?",
    options: ["Toy Story", "Finding Nemo", "The Incredibles", "Shrek"],
    correctAnswer: "Toy Story",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Who is the lead singer of the band Coldplay?",
    options: ["Chris Martin", "Jonny Buckland", "Guy Berryman", "Will Champion"],
    correctAnswer: "Chris Martin",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which actress played Katniss Everdeen in 'The Hunger Games'?",
    options: ["Jennifer Lawrence", "Emma Stone", "Scarlett Johansson", "Natalie Portman"],
    correctAnswer: "Jennifer Lawrence",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the ship in the movie 'Pirates of the Caribbean'?",
    options: ["Black Pearl", "Flying Dutchman", "Queen Anne's Revenge", "Interceptor"],
    correctAnswer: "Black Pearl",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which movie is set in the fictional world of Pandora?",
    options: ["Avatar", "Star Wars", "The Matrix", "Jurassic Park"],
    correctAnswer: "Avatar",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Who played the Joker in 'The Dark Knight'?",
    options: ["Heath Ledger", "Joaquin Phoenix", "Jared Leto", "Jack Nicholson"],
    correctAnswer: "Heath Ledger",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which band is known for the album 'Abbey Road'?",
    options: ["The Beatles", "The Rolling Stones", "The Who", "The Doors"],
    correctAnswer: "The Beatles",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the main character in 'The Lord of the Rings'?",
    options: ["Frodo Baggins", "Aragorn", "Gandalf", "Legolas"],
    correctAnswer: "Frodo Baggins",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which TV show is set in the fictional town of Hawkins, Indiana?",
    options: ["Stranger Things", "The X-Files", "Twin Peaks", "Riverdale"],
    correctAnswer: "Stranger Things",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Who directed 'Jurassic Park'?",
    options: ["Steven Spielberg", "James Cameron", "Ridley Scott", "George Lucas"],
    correctAnswer: "Steven Spielberg",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which singer is known for the song 'Thriller'?",
    options: ["Michael Jackson", "Prince", "David Bowie", "Elton John"],
    correctAnswer: "Michael Jackson",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the robot in 'Star Wars' who speaks in beeps?",
    options: ["R2-D2", "C-3PO", "BB-8", "IG-88"],
    correctAnswer: "R2-D2",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which movie features the song 'Let It Go'?",
    options: ["Frozen", "Moana", "Tangled", "Coco"],
    correctAnswer: "Frozen",
    category: "Entertainment",
    difficulty: "Medium"
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["France", "Brazil", "Germany", "Argentina"],
    correctAnswer: "France",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Who is known as the 'King of Soccer'?",
    options: ["Pelé", "Lionel Messi", "Cristiano Ronaldo", "Diego Maradona"],
    correctAnswer: "Pelé",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "In which sport is the term 'hole-in-one' used?",
    options: ["Golf", "Tennis", "Basketball", "Hockey"],
    correctAnswer: "Golf",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which athlete is known as the 'Fastest Man Alive'?",
    options: ["Usain Bolt", "Carl Lewis", "Jesse Owens", "Michael Johnson"],
    correctAnswer: "Usain Bolt",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "What is the national sport of Japan?",
    options: ["Sumo Wrestling", "Baseball", "Judo", "Karate"],
    correctAnswer: "Sumo Wrestling",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which sport is played at Wimbledon?",
    options: ["Tennis", "Cricket", "Rugby", "Soccer"],
    correctAnswer: "Tennis",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Who holds the record for the most NBA championships as a player?",
    options: ["Bill Russell", "Michael Jordan", "LeBron James", "Kobe Bryant"],
    correctAnswer: "Bill Russell",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "In which sport would you perform a slam dunk?",
    options: ["Basketball", "Volleyball", "Tennis", "Soccer"],
    correctAnswer: "Basketball",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which country is known for inventing cricket?",
    options: ["England", "Australia", "India", "South Africa"],
    correctAnswer: "England",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Who won the Women's singles title at the 2020 US Open tennis tournament?",
    options: ["Naomi Osaka", "Serena Williams", "Simona Halep", "Victoria Azarenka"],
    correctAnswer: "Naomi Osaka",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "What is the maximum score in a single frame of ten-pin bowling?",
    options: ["300", "200", "150", "100"],
    correctAnswer: "300",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which sport uses a puck instead of a ball?",
    options: ["Ice Hockey", "Field Hockey", "Lacrosse", "Polo"],
    correctAnswer: "Ice Hockey",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Who is the only athlete to win four consecutive Olympic gold medals in the same event?",
    options: ["Michael Phelps", "Simone Biles", "Usain Bolt", "Carl Lewis"],
    correctAnswer: "Michael Phelps",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which sport is known as 'The Sweet Science'?",
    options: ["Boxing", "Wrestling", "Fencing", "Martial Arts"],
    correctAnswer: "Boxing",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the trophy awarded to the winner of the Super Bowl?",
    options: ["Vince Lombardi Trophy", "Stanley Cup", "Larry O'Brien Trophy", "Heisman Trophy"],
    correctAnswer: "Vince Lombardi Trophy",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which country hosted the 2020 Summer Olympics?",
    options: ["Japan", "Brazil", "China", "United Kingdom"],
    correctAnswer: "Japan",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "In which sport is the Ryder Cup contested?",
    options: ["Golf", "Tennis", "Soccer", "Rugby"],
    correctAnswer: "Golf",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Who is the all-time leading goal scorer in the FIFA World Cup?",
    options: ["Miroslav Klose", "Ronaldo", "Pelé", "Lionel Messi"],
    correctAnswer: "Miroslav Klose",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which sport is associated with the term 'home run'?",
    options: ["Baseball", "Cricket", "Softball", "Rugby"],
    correctAnswer: "Baseball",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Who won the Tour de France in 2020?",
    options: ["Tadej Pogačar", "Chris Froome", "Geraint Thomas", "Egan Bernal"],
    correctAnswer: "Tadej Pogačar",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which sport is played on a diamond-shaped field?",
    options: ["Baseball", "Soccer", "Rugby", "American Football"],
    correctAnswer: "Baseball",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "What is the name of the stadium where the New York Yankees play?",
    options: ["Yankee Stadium", "Fenway Park", "Wrigley Field", "Dodger Stadium"],
    correctAnswer: "Yankee Stadium",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which sport involves a shuttlecock?",
    options: ["Badminton", "Tennis", "Squash", "Table Tennis"],
    correctAnswer: "Badminton",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Who is considered the greatest female gymnast of all time?",
    options: ["Simone Biles", "Nadia Comăneci", "Larisa Latynina", "Svetlana Khorkina"],
    correctAnswer: "Simone Biles",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which sport is known for the 'Stanley Cup'?",
    options: ["Ice Hockey", "Basketball", "Baseball", "American Football"],
    correctAnswer: "Ice Hockey",
    category: "Sports",
    difficulty: "Medium"
  },
  {
    question: "Which instrument measures atmospheric pressure?",
    options: ["Barometer", "Thermometer", "Hygrometer", "Anemometer"],
    correctAnswer: "Barometer",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the largest bone in the human body?",
    options: ["Femur", "Tibia", "Humerus", "Fibula"],
    correctAnswer: "Femur",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Who invented the light bulb?",
    options: ["Thomas Edison", "Nikola Tesla", "James Watt", "Michael Faraday"],
    correctAnswer: "Thomas Edison",
    category: "Technology",
    difficulty: "Easy"
  },
  {
    question: "What is the main language spoken in Canada?",
    options: ["English", "French", "Both", "Spanish"],
    correctAnswer: "Both",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctAnswer: "Nile",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Who is the author of '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.D. Salinger"],
    correctAnswer: "George Orwell",
    category: "Literature",
    difficulty: "Medium"
  },
  {
    question: "What is the chemical symbol for sodium?",
    options: ["Na", "So", "S", "N"],
    correctAnswer: "Na",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which country is known as the 'Pearl of Africa'?",
    options: ["Uganda", "Kenya", "Tanzania", "Ethiopia"],
    correctAnswer: "Uganda",
    category: "Geography",
    difficulty: "Medium"
  },
  {
    question: "Who painted 'Starry Night'?",
    options: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Salvador Dalí"],
    correctAnswer: "Vincent van Gogh",
    category: "Art",
    difficulty: "Medium"
  },
  {
    question: "What is the capital of Italy?",
    options: ["Rome", "Venice", "Milan", "Florence"],
    correctAnswer: "Rome",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Which animal is known as the 'Ship of the Desert'?",
    options: ["Camel", "Horse", "Donkey", "Elephant"],
    correctAnswer: "Camel",
    category: "General Knowledge",
    difficulty: "Easy"
  },
  {
    question: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Who was the first man to step on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    correctAnswer: "Neil Armstrong",
    category: "History",
    difficulty: "Medium"
  },
  {
    question: "Which country is famous for the pyramids?",
    options: ["Egypt", "Greece", "Italy", "Mexico"],
    correctAnswer: "Egypt",
    category: "History",
    difficulty: "Easy"
  },
  {
    question: "What is the largest continent?",
    options: ["Asia", "Africa", "Europe", "North America"],
    correctAnswer: "Asia",
    category: "Geography",
    difficulty: "Easy"
  },
  {
    question: "Who is the author of 'The Hobbit'?",
    options: ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "George R.R. Martin"],
    correctAnswer: "J.R.R. Tolkien",
    category: "Literature",
    difficulty: "Medium"
  },
  {
    question: "What is the hardest rock?",
    options: ["Diamond", "Granite", "Marble", "Quartz"],
    correctAnswer: "Diamond",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "Which is the smallest continent?",
    options: ["Australia", "Europe", "Antarctica", "South America"],
    correctAnswer: "Australia",
    category: "Geography",
    difficulty: "Medium"
  },
  {
    question: "Who discovered gravity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
    correctAnswer: "Isaac Newton",
    category: "Science",
    difficulty: "Easy"
  },
  {
    question: "What is the capital of Canada?",
    options: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
    correctAnswer: "Ottawa",
    category: "Geography",
    difficulty: "Medium"
  }
];

console.log('Total questions:', sampleQuestions.length);

async function seed() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await Question.deleteMany({});
  await Question.insertMany(sampleQuestions);
  console.log('Inserted 200+ sample questions!');
  mongoose.disconnect();
}

seed(); 