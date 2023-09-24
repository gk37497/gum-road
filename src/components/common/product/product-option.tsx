import { Option } from '@/lib/types';

type Props = {
  option: Option;
};

export default function ProductOption({ option }: Props) {
  return (
    <div className="row relative flex items-center border border-black bg-pink-500 px-3 py-1.5">
      <p className="text-xs font-light">{option.price.$numberDecimal}₮ /</p>
      <p className="pl-1 pr-2 text-xs font-light">{option.duration} month</p>
      <div className="absolute -right-2.5 h-5 w-5 rotate-45 border-b border-l border-black bg-white" />
    </div>
  );
}
