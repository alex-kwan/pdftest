var should  = require('should');
var Tie = require('../models/tie.js');

module.exports = {
    'tie creation' : function ( test ){
    	var tie = new Tie.Tie({ name: "Winning"});
    	test.ok( null != tie , "the constructor doesnt work");
    	delete tie;
    	test.done();
    },
    
    'tie no votes': function( test ) {
    	var tie = new Tie.Tie();
    	test.ok( 0 == tie.get("ratings").length, "the array might be null");
    	delete tie;
    	test.done();
    },
    'tie vote': function( test ) {
    	var tie = new Tie.Tie({ name: "Winning"});
    	tie.vote( 1, 1 );
    	tie.vote( 1, 2 );
    	tie.vote( 2, 3 );
    	test.ok( 2 == tie.get("ratings").length, "Adding the ratings to the tie doesnt seem to work");
    	delete tie;
    	test.done();
    },
    
    'tie no average': function( test ) {
    	var tie = new Tie.Tie({});
    	test.ok( undefined == tie.average(), "NaN occured since / 0" );
    	delete tie;
    	test.done();
    },
    
    'tie average' : function( test ){
    	var tie = new Tie.Tie({ name: "Winning"});
    	tie.vote( 1, 2 );
    	tie.vote( 2, 3 );
    	test.ok( 2.5 == tie.average(), "There is a problem with dividing");
    	delete tie;
    	test.done();
    },
    
    'tie duplicate votes ' : function( test ){
    	var tie = new Tie.Tie();
    	tie.vote( 1, 2 );
    	tie.vote( 3, 5 );
    	tie.vote( 3, 7 );
    	
        test.ok( 4.5 == tie.average(), "There was an issue in handling revotes");
        delete(tie);
    	test.done();
    
    }
}
