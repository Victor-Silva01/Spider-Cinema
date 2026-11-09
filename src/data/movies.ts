// Demonstration catalog used while the TMDB API is not configured.
// Ratings and streaming availability are intentionally omitted: they must
// come from a real source (TMDB) and are never invented here.
import heroImg from "@/assets/hero.jpg";
import trailersImg from "@/assets/trailers.jpg";
import { moviePosters } from "./movie-posters";

export type CastMember = { name: string; role: string };
export type Movie = {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  runtime?: number;
  genres: string[];
  synopsis: string;
  director: string;
  cast: CastMember[];
  trailerId?: string;
  hue: number;
  collections: ("spider" | "marvel" | "highlight")[];
  type: "movie" | "series";
  backdrop?: string;
  poster?: string;
  rating?: number;
  voteCount?: number;
  providers?: { name: string; url: string }[];
};

const m = (x: Movie): Movie => {
  const poster = moviePosters[x.id];
  return poster ? { ...x, poster } : x;
};

export const movies: Movie[] = [
  m({ id: "homem-aranha-2002", title: "Homem-Aranha", originalTitle: "Spider-Man", year: 2002, runtime: 121, genres: ["Ação", "Aventura"], synopsis: "Após ser picado por uma aranha geneticamente modificada, o tímido estudante Peter Parker ganha poderes extraordinários e precisa aprender que grandes poderes trazem grandes responsabilidades.", director: "Sam Raimi", cast: [{ name: "Tobey Maguire", role: "Peter Parker" }, { name: "Kirsten Dunst", role: "Mary Jane Watson" }, { name: "Willem Dafoe", role: "Norman Osborn" }, { name: "James Franco", role: "Harry Osborn" }], hue: 25, collections: ["spider"], type: "movie" }),
  m({ id: "homem-aranha-2-2004", title: "Homem-Aranha 2", originalTitle: "Spider-Man 2", year: 2004, runtime: 127, genres: ["Ação", "Aventura"], synopsis: "Dividido entre a vida pessoal e o dever de herói, Peter Parker enfrenta o Dr. Otto Octavius, um cientista transformado pelo próprio experimento.", director: "Sam Raimi", cast: [{ name: "Tobey Maguire", role: "Peter Parker" }, { name: "Kirsten Dunst", role: "Mary Jane Watson" }, { name: "Alfred Molina", role: "Otto Octavius" }], hue: 40, collections: ["spider"], type: "movie" }),
  m({ id: "homem-aranha-3-2007", title: "Homem-Aranha 3", originalTitle: "Spider-Man 3", year: 2007, runtime: 139, genres: ["Ação", "Aventura"], synopsis: "Um misterioso traje negro amplifica os poderes de Peter Parker — e seu lado mais sombrio — enquanto novos inimigos surgem em Nova York.", director: "Sam Raimi", cast: [{ name: "Tobey Maguire", role: "Peter Parker" }, { name: "Kirsten Dunst", role: "Mary Jane Watson" }, { name: "Topher Grace", role: "Eddie Brock" }, { name: "Thomas Haden Church", role: "Flint Marko" }], hue: 270, collections: ["spider"], type: "movie" }),
  m({ id: "espetacular-homem-aranha-2012", title: "O Espetacular Homem-Aranha", originalTitle: "The Amazing Spider-Man", year: 2012, runtime: 136, genres: ["Ação", "Aventura", "Ficção científica"], synopsis: "Peter Parker investiga o desaparecimento dos pais e acaba frente a frente com o Lagarto, alter ego do Dr. Curt Connors.", director: "Marc Webb", cast: [{ name: "Andrew Garfield", role: "Peter Parker" }, { name: "Emma Stone", role: "Gwen Stacy" }, { name: "Rhys Ifans", role: "Curt Connors" }], hue: 210, collections: ["spider"], type: "movie" }),
  m({ id: "espetacular-homem-aranha-2-2014", title: "O Espetacular Homem-Aranha 2", originalTitle: "The Amazing Spider-Man 2", year: 2014, runtime: 142, genres: ["Ação", "Aventura", "Ficção científica"], synopsis: "Peter enfrenta Electro e o Duende Verde enquanto tenta proteger Gwen Stacy e descobrir a verdade sobre seu passado.", director: "Marc Webb", cast: [{ name: "Andrew Garfield", role: "Peter Parker" }, { name: "Emma Stone", role: "Gwen Stacy" }, { name: "Jamie Foxx", role: "Max Dillon" }, { name: "Dane DeHaan", role: "Harry Osborn" }], hue: 225, collections: ["spider"], type: "movie" }),
  m({ id: "de-volta-ao-lar-2017", title: "Homem-Aranha: De Volta ao Lar", originalTitle: "Spider-Man: Homecoming", year: 2017, runtime: 133, genres: ["Ação", "Aventura", "Comédia"], synopsis: "Depois da batalha com os Vingadores, Peter Parker volta à rotina escolar sob a orientação de Tony Stark, até que o Abutre ameaça tudo que ele ama.", director: "Jon Watts", cast: [{ name: "Tom Holland", role: "Peter Parker" }, { name: "Michael Keaton", role: "Adrian Toomes" }, { name: "Zendaya", role: "Michelle" }, { name: "Robert Downey Jr.", role: "Tony Stark" }], hue: 15, collections: ["spider", "marvel"], type: "movie" }),
  m({ id: "longe-de-casa-2019", title: "Homem-Aranha: Longe de Casa", originalTitle: "Spider-Man: Far From Home", year: 2019, runtime: 129, genres: ["Ação", "Aventura", "Comédia"], synopsis: "Numa viagem escolar pela Europa, Peter é recrutado por Nick Fury para enfrentar criaturas elementais ao lado do misterioso Mysterio.", director: "Jon Watts", cast: [{ name: "Tom Holland", role: "Peter Parker" }, { name: "Jake Gyllenhaal", role: "Quentin Beck" }, { name: "Zendaya", role: "MJ" }, { name: "Samuel L. Jackson", role: "Nick Fury" }], trailerId: "Nt9L1jCKGnE", hue: 160, collections: ["spider", "marvel"], type: "movie" }),
  m({ id: "sem-volta-para-casa-2021", title: "Homem-Aranha: Sem Volta Para Casa", originalTitle: "Spider-Man: No Way Home", year: 2021, runtime: 148, genres: ["Ação", "Aventura", "Ficção científica"], synopsis: "Após ter sua identidade revelada, o Homem-Aranha pede ajuda ao Doutor Estranho para que todos esqueçam quem ele é. Mas um feitiço sai do controle e coloca em risco o multiverso, trazendo vilões de outras realidades.", director: "Jon Watts", cast: [{ name: "Tom Holland", role: "Peter Parker" }, { name: "Zendaya", role: "MJ" }, { name: "Benedict Cumberbatch", role: "Stephen Strange" }, { name: "Jacob Batalon", role: "Ned Leeds" }], trailerId: "JfVOs4VSpmA", hue: 30, collections: ["spider", "marvel", "highlight"], type: "movie", backdrop: heroImg }),
  m({ id: "atraves-do-aranhaverso-2023", title: "Homem-Aranha: Através do Aranhaverso", originalTitle: "Spider-Man: Across the Spider-Verse", year: 2023, runtime: 140, genres: ["Animação", "Ação", "Aventura"], synopsis: "Miles Morales atravessa o multiverso ao lado de Gwen Stacy e encontra uma sociedade de Aranhas que o obriga a redefinir o que significa ser um herói.", director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson", cast: [{ name: "Shameik Moore", role: "Miles Morales (voz)" }, { name: "Hailee Steinfeld", role: "Gwen Stacy (voz)" }, { name: "Oscar Isaac", role: "Miguel O'Hara (voz)" }], trailerId: "cqGjhVJWtEg", hue: 320, collections: ["spider", "highlight"], type: "movie", backdrop: trailersImg }),
  m({ id: "vingadores-2012", title: "Os Vingadores", originalTitle: "The Avengers", year: 2012, runtime: 143, genres: ["Ação", "Aventura", "Ficção científica"], synopsis: "Nick Fury reúne os maiores heróis da Terra para impedir que Loki e um exército alienígena dominem o planeta.", director: "Joss Whedon", cast: [{ name: "Robert Downey Jr.", role: "Tony Stark" }, { name: "Chris Evans", role: "Steve Rogers" }, { name: "Scarlett Johansson", role: "Natasha Romanoff" }, { name: "Chris Hemsworth", role: "Thor" }], hue: 220, collections: ["marvel"], type: "movie" }),
  m({ id: "era-de-ultron-2015", title: "Vingadores: Era de Ultron", originalTitle: "Avengers: Age of Ultron", year: 2015, runtime: 141, genres: ["Ação", "Aventura", "Ficção científica"], synopsis: "Uma inteligência artificial criada para proteger a humanidade decide que a única forma de paz é a extinção, e os Vingadores precisam detê-la.", director: "Joss Whedon", cast: [{ name: "Robert Downey Jr.", role: "Tony Stark" }, { name: "James Spader", role: "Ultron (voz)" }, { name: "Elizabeth Olsen", role: "Wanda Maximoff" }], hue: 200, collections: ["marvel"], type: "movie" }),
  m({ id: "guerra-infinita-2018", title: "Vingadores: Guerra Infinita", originalTitle: "Avengers: Infinity War", year: 2018, runtime: 149, genres: ["Ação", "Aventura", "Ficção científica"], synopsis: "Os Vingadores e seus aliados arriscam tudo para impedir que Thanos reúna as seis Joias do Infinito.", director: "Anthony Russo, Joe Russo", cast: [{ name: "Josh Brolin", role: "Thanos" }, { name: "Robert Downey Jr.", role: "Tony Stark" }, { name: "Chris Hemsworth", role: "Thor" }], trailerId: "6ZfuNTqbHE8", hue: 290, collections: ["marvel"], type: "movie" }),
  m({ id: "ultimato-2019", title: "Vingadores: Ultimato", originalTitle: "Avengers: Endgame", year: 2019, runtime: 181, genres: ["Ação", "Aventura", "Drama"], synopsis: "Após o estalo de Thanos, os Vingadores restantes se reúnem uma última vez para desfazer suas ações e restaurar o universo.", director: "Anthony Russo, Joe Russo", cast: [{ name: "Robert Downey Jr.", role: "Tony Stark" }, { name: "Chris Evans", role: "Steve Rogers" }, { name: "Mark Ruffalo", role: "Bruce Banner" }], trailerId: "TcMBFSGVi1c", hue: 275, collections: ["marvel", "highlight"], type: "movie" }),
  m({ id: "doutor-estranho-2016", title: "Doutor Estranho", originalTitle: "Doctor Strange", year: 2016, runtime: 115, genres: ["Ação", "Fantasia"], synopsis: "Um neurocirurgião arrogante perde o uso das mãos e encontra nas artes místicas uma nova vida — e a missão de proteger a realidade.", director: "Scott Derrickson", cast: [{ name: "Benedict Cumberbatch", role: "Stephen Strange" }, { name: "Tilda Swinton", role: "A Anciã" }, { name: "Chiwetel Ejiofor", role: "Mordo" }], hue: 45, collections: ["marvel"], type: "movie" }),
  m({ id: "multiverso-da-loucura-2022", title: "Doutor Estranho no Multiverso da Loucura", originalTitle: "Doctor Strange in the Multiverse of Madness", year: 2022, runtime: 126, genres: ["Fantasia", "Ação", "Terror"], synopsis: "Stephen Strange atravessa realidades alternativas perigosas para proteger uma jovem capaz de viajar entre universos.", director: "Sam Raimi", cast: [{ name: "Benedict Cumberbatch", role: "Stephen Strange" }, { name: "Elizabeth Olsen", role: "Wanda Maximoff" }, { name: "Xochitl Gomez", role: "America Chavez" }], hue: 300, collections: ["marvel"], type: "movie" }),
  m({ id: "pantera-negra-2018", title: "Pantera Negra", originalTitle: "Black Panther", year: 2018, runtime: 134, genres: ["Ação", "Aventura"], synopsis: "T'Challa retorna a Wakanda para assumir o trono, mas um adversário poderoso coloca em risco o destino da nação e do mundo.", director: "Ryan Coogler", cast: [{ name: "Chadwick Boseman", role: "T'Challa" }, { name: "Michael B. Jordan", role: "Erik Killmonger" }, { name: "Lupita Nyong'o", role: "Nakia" }], trailerId: "xjDjIWPwcPU", hue: 285, collections: ["marvel"], type: "movie" }),
  m({ id: "thor-ragnarok-2017", title: "Thor: Ragnarok", originalTitle: "Thor: Ragnarok", year: 2017, runtime: 130, genres: ["Ação", "Comédia", "Fantasia"], synopsis: "Preso do outro lado do universo, Thor precisa vencer uma corrida contra o tempo para impedir que Hela destrua Asgard.", director: "Taika Waititi", cast: [{ name: "Chris Hemsworth", role: "Thor" }, { name: "Cate Blanchett", role: "Hela" }, { name: "Tom Hiddleston", role: "Loki" }], trailerId: "ue80QwXMRHg", hue: 95, collections: ["marvel"], type: "movie" }),
  m({ id: "guardioes-3-2023", title: "Guardiões da Galáxia Vol. 3", originalTitle: "Guardians of the Galaxy Vol. 3", year: 2023, runtime: 150, genres: ["Ação", "Aventura", "Comédia"], synopsis: "Peter Quill reúne a equipe para uma missão que pode significar o fim dos Guardiões como os conhecemos.", director: "James Gunn", cast: [{ name: "Chris Pratt", role: "Peter Quill" }, { name: "Zoe Saldaña", role: "Gamora" }, { name: "Bradley Cooper", role: "Rocket (voz)" }], hue: 330, collections: ["marvel", "highlight"], type: "movie" }),
  m({ id: "deadpool-wolverine-2024", title: "Deadpool & Wolverine", originalTitle: "Deadpool & Wolverine", year: 2024, runtime: 128, genres: ["Ação", "Comédia"], synopsis: "Deadpool é recrutado pela AVT e precisa convencer um Wolverine relutante a ajudá-lo a salvar seu universo.", director: "Shawn Levy", cast: [{ name: "Ryan Reynolds", role: "Wade Wilson" }, { name: "Hugh Jackman", role: "Logan" }, { name: "Emma Corrin", role: "Cassandra Nova" }], trailerId: "73_1biulkYk", hue: 10, collections: ["marvel", "highlight"], type: "movie" }),
  m({ id: "duna-parte-dois-2024", title: "Duna: Parte Dois", originalTitle: "Dune: Part Two", year: 2024, runtime: 166, genres: ["Ficção científica", "Aventura", "Drama"], synopsis: "Paul Atreides se une a Chani e aos Fremen em uma jornada de vingança contra os conspiradores que destruíram sua família.", director: "Denis Villeneuve", cast: [{ name: "Timothée Chalamet", role: "Paul Atreides" }, { name: "Zendaya", role: "Chani" }, { name: "Rebecca Ferguson", role: "Jessica" }], trailerId: "Way9Dexny3w", hue: 55, collections: ["highlight"], type: "movie" }),
  m({ id: "the-batman-2022", title: "The Batman", originalTitle: "The Batman", year: 2022, runtime: 176, genres: ["Ação", "Crime", "Drama"], synopsis: "Em seu segundo ano combatendo o crime, Batman investiga a corrupção de Gotham enquanto persegue o Charada.", director: "Matt Reeves", cast: [{ name: "Robert Pattinson", role: "Bruce Wayne" }, { name: "Zoë Kravitz", role: "Selina Kyle" }, { name: "Paul Dano", role: "Edward Nashton" }], trailerId: "mqqft2x_Aa4", hue: 20, collections: ["highlight"], type: "movie" }),
  m({ id: "oppenheimer-2023", title: "Oppenheimer", originalTitle: "Oppenheimer", year: 2023, runtime: 180, genres: ["Drama", "História"], synopsis: "A história do físico J. Robert Oppenheimer e de seu papel no desenvolvimento da bomba atômica.", director: "Christopher Nolan", cast: [{ name: "Cillian Murphy", role: "J. Robert Oppenheimer" }, { name: "Emily Blunt", role: "Kitty Oppenheimer" }, { name: "Robert Downey Jr.", role: "Lewis Strauss" }], trailerId: "uYPbbksJxIg", hue: 35, collections: ["highlight"], type: "movie" }),
  m({ id: "loki-2021", title: "Loki", originalTitle: "Loki", year: 2021, genres: ["Fantasia", "Ficção científica"], synopsis: "Após roubar o Tesseract, Loki é levado pela Autoridade de Variância Temporal e precisa ajudar a consertar a linha do tempo.", director: "Kate Herron", cast: [{ name: "Tom Hiddleston", role: "Loki" }, { name: "Owen Wilson", role: "Mobius" }, { name: "Sophia Di Martino", role: "Sylvie" }], hue: 140, collections: ["marvel"], type: "series" }),
  m({ id: "wandavision-2021", title: "WandaVision", originalTitle: "WandaVision", year: 2021, genres: ["Fantasia", "Drama", "Comédia"], synopsis: "Wanda Maximoff e Visão vivem uma vida suburbana idealizada que, aos poucos, revela não ser o que parece.", director: "Matt Shakman", cast: [{ name: "Elizabeth Olsen", role: "Wanda Maximoff" }, { name: "Paul Bettany", role: "Visão" }, { name: "Kathryn Hahn", role: "Agatha Harkness" }], hue: 350, collections: ["marvel"], type: "series" }),
  m({ id: "seu-amigo-da-vizinhanca-2025", title: "Seu Amigão da Vizinhança: Homem-Aranha", originalTitle: "Your Friendly Neighborhood Spider-Man", year: 2025, genres: ["Animação", "Ação"], synopsis: "Uma nova visão animada dos primeiros dias de Peter Parker como Homem-Aranha.", director: "Jeff Trammell", cast: [{ name: "Hudson Thames", role: "Peter Parker (voz)" }, { name: "Colman Domingo", role: "Norman Osborn (voz)" }], hue: 5, collections: ["spider", "marvel"], type: "series" }),
  m({ id: "demolidor-renascido-2025", title: "Demolidor: Renascido", originalTitle: "Daredevil: Born Again", year: 2025, genres: ["Crime", "Drama", "Ação"], synopsis: "Matt Murdock, advogado cego com sentidos aguçados, volta a cruzar caminho com Wilson Fisk, agora prefeito de Nova York.", director: "Justin Benson, Aaron Moorhead", cast: [{ name: "Charlie Cox", role: "Matt Murdock" }, { name: "Vincent D'Onofrio", role: "Wilson Fisk" }], hue: 0, collections: ["marvel"], type: "series" }),
];

export const films = movies.filter((x) => x.type === "movie");
export const series = movies.filter((x) => x.type === "series");
export const byCollection = (c: Movie["collections"][number]) => films.filter((x) => x.collections.includes(c));
export const getMovie = (id: string) => movies.find((x) => x.id === id);
export const featuredIds = ["sem-volta-para-casa-2021", "atraves-do-aranhaverso-2023", "ultimato-2019"];
export const allGenres = Array.from(new Set(movies.flatMap((x) => x.genres))).sort();
export const allYears = Array.from(new Set(movies.map((x) => x.year))).sort((a, b) => b - a);

export function related(movie: Movie, limit = 8) {
  return movies
    .filter((x) => x.id !== movie.id)
    .map((x) => ({
      x,
      score:
        x.genres.filter((g) => movie.genres.includes(g)).length +
        x.collections.filter((c) => movie.collections.includes(c)).length * 2,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.x);
}

export type Filters = { q?: string | undefined; genre?: string | undefined; year?: number | undefined; rating?: number | undefined };
export function filterMovies(list: Movie[], f: Filters) {
  const q = f.q?.trim().toLowerCase();
  return list.filter(
    (x) =>
      (!q || x.title.toLowerCase().includes(q) || x.originalTitle.toLowerCase().includes(q) || x.director.toLowerCase().includes(q) || x.cast.some((c) => c.name.toLowerCase().includes(q))) &&
      (!f.genre || x.genres.includes(f.genre)) &&
      (!f.year || x.year === f.year) &&
      (!f.rating || (x.rating ?? 0) >= f.rating),
  );
}

export const formatRuntime = (min?: number) => (min ? `${Math.floor(min / 60)}h ${min % 60}min` : undefined);
