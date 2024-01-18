// API key: X44fXd2syKYT8HBrnweLJHwg6KkAjPNOuqwxJ2TYTlt1EVVqthCz8acu

// DOM references

const albumRow = document.getElementById('album-row')
const loadButton1 = document.getElementById('load1')
const loadButton2 = document.getElementById('load2')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')

// Variables

const apiUrl1 = 'https://api.pexels.com/v1/search?query=landscapes'
const apiUrl2 = 'https://api.pexels.com/v1/search?query=guitars'
let images1 = []
let images2 = []

// Functions

const pageLoad = function () {
  fetch(apiUrl1, {
    headers: {
      Authorization: 'X44fXd2syKYT8HBrnweLJHwg6KkAjPNOuqwxJ2TYTlt1EVVqthCz8acu',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      console.log(data)
      images1 = [...data.photos]
      loadButton1.disabled = false
    })
    .catch((err) => {
      console.log(err)
    })
  fetch(apiUrl2, {
    headers: {
      Authorization: 'X44fXd2syKYT8HBrnweLJHwg6KkAjPNOuqwxJ2TYTlt1EVVqthCz8acu',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      images2 = [...data.photos]
      loadButton2.disabled = false
    })
    .catch((err) => {
      console.log(err)
    })
}

const cardGen = function (arrayElement) {
  const newCol = document.createElement('div')
  newCol.classList.add('col-md-4')
  newCol.innerHTML = `
    <div class="card mb-4 shadow-sm h-100">
      <a href="./image.html?id=${arrayElement.id}">
        <img
          src="${arrayElement.src.original}"
          class="bd-placeholder-img card-img-top"
          alt="${arrayElement.id}"
        />
      </a>
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">${arrayElement.alt}</h5>
          <p class="card-text">
            Photo taken by: <a href="${arrayElement.photographer_url}">${arrayElement.photographer}</a>
          </p>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
            >
              View
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              onclick="hideCard(event)"
            >
              Hide
            </button>
          </div>
          <small class="text-muted">ID: ${arrayElement.id}</small>
        </div>
      </div>
    </div>
  `
  albumRow.appendChild(newCol)
}

const hideCard = function (event) {
  event.target.closest('.col-md-4').remove()
}

// Event listeners

loadButton1.addEventListener('click', function () {
  albumRow.innerHTML = ''
  for (let i = 0; i < images1.length; i++) {
    cardGen(images1[i])
  }
})

loadButton2.addEventListener('click', function () {
  albumRow.innerHTML = ''
  for (let i = 0; i < images2.length; i++) {
    cardGen(images2[i])
  }
})

searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const apiUrl = `https://api.pexels.com/v1/search?query=${searchInput.value}`
  fetch(apiUrl, {
    headers: {
      Authorization: 'X44fXd2syKYT8HBrnweLJHwg6KkAjPNOuqwxJ2TYTlt1EVVqthCz8acu',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((data) => {
      albumRow.innerHTML = ''
      searchInput.value = ''
      for (let i = 0; i < data.photos.length; i++) {
        cardGen(data.photos[i])
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

// Page load code

pageLoad()
