import { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';

import { backfillFromCsv } from '@/data/opentsdb';

const Uploader = () => {
  const [resultMessage, setResultMessage] = useState('');

  const submit = async (data: FormData) => {
    const fileData = data.get('file') as File;
    if (!fileData) return;

    const response = await backfillFromCsv(await fileData.text());
    setResultMessage(response.error || response.response || 'Imported!');
  };

  return (
    <>
      <form action={submit}>
        <div className="relative flex w-full max-w-[24rem]">
          <Input
            type="file"
            accept=".csv"
            name="file"
            className="pr-20"
            containerProps={{
              className: 'min-w-0',
            }}
          />
          <Button type="submit" size="sm" className="!absolute right-1 top-1 rounded">
            Import
          </Button>
        </div>
      </form>
      <p className="mt-6">{resultMessage}</p>
    </>
  );
};

export default Uploader;
