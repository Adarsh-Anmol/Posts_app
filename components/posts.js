"use client";

import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/actions/posts';
import { useOptimistic } from 'react';
import Image from 'next/image';

function imageLoader(config){
  const urlStart= config.src.split('upload/')[0];
  const urlEnd= config.src.split('upload/')[1]
  const transformations= `w_200,q_50`; //can set height,width,quality here 
  // only setting width maintains aspect ratio

  return `${urlStart}upload/${transformations}/${urlEnd}`;
}

function Post({ post, action  }) {
  return (
    <article className="post">
      <div className="post-image">
        <Image 
        loader={imageLoader} 
        quality={50} 
        src={post.image} 
        //fill={true} ;should use sizes property with fill prop
        //sizes={} but here, we have a predefined width and height, thus not required
        width={200}
        height={120} // approximately set this, as the display properties 
        // for the image are defined in the css
        alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} 
            className={post.isLiked ? 'liked' : ''}>
            <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  //useOptimistic has two arguments: first is the data which is to be immediately updated
  //second is the the data that allows to perform the update.
  //useOptimistic returns the optimistically updated data, and that is the first argument
  //and second argument is the function to trigger the function to perform the update
  //i.e. the function in useOptimistic in this case
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts,updatedPostId)=> {
    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId)

    //if no match, then returns -1
    if(updatedPostIndex === -1) {
      return prevPosts;
    }

    const updatedPost = {...prevPosts[updatedPostIndex]};
    updatedPost.likes += (updatedPost.isLiked? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts]
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;

  })

  async function updatePost(postId){
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
