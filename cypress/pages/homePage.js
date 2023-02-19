class HomePage {
  elements = {
    searchForAMovieTextbox: () => cy.get("movies-page").find("input#search"),
    searchResultsCards: () =>
      cy.get("#results .movies").find("movie-list-item", { timeout: 300 }),
  };

  searchForMovie = (searchQuery) => {
    cy.intercept("http://www.omdbapi.com/?apikey=**").as("movies_request");
    this.elements
      .searchForAMovieTextbox()
      .should("be.visible")
      .clear({ force: true })
      .type(searchQuery, { delay: 70, force: true });
    cy.wait("@movies_request").its("response.statusCode").should("eq", 200);
  };

  clickAndCheckTextboxOutline = () => {
    cy.wait(2000);
    this.elements
      .searchForAMovieTextbox()
      .should("not.be.disabled")
      .click({ force: true })
      .then(() => {
        this.elements
          .searchForAMovieTextbox() // .should('have.css','outline')
          .should("have.css", "outline-style", "auto");
      });
  };

  validateResults = (movieQuery) => {
    if (movieQuery.query_title != null || movieQuery.query_title != "") {
      if (movieQuery.expected_result_similarities > 0.99) {
        /* Validate Results cards to appear on 300ms */
        this.elements.searchResultsCards().should("have.length.gt", 0);

        /* Validate first card content */
        this.elements
          .searchResultsCards()
          .eq(0)
          .find(".movie-title")
          .invoke("text")
          .then((card_title_text) => {
            cy.log(movieQuery.query_title);
            cy.log(card_title_text);
            expect(
              this.getSimilarity(movieQuery.query_title, card_title_text),
              `Checking string similarity of "${movieQuery.query_title}" and "${card_title_text}"`
            ).to.be.greaterThan(movieQuery.expected_result_similarities);
          });
        // .should("include.text", movieQuery.expected_title);

        this.elements
          .searchResultsCards()
          .eq(0)
          .find("movie-image img")
          .should("not.be.empty");

        this.elements
          .searchResultsCards()
          .eq(0)
          .find("img")
          .should("have.attr", "src", movieQuery.expected_image);

        this.elements
          .searchResultsCards()
          .eq(0)
          .find("img")
          .invoke("css", "width")
          .then((width) => {
            /* Validate rendered movie poster width */
            expect(
              parseInt(width.replace("px", "")),
              "Checking Rendered image width"
            ).to.lte(40);
          });

        this.elements
          .searchResultsCards()
          .eq(0)
          .find(".movie-info")
          .should("include.text", "Year");

        this.elements
          .searchResultsCards()
          .eq(0)
          .find(".movie-year")
          .should("include.text", movieQuery.expected_year);
      } else {
        // const title_words = movieQuery.query_title
        //   .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
        //   .split(" ");
        /* Validate all card results if expected_an_exact match == false */
        this.elements.searchResultsCards().each((card) => {
          cy.wrap(card)
            .find(".movie-title")
            .invoke("text")
            .then((card_title_text) => {
              expect(
                this.getSimilarity(movieQuery.query_title, card_title_text),
                `Checking string similarity of "${movieQuery.query_title}" and "${card_title_text}"`
              ).to.be.greaterThan(movieQuery.expected_result_similarities);
            });
        });

        // title_words.forEach((word) => {
        //   this.elements.searchResultsCards().each((card) => {
        //     cy.wrap(card).find(".movie-title").should("include.text", word);
        //   });
        // });
      }
    }
  };

  pasteTextQuery = (textQuery) => {
    cy.window().then((win) => {
      // Use the Clipboard API to write the value to the clipboard
      win.navigator.clipboard.writeText(textQuery);
    });
    cy.log(textQuery);
    // Clear and focus the search input field
    // this.elements.searchForAMovieTextbox().click({ force: true });

    // Use the 'cmd + v' keyboard shortcut to paste the text
    // this.elements.searchForAMovieTextbox().clear({force:true}).type('{ctrl}a', { release: false, force: true ,delay: 300});
    this.elements
      .searchForAMovieTextbox()
      .should("not.be.disabled", { setTimeout: 10000 })
      .clear({ force: true })
      .type(textQuery, {
        paste: true,
        release: false,
        delay: 0, //Simulates paste action to textbox
      });

    // this.elements.searchForAMovieTextbox().clear({force:true}).invoke('val',textQuery)
    // this.elements.searchForAMovieTextbox().rightclick()
  };

  getSimilarity = (s1, s2) => {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (
      (longerLength - this.editDistance(longer, shorter)) /
      parseFloat(longerLength)
    );
  };

  editDistance = (s1, s2) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  };
}

module.exports = new HomePage();
