import React, { useState } from "react";
import { FormState, useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="Write a to do"
//         />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  username?: string;
  passwd: string;
  passwd1: string;
  extraErrors?: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: { email: "@naver.com" },
  });
  const onValid = (data: IForm) => {
    if (data.passwd !== data.passwd1) {
      setError(
        "passwd1",
        { message: "Confirm your password" },
        { shouldFocus: true }
      );
    }
    // setError("extraErrors", { message: "server down" });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          type="text"
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("username", {
            minLength: {
              value: 5,
              message: "should be longer than 5",
            },
            validate: {
              noABC: (value) =>
                value?.includes("abc") ? "no abc allowed" : true,
              noKKY: (value) =>
                value?.includes("kky") ? "no kky allowed" : true,
            },
          })}
          type="text"
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("passwd", {
            required: "password required",
            minLength: {
              value: 5,
              message: "should be longer than 5",
            },
          })}
          type="text"
          placeholder="Password"
        />
        <span>{errors?.passwd?.message}</span>
        <input
          {...register("passwd1", {
            required: "confirm password required",
            minLength: {
              value: 5,
              message: "should be longer than 5",
            },
          })}
          type="text"
          placeholder="Confirm password"
        />
        <span>{errors?.passwd1?.message}</span>

        <button>Add</button>
        <span>{errors?.extraErrors?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
