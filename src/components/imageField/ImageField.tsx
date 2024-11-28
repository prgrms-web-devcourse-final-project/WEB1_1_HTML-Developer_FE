import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { LuCamera } from 'react-icons/lu';
import { TbX } from 'react-icons/tb';

import { ChipText } from 'styles/Typography';
import { hexToRgba } from 'utils/hexToRgba';

interface ImageFieldProps {
  initialImages?: string[];
}

const MAX_IMAGES = 5;

const ImageField = ({ initialImages = [] }: ImageFieldProps) => {
  // 모든 이미지의 미리보기
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  // 새로 추가된 파일들
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  // 삭제할 이미지 ID들
  const [deleteTargetIds, setDeleteTargetIds] = useState<string[]>([]);

  const encodeFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다: '));
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const totalImages = previewImages.length + files.length;

    // TODO: Dialog 처리
    if (totalImages > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드 가능합니다.`);
      return;
    }

    const encodedImages = await Promise.all(files.map((file) => encodeFileToBase64(file)));

    setNewImageFiles((prev) => [...prev, ...files]);
    setPreviewImages((prev) => [...prev, ...encodedImages]);

    // TODO: 상위 컴포넌트 전달
  };

  const handleImageDelete = (index: number) => {
    const isInitialImage = index < initialImages.length;

    if (isInitialImage) {
      // 저장된 이미지 삭제
      const imageId = initialImages[index]; // TODO: 이미지의 ID나 URL
      setDeleteTargetIds((prev) => [...prev, imageId]);
    } else {
      // 새로 추가된 이미지 삭제
      const newImageIndex = index - initialImages.length;
      setNewImageFiles((prev) => prev.filter((_, i) => i !== newImageIndex));
    }

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    // TODO: 상위 컴포넌트 전달
  };

  useEffect(() => {
    if (initialImages.length > 0) {
      setPreviewImages(initialImages);
    }
  }, [initialImages]);

  return (
    <ImageFieldWrapper>
      {previewImages.length < MAX_IMAGES && (
        <ImageAddButton>
          <input accept="image/*" hidden multiple onChange={handleImageUpload} type="file" />
          <LuCamera />
          <ChipText>
            {previewImages.length}/{MAX_IMAGES}
          </ChipText>
        </ImageAddButton>
      )}
      {previewImages.map((image, index) => (
        <ImagePreviewWrapper key={image}>
          <ImagePreview $url={image}>
            <DeleteButton onClick={() => handleImageDelete(index)}>
              <TbX />
            </DeleteButton>
          </ImagePreview>
        </ImagePreviewWrapper>
      ))}
    </ImageFieldWrapper>
  );
};

export default ImageField;

const ImageFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  & > div,
  label {
    width: 120px;
    height: 120px;
  }
`;

const ImageAddButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.dark[300]};
  background-color: ${({ theme }) => theme.colors.dark[700]};
  border-radius: 8px;
  gap: 4px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
`;

const ImagePreview = styled.div<{ $url: string }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-image: url(${(props) => props.$url});
  background-size: cover;
  background-position: center;
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 28px;
  height: 28px;
  background-color: ${({ theme }) => hexToRgba(theme.colors.dark[700], 0.4)};
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.colors.dark[200]};
  }
`;
