
export default  function fileToObject(string) {
    // console.log('fileToObject function called');

    const array =  string.split('\r\n');
    // console.log('array:', array);
    let tempArray = [];
    const newArray = [];
    let pgnTrigger = false;
    let pgnString = 'PGN "';
    let endObjectTrigger = false;
    let counter = 0;
    let prefix;

     array.map( dataPoint  => {
        // console.log('dataPoint:', dataPoint);
        if (pgnTrigger && endObjectTrigger) {
            // console.log('ending create object sequence')
            pgnTrigger = false;
            endObjectTrigger = false;
             newArray.push(createObject(tempArray));
             counter++;
            // console.log(`${counter} object added to newArray`);
            tempArray = [];
        } else if (pgnTrigger && dataPoint === '') {
            // console.log('ending pgn sequence');
            endObjectTrigger = true;
            pgnString = pgnString + '"';
             tempArray.push(pgnString);
            // console.log('pgn string:', pgnString)
            pgnString = 'PGN "';
        } else if (pgnTrigger) {
            // console.log('adding to pgn string');
            pgnString = pgnString + prefix + dataPoint;
            prefix = ' ';
        } else if (dataPoint[0] === '[') {
            // console.log('adding to temp array:', dataPoint);
            let modifiedString = dataPoint;
            const breakPoint = dataPoint.indexOf(' ');
            if (dataPoint[breakPoint + 1] !== '"') {
                modifiedString =  modifiedString.slice(0, breakPoint+1) + '"' +  modifiedString.slice(breakPoint+1, modifiedString.length);
            };
            modifiedString =  modifiedString.replace('[', '');
            modifiedString =  modifiedString.replace(']', '');
            modifiedString =  modifiedString.replace('\\', '');
             tempArray.push(modifiedString);
        } else if (dataPoint === '') {
            // console.log('beginning pgn sequence');
            pgnTrigger = true;
            prefix = '';
        }
    })
    console.log('newArray:', newArray);
    return newArray;
}

 function createObject(array) {
    // console.log('array to modify:', array);

    const returnObject = {};
    for (let item of array) {
        const pair =  item.split(` "`);
        const key = pair[0]
        const value =  pair[1].slice(0, pair[1].length - 1);
        returnObject[key] = value;
    }
    // console.log('game object:', returnObject);
    return returnObject;
}