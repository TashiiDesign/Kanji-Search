//Autocomplete config object for autocomplete.js

//Should contain: 
//Function to find Kanji = fetchData()
//Function that knows how to render a singular Kanji = renderOption()
//Function which envokes when user clicks an option (kanji) = onOptionSelect()
//Element that the autocomplete should be rendered into = root

createAutocomplete({
    root: document.querySelector('.autocomplete'),
    
    //Generate HTML and return 

    renderOption(data) {

        console.log(data.kanji.character)
        return `${data.kanji.character} (${data.kanji.stroke})`

        
    },
    onOptionSelect(data) {
        onKanjiSelect(data)
    }, 
    inputValue(data) { 
        return data.kanji.character; //Adds the clicked option value into the input 
    }, 

    //Passing fetchData as an argument into createAutocomplete
    //Any network request must be async and have to wait to get a response i.e. 'await' keyword
    //axios.get("") Add link to information want to retreive
    //Retreives a 'response' object which contains the data

    async fetchData(searchValue) {
        try {
            const response = await axios.get(`https://kanjialive-api.p.rapidapi.com/api/public/search/${searchValue}`, {
            //Axios allows for neater code
            headers: {
                'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com',
                'x-rapidapi-key': '56fcdf38a6msh26410d7bfce9dd4p11ba71jsn6fdddfca186b'
              }
        });

            const data = response.data

            return data;
        
        //If API returns an error 
        //How to handle errors with axios => https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253

        } catch (error) {
            // Error 😨
            if (error.response) {
                /*
                * The request was made and the server responded with a
                * status code that falls out of the range of 2xx
                */
                console.log(error.response.data.message);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                /*
                * The request was made but no response was received, `error.request`
                * is an instance of XMLHttpRequest in the browser and an instance
                * of http.ClientRequest in Node.js
                */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            
            return [];
        }        
       
    }
})


//Follow up request for more information on specific movie clicked

const onKanjiSelect = async (data) => { //Pass in data
    const response = await axios.get(`https://kanjialive-api.p.rapidapi.com/api/public/kanji/${data.kanji.character}`, {

      headers: {
        'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com',
        'x-rapidapi-key': '56fcdf38a6msh26410d7bfce9dd4p11ba71jsn6fdddfca186b'
        }
    });
    
    // const kanjiDetail = response.data
    // console.log(kanjiDetail)

    document.querySelector('.kanjiInfo').innerHTML  = getInformation(response.data)
    console.log(response.data)

    // return kanjiDetail;

}

const getInformation = (kanjiDetail, image) => {

    const kanjiInfo = kanjiDetail.kanji
    document.querySelector('.kanjiInfo').classList.remove('hidden')


    return `
        <div class="kanjiCol">
            <div class="kanji border-2 border-black p-8 flex justify-center">
            <img src="${kanjiInfo.video.poster}" />
            </div>
            <p class="flex justify-center p-4 font-medium text-lg">Strokes: ${kanjiInfo.strokes.count}</p>
        </div>

        <div class="infoCol ml-8">
            <h4 class="meaning text-xl pt-5">Meaning: ${kanjiInfo.meaning.english}</h4>
            <h4 class="onyomi text-xl pt-5">Onyomi: ${kanjiInfo.onyomi.katakana}</h4>
            <p class="romaji text-md italic ">romaji: ${kanjiInfo.onyomi.romaji}</p>
            <h4 class="kunyomi text-xl pt-5">Kunyomi: ${kanjiInfo.kunyomi.hiragana} </h4>
            <p class="romaji text-md italic ">romaji: ${kanjiInfo.kunyomi.romaji}</p>

            <div class="divide-y my-12 border-t-2 border-black"></div>
                <p class="examples text-md font-medium" >Examples of use: </p>
                <h4 class="meaning text-xl pt-5">${kanjiDetail.examples[0].japanese}</h4>
                <p class="meaning text-md italic ">${kanjiDetail.examples[0].meaning.english}</p>
                <h4 class="meaning text-xl pt-5">${kanjiDetail.examples[1].japanese}</h4>
                <p class="meaning text-md italic ">${kanjiDetail.examples[1].meaning.english}</p>

        </div>

    `
    
}






