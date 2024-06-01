const FormElementError = ({ error }: { error: string | undefined }) =>
  error && <span className="error">{error}</span>;

export default FormElementError;
