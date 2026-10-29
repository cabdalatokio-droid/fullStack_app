import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const DialogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Display the selected image before submitting
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      e.target.value = '';
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Release temporary preview URLs when they are replaced or removed
  useEffect(() => {
    if (!preview) return;

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Submit the post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(
        '/api/post/create-post',
        formData
      );

      console.log('Post created:', response.data);

      setTitle('');
      setContent('');
      setImage(null);
      setPreview('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      toast.success(response.data.message);
    } catch (error) {
      console.error('Create post failed:', error);
      console.error('Request URL:', error.config?.url);
      console.error('Status:', error.response?.status);
      console.error('Server response:', error.response?.data);

      toast.error(
        error.response?.data?.message ||
          'Failed to create post'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Use render to avoid nesting one button inside another */}
      <DialogTrigger render={<Button type="button" />}>
        Create New Post
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>

          <DialogDescription>
            Enter your post title and content, then select an image
            to preview before submitting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>

              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>

              <Input
                id="content"
                name="content"
                type="text"
                placeholder="Enter post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Image */}
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>

              <Input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />

              {/* Image preview appears immediately after selection */}
              {preview && (
                <img
                  src={preview}
                  alt="Selected image preview"
                  className="mt-2 h-32 w-32 rounded-md object-cover"
                />
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating post...' : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;