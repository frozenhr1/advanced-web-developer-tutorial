var earth = {
    isRound: true,
    numberFromSun: 3,
    direktor: 'borna'
}

/*
    usefull written tutorial : https://evanhahn.com/how-do-i-jasmine/
                             : https://blog.codeship.com/jasmine-spyon/

    toBe / not.toBe IS CALLED A 'matcher' (it uses === to check the result)
    THERE ARE PLENTY 'matchers' IN JASMINE LIKE:
    toBeCloseTo
    toBeDefined
    toBeFalsey / toBeTruthy
    toBeGreatherThan / toBeLessThan
    toContain
    toEqual (usefull to compare objects and arrays and values of objects and arrays)
    jasmine.any() checks the type of the element
    jasmine.objectContaining check if the object contains something

    var arr1 = [1,2,3];
    var arr2 = [1,2,3];
    var arr3 = arr1;
    console.log(arr1 === arr2); // returns false because they have same values but the reference in the memory is not the same
    console.log(arr1 === arr3); // returns true because the reference in the memory is the same

*/



describe('Earth',function(){
    it('is round',function(){
        expect(earth.isRound).toBe(true);
    });
    it('is the third planet from the sun',function(){
        expect(earth.numberFromSun).toBe(3);
    });
    it('borna je direktor planeta zemlje',function(){
        expect(earth.direktor).toBe('borna');
    });
});


describe("Jasmine Matchers", function() {
    it("allows for === and deep equality", function() {
        expect(1+1).toBe(2);
        expect([1,2,3]).toEqual([1,2,3]);
    });
    it("allows for easy precision checking", function() {
        expect(3.1415).toBeCloseTo(3.14,2);
    });
    it("allows for easy truthy / falsey checking", function() {
        expect(0).toBeFalsy();
        expect([]).toBeTruthy();
    });
    it("allows for easy type checking", function() {
        expect([]).toEqual(jasmine.any(Array));
        expect(function(){}).toEqual(jasmine.any(Function));
    });
    it("allows for checking contents of an object", function() {
        expect([1,2,3]).toContain(1);
        expect({name:'Elie', job:'Instructor'}).toEqual(jasmine.objectContaining({name:'Elie'}));
    });
});

describe('#push',function(){
    var arr; // we define the variable here so the other callback functions can see the variable in their scope
    beforeEach(function(){ // runs before each callback
        arr = [1,3,5];
    })

    it('ads elements to an array',function(){
        arr.push(7);
        expect(arr).toEqual([1,3,5,7]);
    })
    it('returns new length of the array',function(){
        expect(arr.push(7)).toBe(4);
    })

})


//THIS TEST IS CALLED A TEAR DOWN TEST, USUALLY USED IN TESTING DATABSES
describe('counting',function(){
    var count = 0;

    beforeEach(function(){
        count++;
    });

    afterEach(function(){
        count = 0;
    });

    it("has a counter that increments",function(){
        expect(count).toBe(1);
    });
})

//DESCRIBE NESTING
describe('array',function(){
    var arr;
    beforeEach(function(){
        arr = [1,3,5];
    })

    describe('#unshift', function(){
        it('adds an element to the beggining of an array',function(){
            arr.unshift(17);
            expect(arr[0]).toBe(17); // we can more than one 'expect()' inside one 'it()'
        });
        it('returns the new length',function(){
            expect(arr.unshift(1000)).toBe(4);
        });
    });
    describe('#push',function(){
        it('adss elements to the end of an array',function(){
            arr.push(7);
            expect(arr[arr.length-1]).toBe(7);
        });
    });
})

//PENDING TESTING
describe("Pending specs", function(){

    xit("can start with an xit", function(){ // if we dont want to run a specific test we add x before it (xit)
        expect(true).toBe(true);
    });

    it("is a pending test if there is no callback function"); // if we dont want to run the specific test we dont add any expect()

    it("is pending if the pending function is invoked inside the callback", function(){
        expect(2).toBe(2);
        pending(); // if we dont want to run specific test we add pending();
    });
});

//SPIES : FAKING FUNCTIONS 
function add(a,b,c) {
    return a+b+c;
}

describe('add',function(){
    var addSpy, result;
    beforeEach(function(){
        addSpy = spyOn(window, 'add');
        result = addSpy(1,2,3);
    });
    it('value is called with proper parameters', function(){
        expect(addSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalledWith(1,2,3);
    });
});

describe('add',function(){
    var addSpy, result;
    beforeEach(function(){
        addSpy = spyOn(window, 'add').and.callThrough();
        result = addSpy(1,2,3);
    });
    it('value equals 6', function(){
        expect(result).toEqual(6);
    });
});
