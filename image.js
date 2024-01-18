// DOM references

const body = document.getElementsByTagName('body')[0]
const card = document.getElementsByClassName('card')[0]

// Variables

const apiUrl = 'https://api.pexels.com/v1/photos'
const id = new URLSearchParams(location.search).get('id')

// Functions

const pageLoad = function () {
  fetch(apiUrl + '/' + id, {
    headers: {
      Authorization: 'X44fXd2syKYT8HBrnweLJHwg6KkAjPNOuqwxJ2TYTlt1EVVqthCz8acu',
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log(apiUrl + '/' + id)
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((obj) => {
      console.log(obj)
      card.innerHTML = `
        <img src="${obj.src.original}" class="card-img-top" alt="${obj.id}" />
        <div class="card-body">
          <h5 class="card-title">${obj.alt}</h5>
          <p class="card-text">
            Photo taken by: <a href="${obj.photographer_url}">${obj.photographer}</a>
          </p>
          <a href="./index.html" class="btn btn-primary">Go back</a>
        </div>
      `
      body.style.backgroundColor = `${obj.avg_color}`
    })
    .catch((err) => {
      console.log(err)
    })
}

// Page load code

pageLoad()
