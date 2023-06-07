import { serverTimestamp, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { toast } from "react-hot-toast";
import ImageUploader from "./ImageUploader";

const PostForm = ({ defaultValues, postRef, preview }) => {
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { errors, isValid, isDirty } = formState;

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? "hidden" : ""}>
        <ImageUploader />

        <textarea
          className="border-2 border-black rounded-lg p-2"
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
          })}
          cols="30"
          rows="10"
        ></textarea>

        {errors.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}

        <fieldset className="mt-2 mb-2">
          <input className="mr-1" type="checkbox" {...register("published")} />
          <label>Published</label>
        </fieldset>

        <button
          className="py-2 px-3 bg-green-500 hover:bg-green-700 rounded-lg text-white disabled:bg-slate-600"
          type="submit"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default PostForm;
