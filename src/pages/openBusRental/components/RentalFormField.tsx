import styled from '@emotion/styled';

import { BodyMediumText, CaptionText } from 'styles/Typography';

interface RentalFormFieldProps {
  title: string;
  description?: string;
  isHorizontal?: boolean;
  children: React.ReactNode;
}

const FormFieldContainer = styled.div<{ isHorizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ isHorizontal = false }) => (isHorizontal ? 'row' : 'column')};
  justify-content: ${({ isHorizontal = false }) => (isHorizontal ? 'space-between' : 'auto')};
  align-items: ${({ isHorizontal = false }) => (isHorizontal ? 'center' : 'auto')};
  gap: 1.2rem;
`;

const FormTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const FormFieldLabel = styled(BodyMediumText)`
  color: ${({ theme }) => theme.colors.white};
`;

const Asterisk = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

const FormFieldDescription = styled(CaptionText)`
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const RentalFormField = ({ title, description, isHorizontal, children }: RentalFormFieldProps) => {
  return (
    <FormFieldContainer isHorizontal={isHorizontal}>
      <FormTitleWrapper>
        <FormFieldLabel>
          {title}
          <Asterisk>*</Asterisk>
        </FormFieldLabel>
        {description && <FormFieldDescription>{description}</FormFieldDescription>}
      </FormTitleWrapper>
      {children}
    </FormFieldContainer>
  );
};

export default RentalFormField;
