interface TextProps {
  label: string;
  value: string;
}

export const Text: React.FC<TextProps> = ({ label, value }) => (
  <p>
    {label}: {value}
  </p>
);
