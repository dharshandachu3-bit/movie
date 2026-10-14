import { Movie } from '../types';

export const MOVIES: Movie[] = [
  {
    id: 'inception',
    title: 'Inception',
    year: 2010,
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1400&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Thriller', 'Action'],
    rating: 8.8,
    voteCount: 2450000,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    duration: '2h 28m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['dreams', 'subconscious', 'mind-bending', 'heist', 'surreal', 'psychological', 'time-dilation']
  },
  {
    id: 'dark-knight',
    title: 'The Dark Knight',
    year: 2008,
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1400&auto=format&fit=crop',
    genres: ['Action', 'Crime', 'Drama'],
    rating: 9.0,
    voteCount: 2800000,
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'],
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    duration: '2h 32m',
    clusterAffinity: 1, // Action Lovers
    tags: ['batman', 'joker', 'chaos', 'vigilante', 'superhero', 'dark', 'corruption', 'justice']
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    year: 2014,
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1400&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    rating: 8.7,
    voteCount: 2100000,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    duration: '2h 49m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['space', 'wormhole', 'black-hole', 'relativity', 'time-travel', 'father-daughter', 'survival']
  },
  {
    id: 'fight-club',
    title: 'Fight Club',
    year: 1999,
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1400&auto=format&fit=crop',
    genres: ['Drama', 'Thriller'],
    rating: 8.8,
    voteCount: 2280000,
    director: 'David Fincher',
    cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter', 'Meat Loaf'],
    synopsis: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    duration: '2h 19m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['identity', 'anti-consumerism', 'insomnia', 'alter-ego', 'underground', 'cult-classic']
  },
  {
    id: 'pulp-fiction',
    title: 'Pulp Fiction',
    year: 1994,
    poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400&auto=format&fit=crop',
    genres: ['Crime', 'Drama'],
    rating: 8.9,
    voteCount: 2180000,
    director: 'Quentin Tarantino',
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis'],
    synopsis: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    duration: '2h 34m',
    clusterAffinity: 5, // Indie & Classics
    tags: ['nonlinear', 'dialogue', 'hitmen', 'dance', 'classic', 'pop-culture', 'dark-comedy']
  },
  {
    id: 'the-matrix',
    title: 'The Matrix',
    year: 1999,
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1400&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Action'],
    rating: 8.7,
    voteCount: 2020000,
    director: 'Lana & Lilly Wachowski',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
    synopsis: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    duration: '2h 16m',
    clusterAffinity: 1, // Action Lovers
    tags: ['cyberpunk', 'simulation', 'red-pill', 'martial-arts', 'virtual-reality', 'dystopia']
  },
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    year: 2024,
    poster: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=1400&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Adventure', 'Action'],
    rating: 8.6,
    voteCount: 480000,
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    duration: '2h 46m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['desert', 'sandworms', 'prophecy', 'epic', 'spice', 'space-opera', 'politics']
  },
  {
    id: 'whiplash',
    title: 'Whiplash',
    year: 2014,
    poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1400&auto=format&fit=crop',
    genres: ['Drama', 'Music'],
    rating: 8.5,
    voteCount: 960000,
    director: 'Damien Chazelle',
    cast: ['Miles Teller', 'J.K. Simmons', 'Paul Reiser', 'Melissa Benoist'],
    synopsis: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    duration: '1h 46m',
    clusterAffinity: 5, // Indie & Classics
    tags: ['jazz', 'obsession', 'drums', 'intensity', 'perfectionism', 'mentor-student']
  },
  {
    id: 'parasite',
    title: 'Parasite',
    year: 2019,
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
    genres: ['Thriller', 'Drama', 'Comedy'],
    rating: 8.5,
    voteCount: 920000,
    director: 'Bong Joon Ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    duration: '2h 12m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['class-struggle', 'dark-comedy', 'architecture', 'social-satire', 'oscar-winner', 'suspense']
  },
  {
    id: 'the-social-network',
    title: 'The Social Network',
    year: 2010,
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop',
    genres: ['Drama', 'Biography'],
    rating: 7.8,
    voteCount: 740000,
    director: 'David Fincher',
    cast: ['Jesse Eisenberg', 'Andrew Garfield', 'Justin Timberlake', 'Rooney Mara'],
    synopsis: 'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.',
    duration: '2h 0m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['tech', 'startup', 'friendship', 'betrayal', 'harvard', 'coding', 'fast-dialogue']
  },
  {
    id: 'the-batman',
    title: 'The Batman',
    year: 2022,
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1400&auto=format&fit=crop',
    genres: ['Action', 'Crime', 'Drama'],
    rating: 8.1,
    voteCount: 780000,
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Jeffrey Wright', 'Colin Farrell'],
    synopsis: 'When a sadistic serial killer begins murdering key political figures in Gotham, the Batman is forced to investigate the city\'s hidden corruption.',
    duration: '2h 56m',
    clusterAffinity: 1, // Action Lovers
    tags: ['noir', 'detective', 'rainy', 'riddler', 'gotham', 'gritty', 'vengeance']
  },
  {
    id: 'deadpool-wolverine',
    title: 'Deadpool & Wolverine',
    year: 2024,
    poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1400&auto=format&fit=crop',
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    rating: 7.9,
    voteCount: 420000,
    director: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Matthew Macfadyen'],
    synopsis: 'Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction.',
    duration: '2h 8m',
    clusterAffinity: 3, // Comedy Fans
    tags: ['multiverse', 'fourth-wall', 'buddy-comedy', 'marvel', 'anti-hero', 'satire']
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    year: 2023,
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop',
    genres: ['Drama', 'History', 'Biography'],
    rating: 8.9,
    voteCount: 760000,
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    duration: '3h 0m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['atomic-bomb', 'manhattan-project', 'physics', 'morality', 'quantum', 'biopic']
  },
  {
    id: 'forrest-gump',
    title: 'Forrest Gump',
    year: 1994,
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop',
    genres: ['Drama', 'Romance'],
    rating: 8.8,
    voteCount: 2200000,
    director: 'Robert Zemeckis',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise', 'Sally Field'],
    synopsis: 'The history of the United States from the 1950s to the \'70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.',
    duration: '2h 22m',
    clusterAffinity: 4, // Romance Seekers
    tags: ['destiny', 'heartwarming', 'vietnam-war', 'running', 'chocolate-box', 'classic']
  },
  {
    id: 'the-avengers',
    title: 'The Avengers',
    year: 2012,
    poster: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop',
    genres: ['Action', 'Sci-Fi'],
    rating: 8.0,
    voteCount: 1450000,
    director: 'Joss Whedon',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson', 'Mark Ruffalo'],
    synopsis: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
    duration: '2h 23m',
    clusterAffinity: 1, // Action Lovers
    tags: ['superheroes', 'team-up', 'alien-invasion', 'marvel', 'blockbuster', 'action-packed']
  },
  {
    id: 'joker',
    title: 'Joker',
    year: 2019,
    poster: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1400&auto=format&fit=crop',
    genres: ['Crime', 'Drama', 'Thriller'],
    rating: 8.4,
    voteCount: 1520000,
    director: 'Todd Phillips',
    cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz', 'Frances Conroy'],
    synopsis: 'During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.',
    duration: '2h 2m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['mental-health', 'isolation', 'gotham', 'dance', 'dark', 'character-study']
  },
  {
    id: 'la-la-land',
    title: 'La La Land',
    year: 2016,
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1400&auto=format&fit=crop',
    genres: ['Musical', 'Romance', 'Drama'],
    rating: 8.0,
    voteCount: 650000,
    director: 'Damien Chazelle',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend', 'Rosemarie DeWitt'],
    synopsis: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    duration: '2h 8m',
    clusterAffinity: 4, // Romance Seekers
    tags: ['jazz', 'hollywood', 'dreams', 'dancing', 'bittersweet', 'love-story', 'vibrant']
  },
  {
    id: 'grand-budapest-hotel',
    title: 'The Grand Budapest Hotel',
    year: 2014,
    poster: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop',
    genres: ['Comedy', 'Drama', 'Adventure'],
    rating: 8.1,
    voteCount: 890000,
    director: 'Wes Anderson',
    cast: ['Ralph Fiennes', 'Tony Revolori', 'Saoirse Ronan', 'Willem Dafoe'],
    synopsis: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
    duration: '1h 39m',
    clusterAffinity: 5, // Indie & Classics
    tags: ['symmetry', 'pastel', 'whimsical', 'concierge', 'heist', 'quirky', 'aesthetic']
  },
  {
    id: 'blade-runner-2049',
    title: 'Blade Runner 2049',
    year: 2017,
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1400&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Mystery', 'Drama'],
    rating: 8.0,
    voteCount: 650000,
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas', 'Sylvia Hoeks'],
    synopsis: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.',
    duration: '2h 44m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['cyberpunk', 'neon', 'replicants', 'existential', 'dystopian', 'hologram', 'noir']
  },
  {
    id: 'spider-verse',
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    poster: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1400&auto=format&fit=crop',
    genres: ['Action', 'Animation', 'Adventure'],
    rating: 8.4,
    voteCount: 680000,
    director: 'Bob Persichetti, Peter Ramsey',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld', 'Mahershala Ali'],
    synopsis: 'Teen Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from various parallel universes to stop a menace to all reality.',
    duration: '1h 57m',
    clusterAffinity: 1, // Action Lovers
    tags: ['animation', 'comic-book', 'multiverse', 'leap-of-faith', 'hip-hop', 'stylish']
  },
  {
    id: 'arrival',
    title: 'Arrival',
    year: 2016,
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1400&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    rating: 7.9,
    voteCount: 750000,
    director: 'Denis Villeneuve',
    cast: ['Amy Adams', 'Jeremy Renner', 'Forest Whitaker', 'Michael Stuhlbarg'],
    synopsis: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
    duration: '1h 56m',
    clusterAffinity: 2, // Mindful Explorers
    tags: ['linguistics', 'aliens', 'time-nonlinear', 'philosophical', 'first-contact']
  },
  {
    id: 'everything-everywhere',
    title: 'Everything Everywhere All at Once',
    year: 2022,
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1400&auto=format&fit=crop',
    genres: ['Sci-Fi', 'Comedy', 'Adventure'],
    rating: 7.8,
    voteCount: 540000,
    director: 'Daniel Kwan, Daniel Scheinert',
    cast: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan', 'Jamie Lee Curtis'],
    synopsis: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
    duration: '2h 19m',
    clusterAffinity: 3, // Comedy Fans
    tags: ['multiverse', 'absurdism', 'family', 'kung-fu', 'bagel', 'emotional', 'creative']
  },
  {
    id: 'gladiator',
    title: 'Gladiator',
    year: 2000,
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1400&auto=format&fit=crop',
    genres: ['Action', 'Drama', 'Adventure'],
    rating: 8.5,
    voteCount: 1600000,
    director: 'Ridley Scott',
    cast: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen', 'Oliver Reed'],
    synopsis: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    duration: '2h 35m',
    clusterAffinity: 1, // Action Lovers
    tags: ['rome', 'colosseum', 'revenge', 'honor', 'historical-epic', 'sword-and-sandal']
  },
  {
    id: 'her',
    title: 'Her',
    year: 2013,
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1400&auto=format&fit=crop',
    genres: ['Romance', 'Sci-Fi', 'Drama'],
    rating: 8.0,
    voteCount: 680000,
    director: 'Spike Jonze',
    cast: ['Joaquin Phoenix', 'Scarlett Johansson', 'Amy Adams', 'Rooney Mara'],
    synopsis: 'In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.',
    duration: '2h 6m',
    clusterAffinity: 4, // Romance Seekers
    tags: ['ai', 'future', 'loneliness', 'connection', 'pastel', 'voice-assistant', 'poetic']
  }
];

export const GENRES = [
  'All',
  'For You',
  'Action',
  'Sci-Fi',
  'Thriller',
  'Drama',
  'Comedy',
  'Romance',
  'Musical',
  'Adventure',
  'Crime'
];
