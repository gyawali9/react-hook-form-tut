import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;
type FormValues = {
  username: string;
  email: string;
  channel: string;
  // implementing nested object
  social: {
    twitter: string;
    facebook: string;
  };
};

const YouTubeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
    },

    // fload saved data (here: email form api)
    // defaultValues : async()=>{
    //   const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
    //   const data = await response.json()
    //   return{
    //     username: "Batman",
    //     email: data.email,
    //     channel: ""
    //   }
    // }
  });

  const formSubmithandler = (data: FormValues) => {
    alert(data)
    console.log("form submitted", data);
    // alert(JSON.stringify(data));
  };
  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(formSubmithandler)} noValidate>
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
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required!",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
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
        <div className="form-control">
          <label htmlFor="twitter"> Twitter</label>
          <input type="text" id="twitter" {...register("social.twitter")} />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
