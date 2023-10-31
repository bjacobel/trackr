'use client';

import { useState, ChangeEvent } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { createAnnotation } from '@/data/loki';
import Submit from '@/app/components/Submit';
import { Input, Textarea } from '@material-tailwind/react';

const Annotations = () => {
  const [annotation, setAnnotation] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const { pending } = useFormStatus();

  const updateAnnotation = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.currentTarget.value;
    setAnnotation(value);
  };

  const submit = async () => {
    const tsdbResponse = await createAnnotation(annotation);
    setAnnotation('');
    setResultMessage(tsdbResponse.error || tsdbResponse.response || 'Tracked!');
  };

  return (
    <>
      <form className="w-full mt-3 font-medium text-black" action={submit}>
        <Textarea
          label="Annotation"
          value={annotation}
          onChange={updateAnnotation}
          variant="outlined"
          className="pr-20 bg-white"
          containerProps={{
            className: 'min-w-0',
          }}
        />
        <Submit className="mt-7" disabled={!annotation.length} pending={pending} />
      </form>
      <p className="mt-6">{resultMessage}</p>
    </>
  );
};

export default Annotations;
