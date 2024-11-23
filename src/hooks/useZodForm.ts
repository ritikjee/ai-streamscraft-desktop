import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useZodForm = <T extends z.ZodType<any>>(
  schema: T,
  defaultValues?: DefaultValues<z.TypeOf<T>> | undefined
) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return { register, watch, reset, handleSubmit, errors };
};
export default useZodForm;
