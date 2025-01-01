import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { BodyMediumText, BodyRegularText, CaptionText } from 'styles/Typography';

interface RentalFormFieldProps {
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

const FormTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 0.2rem;
`;

const FormTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const SubFieldContainer = styled.div<{ isHorizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column')};
  gap: 1.2rem;
`;

const SubFieldWrapper = styled.div<{ isHorizontal?: boolean }>`
  display: flex;
  flex-direction: ${({ isHorizontal }) => (isHorizontal ? 'row' : 'column')};
  justify-content: ${({ isHorizontal = false }) => (isHorizontal ? 'space-between' : 'auto')};
  align-items: ${({ isHorizontal = false }) => (isHorizontal ? 'center' : 'auto')};
  gap: 0.8rem;
`;

const SubLable = styled(BodyRegularText)`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const RentalFormField = ({ isHorizontal, children }: RentalFormFieldProps) => {
  return <FormFieldContainer isHorizontal={isHorizontal}>{children}</FormFieldContainer>;
};

const FieldTitle = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) => {
  return (
    <FormTitleContainer>
      <FormTitleWrapper>
        <FormFieldLabel>
          {title}
          <Asterisk>*</Asterisk>
        </FormFieldLabel>
        {children}
      </FormTitleWrapper>
      {description && <FormFieldDescription>{description}</FormFieldDescription>}
    </FormTitleContainer>
  );
};

const Fields = ({
  isHorizontal = false,
  children,
}: {
  isHorizontal?: boolean;
  children: ReactNode;
}) => {
  return <SubFieldContainer isHorizontal={isHorizontal}>{children}</SubFieldContainer>;
};

const SubField = ({
  subLabel,
  isHorizontal = false,
  children,
}: {
  subLabel: string;
  isHorizontal?: boolean;
  children: ReactNode;
}) => {
  return (
    <SubFieldWrapper isHorizontal={isHorizontal}>
      <SubLable>{subLabel}</SubLable>
      {children}
    </SubFieldWrapper>
  );
};

RentalFormField.Title = FieldTitle;
RentalFormField.Fields = Fields;
RentalFormField.SubField = SubField;

export default RentalFormField;
