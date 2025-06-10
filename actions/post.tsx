"use server";

import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";


interface PostState {
  errors?: string[];
}

export async function createPost(state : PostState,formData: FormData){

  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  const errors:string[] = [];
  
  if(!title || title.toString().trim().length === 0){
    errors.push("Title is Required!");
  }

  if(!content || content.toString().trim().length === 0){
    errors.push("Content is Required!");
  }

  if(!image || !(image instanceof File)||image.size === 0){
    errors.push("Image is Required!");
  }

  if(errors.length >0){
    return {errors};
  }

  await storePost({
    imageUrl: '',
    title : title?.toString(),
    content : content?.toString(),
    userId:1
  })

  redirect('/feed')
  }