//Reusable autocomplete which gets config from index file

const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData}) => { //Pass in configuration object, destructure properties using { }
    
//Can also be added to HTML but wanted autocomplete to be standalone (Important: Is using BULMA)
    root.innerHTML = `
        <input class="input"  />
        <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
        </div>
  `;

//Instead of looking within the document for the elements, look within the root (root.innerHTML)
  const input = root.querySelector('input')
  const dropdown = root.querySelector('.dropdown')
  const resultsWrapper = root.querySelector('.results')

  
//REMEMBER: fetchData is an async function so must add 'await' and 'async' keywords
const onInput = async event => {
    const items = await fetchData(event.target.value) 
    console.log(items)


    //If no items are found, close dropdown
    if (!items.length) {
        dropdown.classList.remove('is-active');
        return;
    }
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    
    //Loop through items to display content
    for (let item of items) {
        const aOption = document.createElement('a')

        aOption.classList.add('dropdown-item');
        aOption.innerHTML = renderOption(item)

        aOption.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value = inputValue(item) //Extract input.value out of autocomplete and make the value changeable
            onOptionSelect(item);

        });

        resultsWrapper.appendChild(aOption)
    }
};

input.addEventListener('input', debounce(onInput, 500));

//Closes dropdown if user clicks outside root element
document.addEventListener('click', event => {
    if (!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
  });
};

