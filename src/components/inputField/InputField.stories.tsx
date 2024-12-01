import { zodResolver } from '@hookform/resolvers/zod';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { create } from 'zustand';

import InputField from './InputField';

import BaseButton from 'components/buttons/BaseButton';

const meta = {
  title: 'InputField',
  component: InputField,
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export interface InitialValues {
  phoneNumber: string;
  price: number;
  text: string;
}

// store 예시 (추후 삭제)
type InputStore = {
  inputs: InitialValues;
  setInput: <K extends keyof InitialValues>(name: K, value: InitialValues[K]) => void;
};

const useInputStore = create<InputStore>((set) => ({
  inputs: {
    phoneNumber: '',
    price: 0,
    text: '',
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
  phoneNumber: requiredString().regex(
    /^\d{3}-\d{3,4}-\d{4}$/,
    '전화번호 형식이 올바르지 않습니다.'
  ),
  text: requiredString(),
  price: requiredString(),
});

type FormData = z.infer<typeof formSchema>;

const InputTemplate = (args: {
  name: string;
  placeholder?: string;
  unit?: string;
  pattern?: string;
  isNumber?: boolean;
  isDisabled?: boolean;
}) => {
  const { inputs, setInput } = useInputStore();
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: inputs.text || '',
      phoneNumber: inputs.phoneNumber || '',
      price: inputs.price ? String(inputs.price) : '',
    },
  });

  const { name, placeholder, unit, pattern, isNumber, isDisabled } = { ...args };

  const onSubmit = methods.handleSubmit((data) => {
    action('Form Submitted')(data);
  });

  return (
    <div style={{ width: '375px' }}>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', gap: '.8rem' }}>
            <InputField
              isDisabled={isDisabled}
              isNumber={isNumber}
              name={name}
              onValueChange={(value) => setInput(name as keyof InitialValues, value)}
              pattern={pattern}
              placeholder={placeholder}
              unit={unit}
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
    name: 'text',
    value: '',
    onValueChange: () => {},
  },
  render: (args) => <InputTemplate {...args} />,
};

export const NumberInputExample: Story = {
  args: {
    name: 'price',
    placeholder: '30,000',
    value: 0,
    unit: '원',
    isNumber: true,
    onValueChange: () => {},
  },
  render: (args) => <InputTemplate {...args} />,
};

export const PhoneInputExample: Story = {
  args: {
    name: 'phoneNumber',
    placeholder: '010-1234-5678',
    value: '',
    pattern: '###-####-####',
    onValueChange: () => {},
  },
  render: (args) => <InputTemplate {...args} />,
};
