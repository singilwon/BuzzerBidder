import Link from "next/link";

type PaymentResultProps = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export default function PaymentResult({
  title,
  description,
  buttonText,
  href,
}: PaymentResultProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <section className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-title-main text-2xl font-bold">{title}</h1>

        <p className="text-title-sub2 text-sm">{description}</p>

        <Link href={href} className="bg-btn-active rounded-md px-5 py-2 font-semibold text-white">
          {buttonText}
        </Link>
      </section>
    </div>
  );
}
