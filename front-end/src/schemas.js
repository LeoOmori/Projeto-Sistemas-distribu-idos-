
export let listJokes = {
  'q': '*',
  'query_by': 'joke',
  'per_page': 5,
}

export let searchJokes = (id) => {
  return { 
    'q': '*',
    'query_by': 'users_saved',
    'filter_by': `users_saved:={${id}}`,
  }
}

export let listUserSavedJokes = (id) => {
  return { 
    'q': '*',
    'query_by': 'users_saved',
    'filter_by': `users_saved:={${id}}`,
  }
}

export let listTopJokes = { 
  'q': '*',
  'query_by': 'joke',
  'per_page': 5,
  'sort_by': 'rating_average:desc'
}


