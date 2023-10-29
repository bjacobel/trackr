'use client';

import Uploader from '../containers/Uploader';

const ImportPage = () => (
  <main className="h-screen bg-gray-100 font-sans leading-normal tracking-normal">
    <div className="w-full md:max-w-md mx-auto flex flex-wrap items-center justify-between py-3 px-4">
      <Uploader />
    </div>
  </main>
);

export default ImportPage;
