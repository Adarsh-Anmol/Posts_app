import { createPost } from "@/actions/posts";
import Postform from "@/components/post-form";


export default function NewPostPage() {
  return <Postform action={createPost}/>
}
