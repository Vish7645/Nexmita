import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Post from "../post/Post";
import "./posts.scss";
import { makeRequest } from '../../axios.js';
import { ThemeContext } from '@emotion/react';

const Posts = () => {
  //TEMPORARY
  const { isLoading, error, data } = useQuery('repoData', () =>
    makeRequest.get("/posts").then((res)=>{
      return res.data;
    })
  )
  console.log(data)

  return(
    <div className="posts">
      {error 
        ? "Something went wrong" 
        : (isLoading 
        ? "Loading..." 
        :
        data.map((post)=>
          // <h1>id</h1>
          <Post post={post} key={post.id}/>
        )
      )}
    </div>
  )
};

export default Posts;
