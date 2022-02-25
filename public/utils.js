//Adding delayed search using setTimeout and Debounce helper function which 
//Stops function from being invoked until certain amount of time is passed

const debounce = (func, delay = 500) => { 
    let timeoutId
    
    return(...args) => { 
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        timeoutId = setTimeout(() => {
            //.apply function applies all the array of arguments passed (args) as separate arguments to the function
            func.apply(null, args); 
        }, delay)
    };
};
