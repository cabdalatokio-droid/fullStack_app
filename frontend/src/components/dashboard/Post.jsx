import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card" ;
import { Button } from '../ui/button';
const Post = ({post, onDelete}) => {
  console.log(post)
  return (
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
         <CardDescription>{post.content}</CardDescription>
         {post.image && <img src={post.image} alt={post.title} className="mt-4 w-full h-auto object-cover"/>}
        </CardContent>
        <Button onClick={()=>onDelete(post._id)}>DeletePost</Button>
      </Card>
  )
}

export default Post