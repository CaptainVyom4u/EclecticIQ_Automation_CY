//import homePage from '../..elements/pages/home_page';

// selecting the filter value
function addvaluetofilter(value) {
  cy.get("#filter-input").clear();
  cy.get("#filter-input").type(value);
}
// select the sort value
function selectSortData(value) {
  cy.get("select").select(value);
}

const compareArrayValues = (actaulArray, expectedArray) => {
  let value = false;
  for (let i = 0; i < actaulArray.length; i++) {
    //console.log(actaulArray[i]+' ='+ expectedArray[i])
    if (actaulArray[i] == expectedArray[i]) {
      value = true;
    } else {
      value = false;
    }
  }
  return value;
};

describe("Launching the browser  ", () => {
  // We are launching the browser and checked table is loaded
  before(() => {
    const launchUrl = "https://mystifying-beaver-ee03b5.netlify.app";

    cy.visit(launchUrl);
});


    beforeEach(() => {
        cy.get("#filter-input").clear();
        cy.get(".table-content")
      .get(".table-row")
      .should("not.have.length", 0);
        
    })
    // if value is zero this means table is empty No need to run the tests
    
  

  describe("sorting and filtering tests ", () => {
    it("validate combination filtering and sorting ", () => {
      
      let nameValue = [];
      cy.get(".data-complexity")
        .each($name => {
          const txt = $name.text();
          nameValue.push(txt);
        })
        .then(() => {
          console.log(nameValue[2]);
          addvaluetofilter(nameValue[2]);
          cy.get(".data-complexity").should("contain", nameValue[2]);
        })
        .then(() => {
          selectSortData("name");
          let idList = [];
          let sorted = [];
          let sortedToggle = false;
          cy.get(".data-name")
            .each($nameElements => {
              idList.push($nameElements.text());
            })
            .then(() => {
              sorted = idList.slice().sort();
              let compareArraysValue = compareArrayValues(idList, sorted);
              expect(compareArraysValue).to.equal(true);
            });
        });
    });

    it("validate sort for Name", () => {
       
      selectSortData("name");
      let idList = [];
      let sorted = [];
      let sortedToggle = false;
      cy.get(".data-name")
        .each($nameElements => {
          idList.push($nameElements.text());
        })
        .then(() => {
          sorted = idList.slice().sort();
          let compareArraysValue = compareArrayValues(idList, sorted);
          expect(compareArraysValue).to.equal(true);
        });
    });

    it("validate sort average Impact score ", () => {
       
      selectSortData("averageImpact");
      cy.wait(1000)
      let idList = [];
      let sorted = [];
      let sortedToggle = false;
      cy.get(".data-averageImpact")
        .each($nameElements => {
          idList.push(parseFloat($nameElements.text()));
        })
        .then(() => {
          sorted = idList.slice();
          sorted = sorted.sort(function(a, b) {
            return a - b;
          });

          //console.log(idList)
          // console.log(sorted)
          let compareArraysValue = compareArrayValues(idList, sorted);
          expect(compareArraysValue).to.equal(true);
        });
    });

    it("validate filtering Using Name ", () => {
        
      let nameValue = [];
      cy.get(".data-name")
        .each($name => {
          const txt = $name.text();
          nameValue.push(txt);
        })
        .then(() => {
          // console.log(nameValue[2])
          addvaluetofilter(nameValue[2]);
          cy.get(".data-name").should("contain", nameValue[2]);
        });
    });

    it("validate filtering Using COMPLEXITY ", () => {
   
      let nameValue = [];
      cy.get(".data-complexity")
        .each($name => {
          const txt = $name.text();
          nameValue.push(txt);
        })
        .then(() => {
          console.log(nameValue[2]);
          addvaluetofilter(nameValue[2]);
          cy.get(".data-complexity").should("contain", nameValue[2]);
        });
    });
  });
});
