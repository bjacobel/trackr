import Submit from './client/Submit';

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 font-sans leading-normal tracking-normal ">
      <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between mt-0 py-3 px-4">
        <Submit />
      </div>
    </main>
  );
}
