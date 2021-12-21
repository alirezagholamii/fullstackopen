const dummy = (blogs) => {
  // ...
  console.log('Alireza was here!', blogs)
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  for (const item of blogs) {
    sum += item.likes
  }
  return sum
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  const favorite = {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }
  for (const item of blogs) {
    if (item.likes > favorite.likes) {
      favorite.title = item.title
      favorite.author = item.author
      favorite.likes = item.likes
    }
  }
  return favorite
}

const mostBlogs = (blogs) => {
  const authors = {}
  for (const item of blogs) {
    if (authors[item.author]) {
      authors[item.author].blogs++
    } else {
      authors[item.author] = {
        author: item.author,
        blogs: 1
      }
    }
  }
  const result = []
  for (const property in authors) {
    result.push(authors[property])
  }

  result.sort((a, b) => {
    return a.blogs - b.blogs
  })
  return result.pop()
}

const mostLikes = (blogs) => {
  const authors = {}
  for (const item of blogs) {
    if (authors[item.author]) {
      authors[item.author].likes += item.likes
    } else {
      authors[item.author] = {
        author: item.author,
        likes: item.likes
      }
    }
  }
  const result = []
  for (const property in authors) {
    result.push(authors[property])
  }

  result.sort((a, b) => {
    return a.likes - b.likes
  })
  return result.pop()
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}