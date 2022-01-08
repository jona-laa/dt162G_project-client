const fetchDelete = (endpoint: string, itemId: string, authToken: string) => {
  window.confirm('Sure you want to delete this?') &&
    fetch(`http://localhost:4000/api/content/${endpoint}`, {
      method: 'DELETE', // or 'PUT'
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'jwt': authToken
      },
      body: JSON.stringify({ "_id": itemId }),
    })
      .then(res => {
        res.status === 200 && window.location.reload();
        return res.json()
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

export const deleteItem = (itemId: string, itemType: ItemType, authToken: string) => {
  switch (itemType) {
    case 'about':
      fetchDelete('about', itemId, authToken);
      break;

    case 'skill':
      fetchDelete('skills', itemId, authToken);
      break;

    case 'work':
      fetchDelete('work', itemId, authToken);
      break;

    case 'studies':
      fetchDelete('studies', itemId, authToken);
      break;

    case 'project':
      fetchDelete('projects', itemId, authToken);
      break;

    default:
      // setFeedback({
      //   type: 'error',
      //   title: 'Oops...',
      //   body: 'Seems like something went wrong. Try again.'
      // })
      break;
  }
}