/****************************  
*
*	TESTING CONTROLLER  
*
*****************************/

describe('TodoController', function() {

	// Create private variable controller for all tests to use the same todo controller instance.
	// For all tests stick TodoController in parent scope for all child it() statements.
	var todoController;

	// Before each test (Jasmin function) we need to mock an Angular behavior u
	beforeEach(function() {
		// Use bard to instaniate app module 
		bard.appModule('app');
		// Use bard to inject to global scope in the tests, the controller object, $q object, rootscope object and the actual TodoFactory module. 
		bard.inject('$controller', '$q', '$rootScope', 'todoFactory');
	});

	// Before each of my tests...
	beforeEach(function() {
		// Mock behavior of the factory being passed into controller, stub behavior getAll function.
		// todoFactory is available because it was injected above into global scope, telling it to mock the getAll function, when this funciton is called instead of doing what it was really gonna to return a promise to return false data set. Because getAll returns a promise and not actual data, so must return a promised that returns false data, an array of empty objects. Are we getting 3 objects back?  
		sinon.stub(todoFactory, 'getAll').returns($q.when([{},{},{}]));
		// Stub out the rest of the functions.
		// When 'add' function is called, return a blank object, don't actually do http request.
		sinon.stub(todoFactory, 'add').returns($q.when({}));
		// Stub 'remove' function to return an empty promise when it resolves.
		sinon.stub(todoFactory, 'remove').returns($q.when());

		// Instaniate var TodoController using $controller to create a fake controller.
		// Making a mock controller to work with here.
		// Because we todoFactory how to behave, when that controller is instaniated it will grab fake version of angular factory subsystem.
		todoController = $controller('TodoController');

		// Run the Angular digest cylcle for MCV communication
		$rootScope.$apply();
	});


	// Verify there are no outstnading http requests before the testa run.
	// Wait for http requests to finish before controller loads, which gets data from server. 
	bard.verifyNoOutstandingHttpRequests();

	// Describe Controll testing function within main describe function
	describe('controller', function() {
		
		it('should be created successfully', function() {
			// Check to see if the todoController was created successfully 
			// No tests will work unless controller is working.
			expect(todoController).toBeDefined();
		});

		// When controller first loads, getAllTodos() is called on line 23 in todo.controller.js
		describe('after getAllTodos is called', function(){
			// Controller (it) should have 3 todos in the array from the 3 todo objects called automatically.
			it('should have 3 todos in the array', function() {
				expect(todoController.todos.length).toEqual(3);
			});

		});
		
		// Unit test for the addTodo() 
		describe('after adding a todo', function(){
			it('should have 4 todos in the array', function() {
				//
				todoController.blankTodo.name = 'Fake todo';
				todoController.blankTodo.priority = 1;
				todoController.addTodo();	

                // Global object injected w/bard (line38), triggers digest cylce updating the controller.
				// Run the Angular digest cylcle for MCV communication
				$rootScope.$apply();

                expect(todoController.todos.length).toEqual(4);
                expect(todoController.blankTodo === {});			
			});
		});	// Unit test for the addTodo() 

		// Unit test for the removeTodo()
		describe('after deleting a todo and user confirms deletion', function() {
			it('should have 2 todos in the array', sinon.test(function() {
				// Turn off confirm pop dialgue window, behavior is now mocked with sinon.stub()
	            this.stub(window, 'confirm').returns(true);

				// This test will call todoController.removeTodo and pass in a blank object.
				todoController.removeTodo({});

                // Global object injected w/bard (line38), triggers digest cylce updating the controller.
				// Run the Angular digest cylcle for MCV communication
				$rootScope.$apply();

				// Every unit test is a different situation, brand new controller instance, hence it equals 2
				expect(todoController.todos.length).toEqual(2);
			}));


		    it('should have 3 todos in the array if user cancels deletions', sinon.test(function() {
			    // Turn back on confirm pop dialgue window, mocking behavior with sinon.stub()
	            this.stub(window, 'confirm').returns(false);

	            todoController.removeTodo({});

	            // Global object injected w/bard (line38), triggers digest cylce updating the controller.
				// Run the Angular digest cylcle for MCV communication
	            $rootScope.$apply();

	            expect(todoController.todos.length).toEqual(3);
            }));
		});	// Unit test for the removeTodo()

		// Unit test for the getAllTodo()
        // describe('after updating a todo', function() {
        //     it('should no longer be an editable todo', function() {
        //         var editTodo = {edit: true};
        //         todoController.updateTodo(editTodo);
                
                // Global object injected w/bard (line38), triggers digest cylce updating the controller.
				// Run the Angular digest cylcle for MCV communication
                // $rootScope.$apply();

                // expect(editTodo.edit).toEqual(false);
    //        });	// Unit test for the getAllTodo()

    //    });	// Unit test for the getAllTodo()

	});	// Describe Controll testing function within main describe function	  	

});	// Main describe function