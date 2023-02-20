import HomePage from "../pages/homePage";

describe("Trial Project", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    console.log(err);
    return false;
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("Validate doing a Search works as expected", () => {
    let movieQuery = {
      query_title: "Brad and Benny Make a Bet",
      expected_result_similarities: 0.99,
      expected_title: "Brad and Benny Make a Bet",
      expected_image:
        "https://m.media-amazon.com/images/M/MV5BYThkOGQ3ZjAtNzhkMC00YjY3LThhMjctNzI0NTdhNmI5MjFjXkEyXkFqcGdeQXVyMTI0MzcwMjAw._V1_SX300.jpg",
      expected_year: "2022",
      expected_show_result_speed: 3000
    };

    HomePage.searchForMovie(movieQuery.query_title);
    HomePage.validateResults(movieQuery);
    
  });

  it("Validate autocomplete result card shows within 300ms - content and image rendered size should be correct ", () => {
    let movieQuery = {
      query_title: "Brad and Benny Make a Bet",
      expected_result_similarities: 0.99,
      expected_title: "Brad and Benny Make a Bet",
      expected_image:
        "https://m.media-amazon.com/images/M/MV5BYThkOGQ3ZjAtNzhkMC00YjY3LThhMjctNzI0NTdhNmI5MjFjXkEyXkFqcGdeQXVyMTI0MzcwMjAw._V1_SX300.jpg",
      expected_year: "2022",
      expected_show_result_speed: 300
    };

    HomePage.searchForMovie(movieQuery.query_title);
    HomePage.validateResults(movieQuery);

    movieQuery = {
      query_title: "Die Hard",
      expected_result_similarities: 0.10,
      expected_title: "Brad and Benny Make a Bet",
      expected_image:
        "https://m.media-amazon.com/images/M/MV5BYThkOGQ3ZjAtNzhkMC00YjY3LThhMjctNzI0NTdhNmI5MjFjXkEyXkFqcGdeQXVyMTI0MzcwMjAw._V1_SX300.jpg",
      expected_year: "2022",
      expected_show_result_speed: 300
    };

    HomePage.searchForMovie(movieQuery.query_title);
    HomePage.validateResults(movieQuery);
    
  });

  it("Validate search box is highlighted when clicking on it", () => {
    
    
    HomePage.clickAndCheckTextboxOutline()
    
  });

  it("Validate opening Movie page displays correct content", () => {
    let movieQuery= {
      query_title: "Brad and Benny Make a Bet",
      expected_result_similarities: .99,
      expected_title: "Brad and Benny Make a Bet",
      expected_image: "https://m.media-amazon.com/images/M/MV5BYThkOGQ3ZjAtNzhkMC00YjY3LThhMjctNzI0NTdhNmI5MjFjXkEyXkFqcGdeQXVyMTI0MzcwMjAw._V1_SX300.jpg",
      expected_year: "2022",
      expected_show_result_speed: 3000
    }
    
    HomePage.searchForMovie(movieQuery.query_title)
    HomePage.clickAndCheckForMovieDetailsPage()
    // HomePage.validateResults(movieQuery)
  });

  it("Validate pasting a Movie name into the textbox and its result", () => {
    let movieQuery = {
      query_title: "Paste",
      expected_result_similarities: 0.1,
      expected_title: "",
      expected_image: "",
      expected_year: "",
      expected_show_result_speed: 3000
    };
    HomePage.pasteTextQuery("Pasted");
    HomePage.validateResults(movieQuery);
  });
});
