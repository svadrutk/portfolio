import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center h-full font-grotesk">
        <div className="text-8xl">hi. i'm swad.</div>
        <div className="flex space-x-4 mt-8 text-4xl font-mono">
          <Link href="/about">
          <button className="bg-black-500 border-solid border-2 border-white text-white font-bold py-4 px-20 rounded hover:text-green-500 transition">
            about
          </button>
          </Link>
          <Link href="/folio">
          <button className="bg-black-500 border-solid border-2 border-white text-white font-bold py-4 px-20 rounded hover:text-green-500 transition">
            folio
          </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
