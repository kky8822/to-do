import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const handleValid = ({ toDo }: IForm) => {
    // console.log("add to Do", data.toDo);
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TODO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write to Do",
        })}
        type="text"
        placeholder="Write a to do"
      />
      <span>{errors?.toDo?.message}</span>
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
