class HomePage {
    elements = {
      searchForAMovieTextbox: () => cy.get("movies-page").find("input#search"),
      searchResultsCards: () =>
        cy.get("#results .movies").find("movie-list-item",{timeout: 300}),
    };
  
    searchForMovie = (searchQuery) => {
  
      cy.get("movies-page").should("be.visible");
      this.elements.searchForAMovieTextbox().should("be.visible");
      this.elements.searchForAMovieTextbox().should("not.be.disabled");
      
      cy.intercept("http://www.omdbapi.com/?apikey=**").as("movies_request");
      this.elements
        .searchForAMovieTextbox()
        .clear()
        .type(searchQuery, { force: true })
        .then(() => {
          // cy.get("@movies_request").should("have.property", "status", 200);
          cy.wait('@movies_request').then(interception=> {
            expect(interception.response.statusCode,'Checking request status code').to.eq(200)
          })
        });
  
        
      
    };
  
    validateResults = (movieQuery)=> {
      if(movieQuery.query_title!=null || movieQuery.query_title!="") {
        /* Validate Search Textbox Outline when clicked */
        this.elements.searchForAMovieTextbox().click().then(()=> {
          this.elements.searchForAMovieTextbox().should('have.css','outline')
          this.elements.searchForAMovieTextbox().should('have.css','outline-style','auto')
        })
        
  
        /* Validate Results cards to appear on 300ms */
        this.elements.searchResultsCards().its('length').then(length=> {
          expect(length,'Checking if there are search results').to.be.greaterThan(0)
        })
      
  
        /* Validate first card content */
        this.elements.searchResultsCards().eq(0).find('.movie-title').then($el=> {
            let text = $el.text()
            expect(text, "Checking first card movie title").to.include(movieQuery.expected_title)
        })
        this.elements.searchResultsCards().eq(0).find('movie-image img').should('not.be.empty')
        this.elements.searchResultsCards().eq(0).find('img').should('have.attr', 'src',movieQuery.expected_image)
        this.elements.searchResultsCards().eq(0).find('img').invoke('css','width').then(width=> {
          /* Validate rendered movie poster width */
          expect(parseInt(width.replace("px","")),"Checking Rendered image width").to.lte(40)
        })
        this.elements.searchResultsCards().eq(0).find('.movie-info').should('include.text','Year')
        this.elements.searchResultsCards().eq(0).find('.movie-year').should('include.text',movieQuery.expected_year)
  
        /* Validate all card results */
        const title_words = movieQuery.query_title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').split(" ")
        title_words.forEach(word=> {
          this.elements.searchResultsCards().each(card=> {
            cy.wrap(card).find('.movie-title').should('include.text',word)
          })
        })
      }
  
      else {
        
      }
    }
  
    pasteTextQuery=(textQuery)=> {
      // Set the value you want to put in the clipboard
      // const textToPaste = textQuery
      const textToPaste = 'textQuery'
      cy.get('body').click(1,1)
      // this.elements.searchForAMovieTextbox().invoke('val',textToPaste).focus()
      cy.window().then((win) => {
        
        
        // Use the Clipboard API to write the value to the clipboard
        win.navigator.clipboard.readText(textToPaste)
       
        
        
      });
      // this.elements.searchFor]
    }
  }
  
  module.exports = new HomePage();
  