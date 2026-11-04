import Post from "../models/post.js";
import cloudinary from "../config/cloudinary.js"

export const createPost=async(req,res)=>{
 try {


   const currentUser=req.user._id;
   const{title,content}=req.body


   let result;
   if(req.file){
    let encodedImage=`data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;
    result= await cloudinary.uploader.upload(encodedImage,{
      resource_type:'image',
      transformation:[{width:500, height:500,crop:'limit'}],
      encoding:"base64"
    })
   }

   const post= new Post({
   title:title,
   content:content,
   image:result?.url || null,
   author:currentUser
   })


   await post.save();
   res.status(201).json({
    post:post,
    success:true,
    message:'Post created successfully',
   })

   

 } catch (error) {
  console.log("error creating post", error);
  res.status(400).send({
    message:"creating post failed",
    success:false
  })
 }
}

// export const getPosts=async(req,res)=>{
//   try {
//     const posts= await Post.find({author:req.user._id})
//   .populate({
//     path:"author",
//     model:"User",
//     select:"username "
//   }).sort({createdAt:-1});

//   res.status(200).json(posts);
    
//   } catch (error) {
//     res.status(400).json({
//       message:error.message,
//       success:false
//     })
//   }
// }
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "author",
        model: "User",
        select: "username"
      })
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const DeletePost=async(req,res,next)=>{
try {
  const post= await Post.findByIdAndDelete
  (req.params.id);
  if(!post) return res.status(400).send({
    message:"Not Found"
  })

  res.status(200).json({
    message:"post deleted seccessfully"
  })
} catch (error) {
  next(error)
}
}


export const updatepost=async(req,res)=>{
  try {
    const updatefields = {
      title: req.body.title,
      content: req.body.content
    };

    if (req.file) {
      const encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;
      const result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: 'image',
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
        encoding: 'base64'
      });
      updatefields.image = result.url;
    }

   const post =await Post.findByIdAndUpdate(req.params.id,updatefields,{
    new:true
   })

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        success: false
      });
    }

    return res.status(200).json({
      post:post,
      success: true,
      message: 'Post updated successfully'
    })
  } catch (error) {
    console.error('Error updating post', error);
    return res.status(400).json({
      message: 'Post update failed',
      success: false
    });
  }
};