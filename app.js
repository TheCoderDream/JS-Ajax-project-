

document.querySelector('.get-jokes').addEventListener('click', getJokes);

let chebox1 = document.getElementById('cat1');
let chebox2 = document.getElementById('cat2');

const boxes = [];
boxes.push(chebox2,chebox1);

function isChecked(checkbox) {
    if(checkbox.checked) {
      return true;
    }
    return false;
}

function genarateURL( ) {
  let url = 'http://api.icndb.com/jokes/random';
  let numberOfJokes = document.querySelector('input[type="number"').value;
  const categories = [];

  boxes.forEach(function (box) {
     if(isChecked(box)) {
       categories.push(box.value);
     }
  });

  console.log(categories);


  if (!(typeof numberOfJokes === 'undefined') && numberOfJokes > 0) {
    url += '/' + String(numberOfJokes);
  }

  if(!(typeof categories === 'undefined') && categories.length > 0){
    url += `?limitTo=[${categories.join(',')}]`

  }

  return url;

}

function getJokes(e) {

  let searchURL = genarateURL();


  console.log(number);

  const xhr = new XMLHttpRequest();

  xhr.open('GET', searchURL , true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response  = JSON.parse(this.responseText);

      const outputs = [];
      let output = '';
      const resVal = response.value;
        console.log(response);
      if(response.type === 'success') {

        if(Object.prototype.toString.call(resVal) === '[object Array]') {
            resVal.forEach(function (joke) {
                output = `<li class="list-group-item">${joke.joke}</li>`;
                outputs.push(output);

            });
        }


      } else {

        output = `<li>Something went wrong</li>`;


      }

      outputs.forEach(function (item) {
          document.querySelector('.jokes').innerHTML += item;
      });
      console.log(outputs);

    }
  };

  xhr.send();

  e.preventDefault();

}