import HomePage from "../pages/homePage";


describe('Trial Project', () => {

  Cypress.on("uncaught:exception", (err, runnable) => {
    console.log(err);
    return false;
  });

  beforeEach(() => {
    cy.visit('/')
    
  });


  it('', () => {
    let movieQuery= {
      query_title: "Brad and Benny Make a Bet",
      expected_result_similarities: .99,
      expected_title: "Brad and Benny Make a Bet",
      expected_image: "https://m.media-amazon.com/images/M/MV5BYThkOGQ3ZjAtNzhkMC00YjY3LThhMjctNzI0NTdhNmI5MjFjXkEyXkFqcGdeQXVyMTI0MzcwMjAw._V1_SX300.jpg",
      expected_year: "2022"
    }
    
    HomePage.clickAndCheckTextboxOutline()
    HomePage.searchForMovie(movieQuery.query_title)
    HomePage.validateResults(movieQuery)
    movieQuery= {
      query_title: "Paste",
      expected_result_similarities: .10,
      expected_title: "",
      expected_image: "",
      expected_year: ""
    }
    HomePage.pasteTextQuery('Pasted')
    HomePage.validateResults(movieQuery)
  })
})