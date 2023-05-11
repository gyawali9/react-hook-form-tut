import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const formSubmithandler = (data: FormValues) => {
    console.log("form submitted", data);
  };
  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(formSubmithandler)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "User name is required!",
              },
            })}
          />
          <p className="error">{errors?.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors?.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel"> Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel is required!" })}
          />
          <p className="error">{errors?.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
