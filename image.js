// DOM references

const main = document.getElementsByTagName('main')[0]
const card = document.getElementsByClassName('card')[0]

// Variables

const apiUrl = 'https://api.pexels.com/v1/photos'
const id = new URLSearchParams(location.search).get('id')
let imageObj

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
      imageObj = obj
      console.log(obj)
    })
    .catch((err) => {
      console.log(err)
    })
}

// Page load code

pageLoad()
