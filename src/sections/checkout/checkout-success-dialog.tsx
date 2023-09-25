import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle
} from '@/components/ui/dialog';

export default function CheckoutSuccessDialog({
   open,
   onClose
}: {
   open: boolean;
   onClose: () => void;
}) {
   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>
                  Payment successfull <span>🎉</span>
               </DialogTitle>
               <DialogDescription>
                  Exercitation sunt sint duis excepteur laborum sint culpa mollit sit exercitation
                  ea.
               </DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
}
