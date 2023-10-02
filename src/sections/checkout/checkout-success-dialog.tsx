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
               <DialogDescription>Check your email for the order confirmation</DialogDescription>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   );
}
