export default function delve<T>(
   obj: Record<string, any>,
   key: string | string[],
   def?: T,
   undef?: any
): T | undefined {
   key = typeof key === 'string' ? key.split('.') : key;
   for (let p = 0; p < key.length; p += 1) {
      obj = obj ? obj[key[p]] : undef;
   }
   return (obj === undef ? def : obj) as T;
}
