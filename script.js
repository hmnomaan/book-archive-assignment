const toggleSpinner = displayStyle => {

    document.getElementById('spinner').style.display = displayStyle;


}
const toggleSearchResult = displayStyle => {

    document.getElementById('display-book').style.display = displayStyle;


}

// search button onclick function 
const searchBook = () => {
    const searchField = document.getElementById('search-input');

    //display spinner

    toggleSpinner('block');
    toggleSearchResult('none');
    const searchText = searchField.value;
    //clear input
    searchField.value = ''

    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data))

};
// no result found (error) function
const resultNone = displayStyle => {
    document.getElementById('no-result').style.display = displayStyle;
}

const displaySearch = booksData => {
        const books = booksData.docs

        //search volume display
        const searchVolume = document.getElementById('search-volume');

        //clear search display, before every search
        searchVolume.textContent = ''
        const p = document.createElement('p');
        p.style.textAlign = "center";
        p.style.backgroundColor = 'blue';
        p.style.color = 'white'
        p.innerText = `Result Found: ${booksData.numFound}`;
        searchVolume.appendChild(p)

        //no result found (error message) display
        if (booksData.numFound === 0) {
            resultNone('block')
            document.getElementById('search-volume').style.display = 'none';

        } else {
            resultNone('none');

            document.getElementById('search-volume').style.display = 'block';


        }
        //  toggleSearchResult('none');
        toggleSpinner('block');


        //clear search result display, after (no result found)
        const displayBookResult = document.getElementById('display-book');
        displayBookResult.textContent = '';

        books.forEach(book => {

                    const displayBook = document.getElementById('display-book');
                    const div = document.createElement('div');
                    div.classList.add('book-card')
                    div.innerHTML = `
                   <img src="${`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}" alt="Not Available">
                   <h3>Book Name: ${book.title}</h3>
                   <p>Author Name: ${book.author_name?.[0]}</p>
                   <p>Publish Year: ${book.publish_year?.[0]}</p>
      `;
      displayBook.appendChild(div)
   });
   toggleSpinner('none');
   toggleSearchResult('block');
}