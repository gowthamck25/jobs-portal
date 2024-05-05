import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid #bbb;
  border-radius: 4px;
  color: #888;
  background-color: var(--color-grey-0);
  font-weight: 500;

  &:option {
    color: green !important;
  }
`;

const Option = styled.option`
  font-size: 1.4rem;
`;

function Select({ options, value, onChange, placeholder, ...props }) {
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    >
      {options.map((option) => (
        <Option value={option} key={option}>
          {option}
        </Option>
      ))}
    </StyledSelect>
  );
}

export default Select;
