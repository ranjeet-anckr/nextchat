
import { redirect } from "next/navigation";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createPostAction } from '@/lib/actions/posts';
async function postData(formData: FormData) {
  "use server"
  await createPostAction(formData)
}
 
function CreatePostForm() {
  return (
    <div className='flex flex-col space-y-4 max-w-3xl mx-auto pb-16'>
 
      <form action={postData} >
        <div className='flex flex-col space-y-4'>
      
 
          <Label className='flex flex-col space-y-1.5'>
            <span>Title</span>
            <Input name='title'  required   defaultValue={ ''}/>
          </Label>
 
          <Label className='flex flex-col space-y-1.5'>
            <span>Description</span>
            <Input name='description' defaultValue={ ''} />
          </Label>
 
          <Label className='flex flex-col space-y-1.5'>
            <span>Content</span>
            <Textarea
              className='min-h-[300px]'
              name='content'
              defaultValue={''}
              required
            />
          </Label>
 
          <Button>
            Add Post
          </Button>
        </div>
      </form>
    </div>
  );
}
 
export default CreatePostForm;