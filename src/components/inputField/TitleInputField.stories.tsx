import { zodResolver } from '@hookform/resolvers/zod';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { create } from 'zustand';

import TitleInputField from './TitleInputField';

import BaseButton from 'components/buttons/BaseButton';

const meta = {
  title: 'TitleInputField',
  component: TitleInputField,
} satisfies Meta<typeof TitleInputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export interface InitialValues {
  title: string;
}

// store 예시 (추후 삭제)
type InputStore = {
  inputs: InitialValues;
  setInput: <K extends keyof InitialValues>(name: K, value: InitialValues[K]) => void;
};

const useInputStore = create<InputStore>((set) => ({
  inputs: {
    title: '',
  },
  setInput: (name, value) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [name]: value,
      },
    })),
}));

const requiredString = () => z.string().min(1, '필수 입력 항목입니다.');

const formSchema = z.object({
  title: requiredString(),
});

type FormData = z.infer<typeof formSchema>;

const InputTemplate = (args: {
  name: string;
  placeholder?: string;
  maxCount?: number;
  isDisabled?: boolean;
}) => {
  const { inputs, setInput } = useInputStore();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: inputs.title || '',
    },
  });

  const { name, placeholder, maxCount, isDisabled } = { ...args };

  const onSubmit = methods.handleSubmit((data) => {
    action('Form Submitted')(data);
  });

  return (
    <div style={{ width: '375px' }}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', gap: '.8rem' }}>
            <TitleInputField
              isDisabled={isDisabled}
              maxCount={maxCount}
              name={name}
              onValueChange={(value) => setInput(name as keyof InitialValues, value)}
              placeholder={placeholder}
              value={inputs[name as keyof InitialValues] || ''}
            />
            <BaseButton
              color="primary"
              isFullWidth={false}
              size="small"
              type="submit"
              variant="fill"
            >
              제출
            </BaseButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export const InputExample: Story = {
  args: {
    name: 'title',
    value: '',
    placeholder: '닉네임을 입력해주세요',
    maxCount: 8,
    onValueChange: () => {},
  },
  render: (args) => <InputTemplate {...args} />,
};
