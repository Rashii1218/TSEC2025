const kmeans = require('node-kmeans');

const data = [
  { id: 1, value: [1, 2, 3] },
  { id: 2, value: [4, 5, 6] },
  { id: 3, value: [7, 8, 9] },
  { id: 4, value: [10, 11, 12] },
  { id: 5, value: [13, 14, 15] }
];

const k = 2;

kmeans.clusterize(data.map(item => item.value), { k }, (err, res) => {
  if (err) console.error(err);
  else console.log('Clusters:', res);
});
