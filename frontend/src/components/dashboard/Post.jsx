import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card" ;
import { Button } from '../ui/button';
import DialogForm from "./Dialog";
import { useUser } from "../../hooks/useUser";
const Post = ({post, onDelete,setPostData}) => {
  const {user}=useUser();
    const isOwner = user?._id === post.author?._id;
  return (
      <Card>
        <CardHeader>
          <CardTitle>{post.author.username}</CardTitle>
        </CardHeader>
        <CardContent>
         <CardDescription>{post.content}</CardDescription>
         {post.image && <img src={post.image} alt={post.title} className="mt-4 w-full h-auto object-cover"/>}
         <div className="flex justify-end space-x-2 mt-4">
            {isOwner &&(
            <>
                 <DialogForm  postEdit={post} buttonTitle="update Post" setPostData={setPostData}/>
          <Button onClick={()=>onDelete(post._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">DeletePost</Button>
            </>
            )
          }
          
         </div>
        </CardContent>
      </Card>
  )
}

export default Post