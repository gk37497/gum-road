import { format, formatDistanceToNow, getTime } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
   const fm = newFormat || 'dd MMM yyyy';

   return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
   const fm = newFormat || 'dd MMM yyyy p';

   return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
   return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
   return date
      ? formatDistanceToNow(new Date(date), {
           addSuffix: true
        })
      : '';
}

export function formatDate(date: Date | null) {
   const d = date || new Date();
   const month = `${d.getMonth() + 1}`;
   const day = `${d.getDate()}`;
   const year = d.getFullYear();

   return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}
