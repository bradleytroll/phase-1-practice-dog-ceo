console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById('dog-image-container');
    const dogBreedsList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Fetch and display dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const imageElement = document.createElement('img');
          imageElement.src = imageUrl;
          dogImageContainer.appendChild(imageElement);
        });
      })
      .catch(error => {
        console.log('Error fetching dog images:', error);
      });

    // Fetch and display dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breeds = data.message;
        for (const breed in breeds) {
          if (breeds[breed].length > 0) {
            breeds[breed].forEach(subBreed => {
              const breedItem = document.createElement('li');
              breedItem.textContent = `${subBreed} ${breed}`;
              dogBreedsList.appendChild(breedItem);
            });
          } else {
            const breedItem = document.createElement('li');
            breedItem.textContent = breed;
            dogBreedsList.appendChild(breedItem);
          }
        }
      })
      .catch(error => {
        console.log('Error fetching dog breeds:', error);
      });

    // Change font color on click
    dogBreedsList.addEventListener('click', (event) => {
      const clickedLi = event.target;
      clickedLi.style.color = 'blue'; // Change the color to your preferred choice
    });

    // Filter breeds based on selected letter
    breedDropdown.addEventListener('change', () => {
      const selectedLetter = breedDropdown.value;

      // Show/hide breeds based on selected letter
      const breedItems = dogBreedsList.getElementsByTagName('li');
      for (const breedItem of breedItems) {
        const breedName = breedItem.textContent;
        if (breedName.startsWith(selectedLetter)) {
          breedItem.style.display = 'block';
        } else {
          breedItem.style.display = 'none';
        }
      }
    });
  });