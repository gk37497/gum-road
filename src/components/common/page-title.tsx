export default function PageTitle({ title }: { title: string }) {
   return (
      <div className="space-y-0.5 p-14">
         <h1 className="text-4xl font-normal tracking-tight">{title}</h1>
      </div>
   );
}
