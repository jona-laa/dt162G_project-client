const fetchDelete = (endpoint: string, itemId: string) => {
  fetch(`http://localhost:4000/${endpoint}`, {
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
}

export const deleteItem = (itemId: string, itemType: ItemType) => {
  switch (itemType) {
    case 'about':
      fetchDelete('about', itemId);
      break;

    case 'skill':
      console.log('delete skill', itemId)
      fetchDelete('skills', itemId);
      break;

    case 'work':
      console.log('delete work', itemId)
      fetchDelete('work', itemId);
      break;

    case 'studies':
      console.log('delete studies', itemId)
      fetchDelete('studies', itemId);
      break;

    case 'project':
      console.log('delete project', itemId)
      fetchDelete('projects', itemId);
      break;

    default:
      break;
  }
}