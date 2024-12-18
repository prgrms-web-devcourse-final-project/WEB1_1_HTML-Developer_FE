import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { LuCamera } from 'react-icons/lu';
import { TbX } from 'react-icons/tb';

import ValidationMessage from 'components/message/ValidationMessage';
import type { RentalFormSchemaType } from 'schemas/rentalFormSchema';
import { ChipText } from 'styles/Typography';
import { hexToRgba } from 'utils';

interface RentalThumbFieldProps {
  initialImage?: string;
}

const ImageFieldWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;
`;

const ImageAddButton = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  width: 12rem;
  height: 12rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  color: ${({ theme }) => theme.colors.dark[200]};
  cursor: pointer;

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[50]};
  }
`;

const ImageCount = styled(ChipText)`
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 12rem;
  height: 12rem;
`;

const ImagePreview = styled.div<{ $url: string }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: url(${(props) => props.$url});
  background-size: cover;
  background-position: center;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${({ theme }) => hexToRgba(theme.colors.dark[700], 0.4)};
  color: ${({ theme }) => theme.colors.dark[50]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const FIELD_NAME = 'imageUrl';

const RentalThumbField = ({ initialImage }: RentalThumbFieldProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<RentalFormSchemaType>();

  const previewImage = watch(FIELD_NAME);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setValue(FIELD_NAME, reader.result as string, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleImageDelete = () => {
    setValue(FIELD_NAME, null, { shouldValidate: true });
  };

  useEffect(() => {
    if (initialImage) setValue(FIELD_NAME, initialImage, { shouldValidate: true });
  }, [initialImage, setValue]);

  return (
    <Controller
      control={control}
      name={FIELD_NAME}
      render={() => (
        <>
          <ImageFieldWrapper>
            {!previewImage ? (
              <ImageAddButton>
                <input accept="image/*" hidden onChange={handleImageUpload} type="file" />
                <LuCamera size={24} />
                <ImageCount>0 / 1</ImageCount>
              </ImageAddButton>
            ) : (
              <ImagePreviewWrapper>
                <ImagePreview $url={previewImage}>
                  <DeleteButton onClick={handleImageDelete}>
                    <TbX size={24} />
                  </DeleteButton>
                </ImagePreview>
              </ImagePreviewWrapper>
            )}
          </ImageFieldWrapper>
          {errors[FIELD_NAME] && errors[FIELD_NAME].message && (
            <ValidationMessage message={errors[FIELD_NAME].message} />
          )}
        </>
      )}
    />
  );
};

export default RentalThumbField;
