import { useRecoilState } from "recoil";
import { Categories, categoryState } from "../atoms";

function CategorySelect() {
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <select value={category} onInput={onInput}>
      <option value={Categories.TODO}>To Do</option>
      <option value={Categories.DOING}>Doing</option>
      <option value={Categories.DONE}>Done</option>
    </select>
  );
}

export default CategorySelect;
