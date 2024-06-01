import { FormFieldName, ReactEventType } from "@/app/_types/Index";
import Input from "../UI/Input";

const Search = ({ onChange }: { onChange: (e: ReactEventType) => void }) => {
  return (
    <div className="header-search">
      <Input name={FormFieldName.HeaderSearch} onChange={onChange} />
    </div>
  );
};

export default Search;
