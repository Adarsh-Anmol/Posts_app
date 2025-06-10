import { createPost } from "@/actions/post";
import Postform from "@/components/post-form";


export default function NewPostPage() {
  return <Postform action={createPost}/>
}
