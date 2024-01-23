
 "use client"
import { useCallback, useTransition } from 'react';
import { TrashIcon } from 'lucide-react';
 
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { deletePostAction } from '@/lib/actions/posts';
 

function DeletePostButton(
  { uid }: React.PropsWithChildren<{
    uid: string
  }>) {
 const [isPending, startTransition] = useTransition();
 
  // const onDeleteRequested = useCallback(() => {
  //   startTransition(async () => {
  //     deleteFun(uid)

  //     //
    
  //     console.log(uid)
  //   });
  // }, [uid]);
  const onConfirm = () => {
    startTransition(async () => {
      // await deletePostAction(uid);

    
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'} className='flex space-x-2'>
          <TrashIcon className='w-3 h-3' />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
 
      <DialogContent>
        <form action={onConfirm}>
        <div className='flex space-y-4 flex-col'>
          <div>
            <b>Deleting Post</b>
          </div>
 
          <div>
            <p className='text-sm'>
              Are you sure you want to continue?
            </p>
          </div>
 
          <div className='flex justify-end'>
            <Button
              variant={'destructive'}
              className='flex space-x-2'
              type='submit'
          
            >
              <span>Yes, I want to delete this post</span>

            </Button>
          </div>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
 
export default DeletePostButton;