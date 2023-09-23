let speciesTrigger = false;
let speciesValue;
let genderTrigger = false
let statusTrigger
let nameTrigger
let form
function getCharacterPage(page) {
    let src = `https://rickandmortyapi.com/api/character?page=${page}`;
    if (speciesTrigger == true) {
        src = `https://rickandmortyapi.com/api/character?page=${page}&species=${speciesValue}`
        console.log(speciesValue);
    }
    if (genderTrigger == true) {
        src = `https://rickandmortyapi.com/api/character?page=${page}&gender=${genderValue}`
        console.log(genderValue);
    }
    else if (genderTrigger == true) {
        src = `https://rickandmortyapi.com/api/character?page=${page}&status=${statusValue}`
        console.log(statusValue);
    }
    else if (statusTrigger == true) {
        src = `https://rickandmortyapi.com/api/character?page=${page}&name=${nameValue}`
        console.log(nameValue);
    }
    fetch(src)
        .then(res => res.json())
        .then(data => {
            console.log(data)



            $('.characterContainer').empty();
            for (let el of data.results) {
                const characterItem = $(`
                    <div class='characterItem'>
                        <h3>${el.name}</h3>
                        <img src="${el.image}" alt="character">
                        <p><b>Gender: </b>${el.gender}</p>
                        <button class="moreBtn" id="${el.id}">More</button>
                    </div>`);

                characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));

                $('.characterContainer').append(characterItem);
            }
        });
}

function displayCharacterDetails(characterId) {
    // alert(characterId);
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(res => res.json())
        .then(characterData => {
            console.log('Character Details:', characterData);


            $('.popupContainer').append(`
                <img src='${characterData.image}'>
                <div>${characterData.name}</div>
                 <div>${characterData.status}</div>
            <div>${characterData.species}</div>
                <div>${characterData.origin.name}</div>
                 <div>${characterData.location.name}</div>`);

            $('.popup').css('display', 'flex');
        });


}
$('.fa-xmark').click(function(){
    $('.popupContainer').empty()
    $('.popup').css('display', 'none');
})

let currentPage = 1;
getCharacterPage(currentPage);

$('#nextBtn').click(function () {
    if (currentPage < 41) {
        currentPage++;
        getCharacterPage(currentPage);
        $('#pageNumber').text(currentPage);
    }
});

$('#prewBtn').click(function () {
    if (currentPage >= 2) {
        currentPage--;
        getCharacterPage(currentPage);
        $('#pageNumber').text(currentPage);
    }
});




function getAllCharacters(species, mode) {
                fetch(`https://rickandmortyapi.com/api/character/?${mode}=${species}`)
                .then(res => res.json())
                .then(data => {
        
                    for (let el of data.results) {
                        const characterItem = $(`
                            <div class='characterItem'>
                                <h3>${el.name}</h3>
                                <img src="${el.image}" alt="character">
                                <p><b>Gender: </b>${el.gender}</p>
                                <button class="moreBtn" id="${el.id}">More</button>
                            </div>`);
        
                        characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));
        
                        $('.characterContainer').append(characterItem);
                    }
                });
            
    }


    // function getAllGenders(species) {
    //     fetch(`https://rickandmortyapi.com/api/character/?gender=${species}`)
    //     .then(res => res.json())
    //     .then(data => {

    //         for (let el of data.results) {
    //             const characterItem = $(`
    //                 <div class='characterItem'>
    //                     <h3>${el.name}</h3>
    //                     <img src="${el.image}" alt="character">
    //                     <p><b>Gender: </b>${el.gender}</p>
    //                     <button class="moreBtn" id="${el.id}">More</button>
    //                 </div>`);

    //             characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));

    //             $('.characterContainer').append(characterItem);
    //         }
    //     });
    
    // }

    // else if(form == 'gender'){
    //     fetch(`https://rickandmortyapi.com/api/character/?gender=${species}`)
    //     .then(res => res.json())
    //     .then(data => {

    //         for (let el of data.results) {
    //             const characterItem = $(`
    //                 <div class='characterItem'>
    //                     <h3>${el.name}</h3>
    //                     <img src="${el.image}" alt="character">
    //                     <p><b>Gender: </b>${el.gender}</p>
    //                     <button class="moreBtn" id="${el.id}">More</button>
    //                 </div>`);

    //             characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));

    //             $('.characterContainer').append(characterItem);
    //         }
    //     });

    // }




// function getAllCharactersStat(status) {


//     fetch(`https://rickandmortyapi.com/api/character/?status=${status}}`)
//         .then(res => res.json())
//         .then(data => {

//             for (let el of data.results) {
//                 const characterItem = $(`
//                     <div class='characterItem'>
//                         <h3>${el.name}</h3>
//                         <img src="${el.image}" alt="character">
//                         <p><b>Gender: </b>${el.gender}</p>
//                         <button class="moreBtn" id="${el.id}">More</button>
//                     </div>`);

//                 characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));

//                 $('.characterContainer').append(characterItem);
//             }
//         });


// }

// function getAllCharactersName(name) {


//     fetch(`https://rickandmortyapi.com/api/character/?name=${name}}`)
//         .then(res => res.json())
//         .then(data => {

//             for (let el of data.results) {
//                 const characterItem = $(`
//                     <div class='characterItem'>
//                         <h3>${el.name}</h3>
//                         <img src="${el.image}" alt="character">
//                         <p><b>Gender: </b>${el.gender}</p>
//                         <button class="moreBtn" id="${el.id}">More</button>
//                     </div>`);

//                 characterItem.find('.moreBtn').click(() => displayCharacterDetails(el.id));

//                 $('.characterContainer').append(characterItem);
//             }
//         });


// }


$('#addSpecies').click(function () {
    speciesValue = $('#speciesFinder').val()
    speciesTrigger = true;
    $('.characterContainer').empty();
    form = 'species'
    getAllCharacters(speciesValue, form);
    
})


$('#addGender').click(function () {
    speciesValue = $('#speciesFinder').val()
    genderTrigger = true;
    $('.characterContainer').empty();
    form = 'gender'
    getAllCharacters(speciesValue, form);

})

$('#addStatus').click(function () {
    speciesValue = $('#speciesFinder').val()
    statusTrigger = true;
    $('.characterContainer').empty();
    form = 'status'
    getAllCharacters(speciesValue, form);
})

$('#addName').click(function () {
    speciesValue = $('#speciesFinder').val()
    nameTrigger = true;
    $('.characterContainer').empty();
    form = 'name'
    getAllCharacters(speciesValue, form);
})

