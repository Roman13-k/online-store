import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center gap-4 py-24'>
      <p className='text-6xl font-semibold text-orange-main'>404</p>
      <Link href='/' className='text-orange-main underline'>
        ПРОКниги
      </Link>
    </div>
  );
}
