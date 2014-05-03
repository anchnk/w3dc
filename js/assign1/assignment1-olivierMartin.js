var drumsKit = [{
  id: 0,
  name : 'drum1',
  sources : ['/local/sounds/a.wav', '/local/sounds/a.mp3'],
  color : '#1478AA',
  key : 'Q'
}, {
  id : 1,
  name : 'drum2',
  sources : ['http://www.w3c.com/demo/sample.mp3'],
  color : 'blue',
  key : 'W'
}, {
  id : 6,
  name : 'drum7',
  sources : ['/local/sounds/drum/d3.ogg'],
  color : 'red',
  key : 'E'
}, {
  id: 3,
  name : 'drum4',
  sources : ['http://www.w3c.com/demo/d4.ogg', 'http://www.w3c.com/demo/d4.mp3'],
  color : 'blue',
  key : 'R'
}];

/*****************************************************************
 *  Called after array manipulations in order to 
 *  restore the initial state of the array
 *  Any feedback for a more elegant or efficient way would be
 *  appreciated
 ****************************************************************/
function restoreDrumKitState() {
  'use strict';

  drumsKit = [{
    id: 0,
    name : 'drum1',
    sources : ['/local/sounds/a.wav', '/local/sounds/a.mp3'],
    color : '#1478AA',
    key : 'Q'
  }, {
    id : 1,
    name : 'drum2',
    sources : ['http://www.w3c.com/demo/sample.mp3'],
    color : 'blue',
    key : 'W'
  }, {
    id : 6,
    name : 'drum7',
    sources : ['/local/sounds/drum/d3.ogg'],
    color : 'red',
    key : 'E'
  }, {
    id: 3,
    name : 'drum4',
    sources : ['http://www.w3c.com/demo/d4.ogg', 'http://www.w3c.com/demo/d4.mp3'],
    color : 'blue',
    key : 'R'
  }];
}

/******************************************************************
 *                            UTILS
 *  ---------------------------------------------------------------
 *  Used to format output in order to visualize tests easily.
 *  Use eval (which is evil) but as it's an exercice and it's a 
 *  suited use case for using it i choosed to stick that way.
 *  If there's a way to avoid using eval any feedback would be 
 *  great
 *
 ******************************************************************/
var utils = {
  separator: '',
  firstRun: true,
  // this function is run once in order to build title separator
  buildSeparator: function () {
    var cnt;
    for (cnt = 0; cnt < 64; cnt++) {
      this.separator += '-';
    }
  },

  printSection: function (s) {
    'use strict';

    var i = 0,
      spaces = ' ',
      spacesLength;

    // Run this loop only once at object creation
    if (this.firstRun) {
      this.buildSeparator();
      this.firstRun = false;
    }

    // Center the section title according to it's length
    spacesLength = Math.floor((this.separator.length / 2) - (s.length / 2));

    while (i < spacesLength) {
      spaces += ' ';
      i++;
    }
    // print title section
    console.log(this.separator);
    console.log(spaces + s);
    console.log(this.separator);
  },

  printAndEval : function (s) {
    'use strict';
    // print the test run and the results
    console.log('Test:' + '\n' + '> ' + s + ';\n');
    console.log('Returns:');
    console.log(eval(s));
    console.log('\n');
  }
};

/******************************************************************
 *                            PART 1
 ******************************************************************/

// A – findBy
utils.printSection('A – findBy');

/*****************************************************************
 *  function findBy(originArray, testedProperty, testedPropValue);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - originArray: (array) an array filled with objects.
 *    - testedProperty: (string) the name of a property. 
 *    - testedPropValue: (anything) the property value
 *  
 *  returns: 
 *    - (array) an array of matching array's elements
 *
 ****************************************************************/
function findBy(originArray, testedProperty, testedPropValue) {
  'use strict';
  var i, kit, localArray = [];

  // Loop on each object 
  for (i = 0; i < originArray.length; i++) {
    kit = originArray[i];
    if (kit.hasOwnProperty(testedProperty)) {
      if (testedPropValue === kit[testedProperty]) {
        localArray.push(kit);
      }
    }
  }
  return localArray;
}

utils.printAndEval("findBy(drumsKit, 'id', 1)");
utils.printAndEval("findBy(drumsKit, 'color', 'blue')");
utils.printAndEval("findBy(drumsKit, 'color', 'pink')");


// B – SORT part 1
utils.printSection('B – Sort, part 1');

/*****************************************************************
 *  function compareById(obj1, obj2);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - obj1: (object) first object to be compared with obj2 id.
 *    - obj2: (object) second object to be compared with obj1 id.
 *  
 *  returns: 
 *    - (number) a number which can be interpreted by array sort()
 *      method.
 * 
 *  This function needs to be passed as a callback to array sort 
 *  method.
 *
 ****************************************************************/
function compareById(obj1, obj2) {
  'use strict';

  if (obj1.id > obj2.id) {
    return 1;
  }
  if (obj1.id < obj2.id) {
    return -1;
  }
  return 0;
}


utils.printAndEval('drumsKit.sort(compareById)');
restoreDrumKitState();


// B – SORT part 2
utils.printSection('B – Sort, part 2');

/*****************************************************************
 *  function compareByString(str1, str2);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - str1: (string) first string to be compared with str2
 *    - str2: (string) second string to be compared with str1
 *  
 *  returns: 
 *    - (number) a number which can be interpreted by array sort()
 *      method.
 * 
 *  This function needs to be passed as a callback to array sort 
 *  method, case doesn't matter and the result is always sorted 
 *  according to the ABC.
 *
 ****************************************************************/
function compareByString(str1, str2) {
  var localStr1, localStr2;

  localStr1 = str1.toLowerCase();
  localStr2 = str2.toLowerCase();

  if (localStr1 > localStr2) {
    return 1;
  }
  if (localStr1 < localStr2) {
    return -1;
  }
  return 0;
}

/*****************************************************************
 *  function getComparator(objProperty);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - objProperty: (string) the name of an object property 
 *  
 *  returns: 
 *    - (function) a comparator function. 
 * 
 *  This function needs to be passed as a callback to array sort 
 *  method. It only works if the property value is a number or a 
 *  string.
 *
 ****************************************************************/
function getComparator(objProperty) {
  'use strict';

  var comparator;

  comparator =  function (a, b) {
    a = a[objProperty];
    b = b[objProperty];
    return (typeof a === "number" && typeof b === "number" ? compareById : compareByString)(a, b);
  };

  return comparator;

}


var compareByName;
compareByName = getComparator('name');

utils.printAndEval("drumsKit.sort(compareByName)");
restoreDrumKitState();

var compareByColor;
compareByColor = getComparator('color');

utils.printAndEval("drumsKit.sort(compareByColor)");
restoreDrumKitState();


/******************************************************************
 *                            PART 2
 ******************************************************************/

// A – Constructor
utils.printSection('A – Constructor');

// Drum constructor function
function Drum(name, sources, color, key) {
  this.id = null;
  this.name = name;
  this.sources = sources;
  this.color = color;
  this.key = key;
}

var myDrum;
utils.printAndEval("myDrum = new Drum('drum8', ['~/sound/d1.ogg'], 'violet', 'L')");

// B – Add an object to the drumsKit array
utils.printSection('B – Add an object to the drumsKit array');

/*****************************************************************
 *  function addItem(arr, obj);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - arr: (array) array of objects
 *    - obj: (object) an object to be added to the array
 *  
 *  returns: 
 *    - (array) new array with the object passed as parameters added
 *      
 *  This function will generated the id property automatically to 
 *  ensure it's unique and increment it sequentially. It also set
 *  the property writable to false to prevent user to modify id.
 *
 ****************************************************************/
function addItem(arr, obj) {
  'use strict';

  var sortedArray, maxId, lastobjIndex;

  sortedArray = arr.sort(compareById);
  lastobjIndex = sortedArray.length - 1;
  // maxId is equal to the last id of the sorted array which is
  // the highest one as the array is sorted according to objects'
  // id
  maxId = sortedArray[lastobjIndex].id;
  maxId += 1;
  //obj.id = maxId; // simple way
  // Another variant with descriptor for id property
  Object.defineProperty(obj, 'id', {value: maxId, writable: false, enumerable: true});
  return arr.push(obj);
}

addItem(drumsKit, myDrum);
utils.printAndEval("drumsKit");


// C – Remove an object from the array, part 1
utils.printSection('C – Remove an object from the array, part 1');

/*****************************************************************
 *  function removeObject(arr, obj);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - arr: (array) array of objects
 *    - obj: (object) an object to be added to the array
 *  
 *  returns: 
 *    - (array) new array with the object passed as parameters 
 *      removed
 *      
 * 
 *  This function will remove the object passed as a parameter from
 *  the array.
 *
 ****************************************************************/
function removeByObject(arr, obj) {
  'use strict';

  var i;

  for (i = 0; i < arr.length; i++) {
    if (arr[i] === obj) {
      // remove the item at current index i and only that one 
      arr.splice(i, 1);
      return arr;
    }
  }
}

utils.printAndEval('removeByObject(drumsKit, drumsKit[drumsKit.length-1])');
restoreDrumKitState();

// C — Remove an object from the array, part 2
utils.printSection('C – Remove an object from the array, part 2');

/*****************************************************************
 *  function removeById(arr, n);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - arr: (array) array of objects
 *    - n: (number) the id of the object we want to remove
 *  
 *  returns: 
 *    - (array) new array with the object which id passed as 
 *    parameters removed from it
 *      
 * 
 *
 ****************************************************************/
function removeById(arr, n) {
  'use strict';

  var index;

  // another variant from iterating on an array
  // was used in order to test different ways of doing it.
  // a traditionnal loop would have worked the same.
  arr.forEach(function (element, i) {
    if (element.id === n) {
      index = i;
    }
  });

  arr.splice(index, 1);
  return arr;
}

utils.printAndEval('removeById(drumsKit, 3)');
restoreDrumKitState();


// C — Remove an object from the array, part 3
utils.printSection('C – Remove an object from the array, part 3');

/*****************************************************************
 *  function remove(arr, numOrObj);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - arr: (array) array of objects
 *    - numOrObj: (number or object) remove objects either using
 *    id or object equality. 
 *  
 *  returns: 
 *    - (array) new array with the object or object matching id 
 *    as parameter removed from it
 *      
 * 
 *
 ****************************************************************/
function remove(arr, numOrObj) {
  // ternary operator variant
  return (typeof numOrObj === 'number') ? removeById(arr, numOrObj) : removeByObject(arr, numOrObj);
}

utils.printAndEval('remove(drumsKit,1)');
utils.printAndEval('remove(drumsKit, drumsKit[1])');
restoreDrumKitState();

/******************************************************************
 *                            PART 3
 ******************************************************************/


// A – Get Directory
utils.printSection('A — Get Directory');

/*****************************************************************
 *  function getDirectory(fullPath);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - fullPath: (string) a string representing a file path
 *  
 *  returns: 
 *    - (string) the path of the object with file name removed 
 *    from it.
 *      
 ****************************************************************/
function getDirectory(fullPath) {
  'use strict';

  var path, lastSlashIndex;

  // Variant 1 – Strings instance methods

  // Get index of last path separator
  lastSlashIndex = fullPath.lastIndexOf('/');

  // Include the / in the path as substring exclude the second
  // argument when called
  lastSlashIndex += 1;

  path = fullPath.substring(0, lastSlashIndex);
  return path;

}

utils.printAndEval("getDirectory('/local/sounds/a.wav')");

// B – Get Filename
utils.printSection('B — Get Filename');

/*****************************************************************
 *  function getFilename(fullPath);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - fullPath: (string) a string representing a file path
 *  
 *  returns: 
 *    - (string) the name of the file with extension
 *      
 ****************************************************************/
function getFilename(fullPath) {
  'use strict';


  // var fileName, lastSlashIndex;

  // // Variant 1 – Strings instance methods
  // // Get index of last path separator
  // lastSlashIndex = fullPath.lastIndexOf('/');

  // // Increment from 1 to get filename first letter's index
  // lastSlashIndex += 1;


  // fileName = fullPath.substring(lastSlashIndex);
  // return fileName;

  // Variant 2 – Regular expressions
  // Return an array [fullname, path, filename]
  var regResult;
  var reg = new RegExp('^(.+)/([^/]+)$', 'i');
  regResult = reg.exec(fullPath);
  return regResult.pop();
}

utils.printAndEval("getFilename('/local/sounds/a.wav');");

// C – Format Object
utils.printSection('C – Format Object');

/*****************************************************************
 *  function formatObject(obj);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - obj: (object) an object with a sources property
 *  
 *  returns: 
 *    - (object) the object with a new property url which is an
 *    object with two properties filenames and path, the original 
 *    sources property is deleted from the input object
 *      
 ****************************************************************/
function formatObject(obj) {
  'use strict';

  var fileName, i, sourceFullPath;

   // if no sources property is found exit the function
  //  returning the object passed as input
  if(!obj.hasOwnProperty('sources')){ return obj;}
  
  obj.url = {filenames: [], path: ''};

  // Only one path per obj
  obj.url.path = getDirectory(obj.sources[0]);

  for (i = 0; i < obj.sources.length; i++) {
    sourceFullPath = obj.sources[i];
    fileName = getFilename(sourceFullPath);
    obj.url.filenames.push(fileName);
  }

  delete obj.sources;
  return obj;
}

var drum1 = {
  id: 0,
  name: 'drum1',
  sources: ['/local/sounds/a.wav', '/local/sounds/a.mp3'],
  color: '#1478AA',
  key: 'Q'
};

utils.printAndEval("formatObject(drum1);");
utils.printAndEval("formatObject({id:2})");
// C – Format Array
utils.printSection('C – Format Array');

/*****************************************************************
 *  function formatArray(arr);
 *  ---------------------------------------------------------------
 *
 *  parameters:
 *    - arr: (array) an array to be formated using the formatObject
 *    function above.
 *  
 *  returns: 
 *    - (array) the modified array after being proceed by 
 *   formatObject function which means each object will contains
 *   url property object and no more sources property.
 *      
 ****************************************************************/
function formatArray(arr) {
  'use strict';

  var index = 0;

  while (index < arr.length) {
    formatObject(arr[index]);
    index++;
  }

  return arr;
}

utils.printAndEval("formatArray(drumsKit);");