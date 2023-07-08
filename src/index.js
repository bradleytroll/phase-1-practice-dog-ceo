document.addEventListener('DOMContentLoaded', function() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  let breeds = [];


  // Fetch dog images
  fetch(imgUrl)
    .then(res => res.json())
    .then(data => data.message.forEach(dogImage => renderImage(dogImage)));

  // Fetch dog breeds
  fetch(breedUrl)
    .then(res => res.json())
    .then(data => {
      breeds = Object.keys(data.message);
      renderBreeds(breeds);
    });

  // DOM selectors
  const dropdown = document.getElementById('dropdown');
  console.log(dropdown);

  const ul = document.querySelector('#dog-breeds'); 

  // Event listener
  dropdown.addEventListener('change', handleChange);

  // Render functions
  function renderImage(dogImage) {
    const container = document.querySelector("#dog-image-container");
    const image = document.createElement('img');
    image.src = dogImage;
    container.appendChild(image);
  }

  function renderBreeds(breeds) {
    
    breeds.forEach(breed => {
      const li = document.createElement('li');
      li.innerText = breed;
      ul.append(li);
      li.addEventListener('click', changeColor);
    });
  }

  // Callback functions
  function changeColor(e) {
    e.target.style.color = "red";
  }

  function handleChange(e) {
    let letter = e.target.value;
    let filterBreeds = breeds.filter(breed => breed.startsWith(letter))
    ul.innerHTML = ''
    // Can also use ul.textContent = ''. Either way, you're essentially wiping out the entire list and then the renderBreeds function renders only the targeted breeds by first letter.
    renderBreeds(filterBreeds)
  }
});




