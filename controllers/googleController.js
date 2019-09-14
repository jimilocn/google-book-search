const axios = require("axios");
const db = require("../models")
const router = require("express").Router();


module.exports = {
  findAll: function (req, res) {
    const {
      query: params
    } = req;
    console.log(req);
    axios.get("https://www.googleapis.com/books/v1/volumes", {
        params
      })
      .then(({ data: { items } }) => res.json(items))
      // .then(apiBooks => db.Book.find().then(dbBooks => apiBooks.filter(apiBook => dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id))).then(books => res.json(books)).catch(err => status(422).json(err))
     
  }
  // findAll: 
  //   function (req, res) {
  //     axios
  //         .get("https://www.googleapis.com/books/v1/volumes", { params: req.query })
  //         .then(({ data: { items } }) => res.json(items))
  //         .catch(err => res.status(422).json(err));
  // }
  
}


// router.get("/google", (req, res) => {
//   axios
//     .get("https://www.googleapis.com/books/v1/volumes", {
//       params: req.query
//     })
//     .then(({
//       data: {
//         results
//       }
//     }) => res.json(results))
//     .catch(err => res.status(422).json(err));
// });

module.exports = router;