
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const port = 3000;

const object = [
  {
    id: 1,
    name: "viva",
    age: 20
  },
  {
    id: 2,
    name: "visha",
    age: 21
  },
  {
    id: 3,
    name: "mahi",
    age: 22
  }
]

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ status: 200, message: "This is get methods running", data: object }));
    res.end();
  }
  else if (req.method === 'GET' && pathname === '/id') {
    const id = parseInt(query.id);
    const obj = object.find(obj => obj.id == id);
    if (obj) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ status: 200, message: "This is get methods running", data: obj }));
      res.end();
    }
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ status: 404, message: "Data not found" }));
      res.end();
    }
  }
  else if (req.method === 'PUT' && pathname === '/id') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { name, age } = querystring.parse(body);
      const id = parseInt(query.id);
      const newObject = object.find(obj => obj.id == id);
      if (newObject) {
        newObject.name = name;
        newObject.age = age;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: 200, message: "This is put methods running", data: newObject }));
        res.end();
      }
      else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: 404, message: "Data not found" }));
        res.end();
      }
    });
  }
  else if (req.method === 'POST' && pathname === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { name, age } = querystring.parse(body);
      const newId = object.length + 1;
      const newObject = { id: newId, name, age };
      object.push(newObject);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ status: 201, message: "This is post methods running", data: newObject }));
      res.end();
    });
  }
  
  else if (req.method === 'DELETE' && pathname === '/id') {
    const id = parseInt(query.id);
    const obj = object.find(obj => obj.id == id);
    if (obj) {
      const index = object.indexOf(obj);
      object.splice(index, 1);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ status: 200, message: "This is delete methods running", data: obj }));
      res.end();
    }
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ status: 404, message: "Data not found" }));
      res.end();
    }
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Not Found</h1>');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

