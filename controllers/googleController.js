const axios = require("axios");
const db = require("../models");
const router = require("express").Router();


module.exports = {
  findAll: function (req, res) {
    const {query: params} = req;
    // console.log("find all:", params)
    axios.get("https://www.googleapis.com/books/v1/volumes", {
      params
    }).then(results => {
      // console.log(results)
     return results.data.items.filter(
        result =>
        result.volumeInfo.title &&
        result.volumeInfo.infoLink &&
        result.volumeInfo.authors &&
        result.volumeInfo.description &&
        result.volumeInfo.imageLinks &&
        result.volumeInfo.imageLinks.thumbnail,
      )
    }).then(books => res.json(books))
    .catch(err => res.status(422).json(err));

  }

}
// findAll: 
//   function (req, res) {
//     axios
//         .get("https://www.googleapis.com/books/v1/volumes", { params: req.query })
//         .then(({ data: { items } }) => res.json(items))
//         .catch(err => res.status(422).json(err));
// }




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

// module.exports = router;