/****************************  
*
*	TESTING FACTORY
*
*****************************/


describe('todoFactory', function() {

	beforeEach(function() {
		bard.appModule('app');
		// $httpBackend allows fake http requests when this  URL is called, return this data.
		bard.inject('todoFactory', 'apiUrl', '$httpBackend'); 
	});



  ////////////////	Unit test for the getAll()   ////////////////

	describe('when getAll is called', function() {
		it('should return data on success', function() {
			// Return a fake 'response' object to confirm success.
			var response = {
				data: [{}],
			}; 

			// Whent his apiURL is called (a global value in app.module) respond with 'response'
			$httpBackend.whenGET(apiUrl + '/todos').respond(response);

			// 
            todoFactory.getAll().then(function(data) {
                expect(data.length).toEqual(1);
            }, function(error) {
                expect(1).toEqual(2);
            });


		});

		it('should return error on http fail', function () {
			// Whent his apiURL is called (a global value in app.module) respond with '500 - page now found'
			$httpBackend.whenGET(apiUrl + '/todos').respond(500);

			todoFactory.getAll().then(
				function(data) {
					expect(1).toBe(2);
				},
				function(error) {
					expect(error).toBeDefined();
				}
			);
		});
	});



  ////////////////  Unit test for the add()   ////////////////

   describe('when add is called', function() {
        it('should return data on success', function() {
			// Return a fake server 'response' object to confirm success.
            var response = {
                data: [{}],
            };

			// Whent his apiURL is called (a global value in app.module) respond with 'response'
            $httpBackend.whenPOST(apiUrl + '/todos').respond(response);

            todoFactory.getAll().then(function(data) {
                expect(data.length).toEqual(1);
            }, function(error) {
                expect(1).toEqual(2);
            });
        });

        it('should return error on fail', function() {
			// Whent his apiURL is called (a global value in app.module) respond with '500 - page now found' 
            $httpBackend.whenPOST(apiUrl + '/todos').respond(500);

            todoFactory.getAll().then(
                function(data) {
                    expect(1).toBe(2);
                },
                function(error) {
                    expect(error).toBeDefined();
                }
            );
        });
    });

  

  ////////////////  Unit test for getById() ////////////////

	// Unit test for the getById()
   describe('when getById is called', function() {
        // Return a fake 'id' object of '1'.
        var id = 1;

        it('should return data on success', function() {
            // Return a fake 'response' object to confirm to success.
            var response = {
                data: [{}]
            };

			// Whent his apiURL is called (a global value in app.module) respond with 'response'
            $httpBackend.whenGET(apiUrl + '/todos/' + id).respond(response);

            todoFactory.getById(id).then(function(data) {
                expect(data.length).toEqual(1);
            }, function(error) {
                expect(1).toEqual(2);
            });
        });

        it('should return error on fail', function() {
 			// Whent his apiURL is called (a global value in app.module) respond with '500 - page now found' 
            $httpBackend.whenGET(apiUrl + '/todos/' + id).respond(500);

            todoFactory.getById(id).then(
                function(data) {
                    expect(1).toBe(2);
                },
                function(error) {
                    expect(error).toBeDefined();
                }
            );
        });
    });



  ////////////////  Unit test for update() ////////////////

	// Unit test for the update()
	describe('when update is called', function() {
		// Return a fake 'todo' response object with two properties: name and todoId
        var updated = {
            name: 'testData',
            todoId: 1
        };

        it('should return data on success', function() {
        	// Return a fake 'response' object to confirm success.
            var response = {
                data: [{}],
            };

			// Whent his apiURL is called (a global value in app.module) respond with 'response'
            $httpBackend.whenPUT(apiUrl + '/todos/' + updated.todoId).respond(response);

            todoFactory.update(updated).then(function(data) {
                expect(data.length).toEqual(1);
            }, function(error) {
                expect(1).toEqual(2);
            });
        });

        it('should return error on fail', function() {
			// Whent his apiURL is called (a global value in app.module) respond with '500 - page now found' 
            $httpBackend.whenPUT(apiUrl + '/todos/' + updated.todoId).respond(500);

            todoFactory.update(updated).then(
                function(data) {
                    expect(1).toBe(2);
                },
                function(error) {
                    expect(error).toBeDefined();
                }
            );
        });
    });


  ////////////////  Unit test for remove() ////////////////

	// Unit test for the remove()
	describe('when remove is called', function() {
       // Return a fake 'removed' object with fake.
	    var deleteTodo = {
	        name: 'testData',
	        todoId: 1
	    };

        it('should return data on success', function() {
            // Return a fake 'response' object to confirm to success.
            var response = {
                data: [{}]
            };

            // Whent his apiURL is called (a global value in app.module) respond with 'response'
            $httpBackend.whenDELETE(apiUrl + '/todos/' + deleteTodo.todoId).respond(response);

            todoFactory.update(deleteTodo).then(function(data) {
                expect(data.length).toEqual(1);
            }, function(error) {
                expect(1).toEqual(2);
            });
		});

        it('should return error on fail', function() {
		// Whent his apiURL is called (a global value in app.module) respond with '500 - page now found' 
        $httpBackend.whenDELETE(apiUrl + '/todos/' + deleteTodo.todoId).respond(500);

        todoFactory.update(deleteTodo).then(
            function(data) {
                expect(1).toBe(2);
            },
            function(error) {
                expect(error).toBeDefined();
            }
        );
    	});
    });
});