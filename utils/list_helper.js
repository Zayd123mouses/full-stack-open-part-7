const dummy = (blogs) => {
    return 1
  }
  
  module.exports = {
    dummy
  }


const totalLikes = (blogs)=>{
    const reducer = (sum, item) => {
        return item.likes + sum
      }
    
      return blogs.length === 1
      ? blogs[0].likes
      : blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs)=>{
  
const maximum = (blogs, compare)=>{
    blogs.forEach(blog => {
        if(blog.likes > compare.likes){
            compare = blog
        }      
    });
    return compare
}

return blogs.length === 1
? blogs[0]
: maximum(blogs, blogs[0])

}


const mostBlogs = (blogs)=>{ 
if (blogs.length === 1){
    return {
        author: blogs[0].author,
        blogs: 1
    }
}

const authors = {}
for (let i = 0; i<blogs.length; i++){
    if(authors[blogs[i].author] !== undefined){
        authors[blogs[i].author] += 1  
    }else{
        authors[blogs[i].author] = 1

    }
}

const Author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);
return {
         author: Author,
         blogs: authors[Author]
       }
    }



const MostLikes =(blogs)=>{
    if (blogs.length === 1){
        return {
            author: blogs[0].author,
            blogs: blogs[0].likes
        }
    }


const authors = {}
for (let i = 0; i<blogs.length; i++){
    if(authors[blogs[i].author] !== undefined){
        authors[blogs[i].author] += blogs[i].likes  
    }else{
        authors[blogs[i].author] = blogs[i].likes

    }
}

const Author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);
return {
    author:Author,
    likes: authors[Author]
}
}


module.exports = {
    dummy,
    totalLikes,
   
    favoriteBlog,
    mostBlogs ,
    MostLikes,
  }