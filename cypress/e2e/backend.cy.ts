import 'cypress-file-upload';

describe("Backend", () => {
  const url = 'http://localhost:3000';

  // checks env
  it("checks env", () => {
    cy.log(JSON.stringify(Cypress.env()));
  });

  // checks response server status
  it("checks get response", () => {
    cy.request({
      method: "GET",
      url: `${url}/`,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.eq("Sever is running")
    });
  });
  
  //! checks create student
  /*
  it('should create a new student', () => {
    cy.request({
      method: 'PUT',
      url: `${url}/CreateStudent`,
      body: {
        student_id: "100100",
        first_name: "Cypress",
        last_name: "Testing",
        email: "cypress.testing@example.com",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("student_id", "100100");
      expect(response.body).to.have.property("first_name", "Cypress");
      expect(response.body).to.have.property("last_name", "Testing");
      expect(response.body).to.have.property("email", "cypress.testing@example.com");
    });
  });
  */

  // check query all students
  it('should query all students', () => {
    cy.request({
      method: 'GET',
      url: `${url}/QueryStudents`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  // check query student by ID
  it('should query a student by ID', () => {
    cy.request({
      method: 'GET',
      url: `${url}/QueryStudentByID`,
      qs: { student_id: '100100' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("student_id", "100100",);
    });
  });

  // check update student by ID
  it('should update a student', () => {
    cy.request({
      method: 'PUT',
      url: `${url}/UpdateStudent`,
      body: {
        student_id: '100100',
        first_name: 'Cypress',
        last_name: 'TestingUpdate',
        email: 'Cypress.TestingUpdate@example.com',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("student_id", "100100");
      expect(response.body).to.have.property("first_name", "Cypress");
      expect(response.body).to.have.property("last_name", "TestingUpdate");
      expect(response.body).to.have.property("email", "Cypress.TestingUpdate@example.com");
    });
  });

  //! check delete student by ID
  /*
  it('should delete a student', () => {
    cy.request({
      method: 'DELETE',
      url: `${url}/DeleteStudent`,
      qs: { student_id: '100100' },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Student deleted successfully');
    });
  });
  */

  //! check upload multiple students
  /*
  it('should upload students via CSV', () => {
    const filePath = 'students.csv';

    cy.fixture(filePath).then(fileContent => {
      const formData = new FormData();
      formData.append('file', new Blob([fileContent], { type: 'text/csv' }), filePath);

      cy.request({
        method: 'PUT',
        url: `${url}/MultiCreateStudent`,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      }).then(response => {
        expect(response.status).to.eq(200);
      });
    });
  });
  */
})

