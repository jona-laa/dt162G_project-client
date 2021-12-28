export const deleteItem = (itemId: string, itemType: ItemType) => {
  switch (itemType) {
    case 'about':
      fetch('http://localhost:4000/about', {
        method: 'DELETE', // or 'PUT'
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "_id": itemId }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      break;

    case 'skill':
      console.log('delete skill', itemId)
      fetch('http://localhost:4000/skills', {
        method: 'DELETE', // or 'PUT'
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "_id": itemId }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      break;

    case 'work':
      console.log('delete work', itemId)
      fetch('http://localhost:4000/work', {
        method: 'DELETE', // or 'PUT'
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "_id": itemId }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      break;

    case 'studies':
      console.log('delete studies', itemId)
      fetch('http://localhost:4000/studies', {
        method: 'DELETE', // or 'PUT'
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "_id": itemId }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      break;

    case 'project':
      console.log('delete project', itemId)
      fetch('http://localhost:4000/projects', {
        method: 'DELETE', // or 'PUT'
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "_id": itemId }),
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      break;

    default:
      break;
  }
}