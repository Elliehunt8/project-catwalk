const express = require('express');
const port = 3000;
const app = express();
const path = require('path');
const axios = require('axios');
const TOKEN = require('../config.js');

let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';

app.use(express.static('public'));
app.use(express.json());
console.log(path.join(__dirname, '../public/index.html'));

// Products Routes
app.get('/', function (req, res) {
  console.log('Hi');
  res.send();
});

app.get('/products', (req, res) => {
  let endpoint = url + 'products';
  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      console.log('Data from get to Products endpoint: ', response);
      let jsonData = JSON.stringify(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.get('/products/:product_id', (req, res) => {
  let id = req.params.product_id;
  let endpoint = url + 'products/' + id;
  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.get('/products/:product_id/styles', (req, res) => {
  let id = req.params.product_id;
  let endpoint = url + 'products/' + id + '/styles';

  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.get('/products/:product_id/related', (req, res) => {
  let id = req.params.product_id;
  let endpoint = url + 'products/' + id + '/related';

  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

// Reviews Routes
app.get('/reviews/:product_id', (req, res) => {
  let id = req.params.product_id;
  let endpoint = url + 'reviews/';
  let reviewSort = req.headers.sort;

  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
      params: {
        product_id: id,
        sort: reviewSort,
        count: 15,
      },
    })
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.get('/reviews/:product_id/meta', (req, res) => {
  let id = req.params.product_id;
  let endpoint = url + 'reviews/meta';

  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
      params: {
        product_id: id,
      },
    })
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  let id = req.params.review_id;
  let endpoint = url + `reviews/${id}/helpful`;

  axios
    .put(endpoint, null, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      console.log(response);
      res.end(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.put('/reviews/:review_id/report', (req, res) => {
  let id = req.params.review_id;
  let endpoint = url + `reviews/${id}/report`;

  axios
    .put(endpoint, null, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      res.end(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.post('/reviews', (req, res) => {
  let endpoint = url + 'reviews';
  let newReview = req.body;
  console.log(newReview);
  axios
    .post(endpoint, newReview, {
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/JSON',
      },
    })
    .then((response) => {
      res.end(response.body);
    })
    .catch((err) => {
      console.log('ERRRRRRRRRR: ', err);
    });
});

app.post('/interactions', (req, res) => {
  let endpoint = url + 'interactions';
  console.log(req.body);
  axios
    .post(endpoint, req.body, {
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'application/JSON',
      },
    })
    .then((response) => {
      console.log(response);
      res.status(201);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Q&A Routes
app.get('/qa/questions', (req, res) => {
  let id = req.query.id;
  let page = req.query.page;
  console.log('req in server: ', req);
  let endpoint = url + 'qa/questions';

  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
      params: {
        product_id: id,
        count: 4,
        page: page,
      },
    })
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.get('/qa/questions/:product_id/answers', (req, res) => {
  let id = req.params.product_id;
  let endpoint = url + 'qa/questions/' + id + '/answers';

  axios
    .get(endpoint, {
      headers: {
        Authorization: TOKEN,
      },
      // params: {
      //   "product_id": id,
      // }
    })
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let id = req.body.answer_id;
  let count = JSON.stringify(req.body.count);
  console.log('ID: ', id);
  let endpoint = url + 'qa/answers/' + id + '/helpful';
  console.log('req in server on put request: ', req);

  axios
    .put(endpoint, count, {
      headers: {
        Authorization: TOKEN,
      },
      query: {
        answer_id: id,
      },
    })
    .then((response) => {
      console.log('Response in server:', response);
      res.send(count);
    })
    .catch((err) => {
      console.log('Error! ', err);
    });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let id = req.body.answer_id;
  let endpoint = url + 'qa/answers/' + id + '/report';
  console.log('Response in server PUT', res);
  axios
    .put(endpoint, id, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      res.send(response);
    });
});

app.post('/qa/questions', (req, res) => {
  let newQ = req.body;
  let endpoint = url + 'qa/questions';
  console.log('Q&A POST: ', req);
  axios
    .post(endpoint, newQ, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let newA = req.body;
  let id = req.params.question_id;
  let endpoint = url + 'qa/questions/' + id + '/answers';
  console.log('Q&A POST FOR ADDING ANSWERS: ', req);
  axios
    .post(endpoint, newA, {
      headers: {
        Authorization: TOKEN,
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, function () {
  console.log('Listening on port ', port);
});
