import 'cypress-file-upload';

before(() => {
  const url = Cypress.env("BACKEND_URL");
  cy.request({
    method: "GET",
    url: `${url}/QueryStudents`, 
  });
});

describe("Frontend", () => {
  it("connects", () => {
    const url = Cypress.env("FRONTEND_URL");
    cy.visit(url);
  });


  //การเพิ่ม
  it("adds a single student", () => {
    const url = Cypress.env("FRONTEND_URL");

    const student = {
      student_id: '630612095',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com'
    };
    cy.visit(url);
    cy.contains('Add Member').click();
    cy.contains('Add Single User').click();
    cy.get('input[name="student_id"]').should('be.visible');
    cy.get('input[name="student_id"]').should('be.visible');
    cy.get('input[name="student_id"]').type(student.student_id);
    cy.get('input[name="first_name"]').type(student.first_name);
    cy.get('input[name="last_name"]').type(student.last_name);
    cy.get('input[name="email"]').type(student.email);
    cy.contains('Add member').should('be.visible').click(); 
    cy.contains(student.student_id);
    cy.contains(student.first_name);
    cy.contains(student.last_name);
    cy.contains(student.email);
    cy.get('body').click(0, 0);
  });

  //การลบ
  it("deletes a student", () => {
    const url = Cypress.env("FRONTEND_URL");
    cy.visit(url);
    cy.contains('John').parent().within(() => {
      cy.get('button[aria-label="delete"]').click(); // คลิกที่ปุ่มที่มี aria-label="delete"
    });
    cy.contains('630612095').should('not.exist');
    cy.contains('John').should('not.exist');
    cy.contains('Doe').should('not.exist');
    cy.contains('john.doe@example.com').should('not.exist');
  });
  
  


  //uploadcsv
  it("uploads a CSV file", () => {
    const url = Cypress.env("FRONTEND_URL");
    const FilePath = 'students.csv'; // Path ของไฟล์ CSV ในโฟลเดอร์ fixtures

    cy.visit(url);
    cy.contains('Add Member').click();
    cy.contains('Upload CSV').click();

    // Upload the CSV file
    cy.get('input[type="file"]').attachFile(FilePath);
    cy.get('body').click(0, 0);
  });

    //update
    it("adds a single student", () => {
      const url = Cypress.env("FRONTEND_URL");
  
      const student = {
        student_id: '999999',
        first_name: 'Aster',
        last_name: 'prapet',
        email: 'Aster.p@example.com'
      };
      cy.visit(url);
      cy.contains('Add Member').click();
      cy.contains('Add Single User').click();
      cy.get('input[name="student_id"]').should('be.visible');
      cy.get('input[name="student_id"]').should('be.visible');
      cy.get('input[name="student_id"]').type(student.student_id);
      cy.get('input[name="first_name"]').type(student.first_name);
      cy.get('input[name="last_name"]').type(student.last_name);
      cy.get('input[name="email"]').type(student.email);
      cy.contains('Add member').should('be.visible').click(); 
      cy.contains(student.student_id);
      cy.contains(student.first_name);
      cy.contains(student.last_name);
      cy.contains(student.email);
      cy.get('body').click(0, 0);
    });
    it("updates a student's information", () => {
      const url = Cypress.env("FRONTEND_URL");
      cy.visit(url);
    

      cy.contains('Aster').parent().within(() => {
        cy.get('button[aria-label="update"]').click();
      });
    

      cy.get('input[name="first_name"]').clear().type('Jonathan');
      cy.get('input[name="last_name"]').clear().type('Doe');
      cy.get('input[name="email"]').clear().type('jonathan.doe@example.com');
    
      cy.get('button').contains('Update Student').click();
    

      cy.contains('Jonathan').should('exist');
      cy.contains('Doe').should('exist');
      cy.contains('jonathan.doe@example.com').should('exist');
    });
    

});
