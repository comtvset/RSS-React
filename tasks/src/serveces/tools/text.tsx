interface TextProps {
  label: string;
  value: string | string[];
}

export const Text: React.FC<TextProps> = ({ label, value }) => {
  const renderValue = () => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <span key={index}>
          {item}
          <br />
        </span>
      ));
    } else {
      return String(value);
    }
  };

  return (
    <p>
      {label}: {renderValue()}
    </p>
  );
};
