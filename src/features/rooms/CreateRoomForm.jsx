import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateRoom } from "./useCreateRoom";
import { useEditRoom } from "./useEditRoom";

function CreateRoomForm({ roomToEdit = {}, onClose }) {
  const { id: oldId, ...oldValues } = roomToEdit;
  const isEdit = Boolean(oldId);
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: isEdit ? oldValues : {},
  });
  const { errors } = formState;

  const { createRoom, isCreating } = useCreateRoom();
  const { editRoom, isEditing } = useEditRoom();

  const isChanging = isCreating || isEditing;

  // const safety = [
  //   "air_condition",
  //   "electricity",
  //   "fire_control",
  //   "environment",
  //   "security",
  //   "wiring",
  //   "ups",
  // ];
  // useEffect(() => {
  //   if (watch("overall")) safety.forEach((el) => setValue(el, true));
  // }, [watch("overall")]);

  function onSubmit(data) {
    //check if image is uploaded
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEdit)
      editRoom(
        { newRoomData: { ...data, image }, id: oldId },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createRoom(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
  }
  function onError(error) {
    console.log(error);
  }
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        type={onClose ? "modal" : "regular"}
      >
        <FormRow label="Room name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isChanging}
            {...register("name", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Air Condition" error={errors?.air_condition?.message}>
          <Input
            type="checkbox"
            id="air_condition"
            disabled={isChanging}
            {...register("air_condition", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Electricity" error={errors?.electricity?.message}>
          <Input
            type="checkbox"
            id="electricity"
            disabled={isChanging}
            {...register("electricity", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Fire Control" error={errors?.fire_control?.message}>
          <Input
            type="checkbox"
            id="fire_control"
            disabled={isChanging}
            {...register("fire_control", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Environment" error={errors?.environment?.message}>
          <Input
            type="checkbox"
            id="environment"
            disabled={isChanging}
            {...register("environment", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Security" error={errors?.security?.message}>
          <Input
            type="checkbox"
            id="security"
            disabled={isChanging}
            {...register("security", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Wiring" error={errors?.wiring?.message}>
          <Input
            type="checkbox"
            id="wiring"
            disabled={isChanging}
            {...register("wiring", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="UPS" error={errors?.ups?.message}>
          <Input
            type="checkbox"
            id="ups"
            disabled={isChanging}
            {...register("ups", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Overall Safety" error={errors?.overall?.message}>
          <Input
            type="checkbox"
            id="overall"
            disabled={true}
            checked={
              watch("air_condition") &&
              watch("electricity") &&
              watch("fire_control") &&
              watch("environment") &&
              watch("security") &&
              watch("wiring") &&
              watch("ups")
            }
            {...register("overall")}
          ></Input>
        </FormRow>

        <FormRow label="Computers" error={errors?.running?.message}>
          <Input
            type="checkbox"
            id="running"
            disabled={isChanging}
            {...register("running", {
              // required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Priority" error={errors?.priority?.message}>
          <Input
            type="number"
            id="priority"
            disabled={isChanging}
            {...register("priority", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Priority should be at least 1",
              },
              max: {
                value: 10,
                message: "Priority must be below 10",
              },
            })}
          />
        </FormRow>

        <FormRow label="Room photo" error={errors?.image?.message}>
          <FileInput
            id="image"
            accept="image/*"
            {...register("image", {
              required: isEdit ? false : "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onClose?.()}
          >
            Cancel
          </Button>
          <Button disabled={isChanging}>
            {isEdit ? "Edit room" : "Create new room"}
          </Button>
        </FormRow>
      </Form>
      {/* <div>{console.log(watch("overall"))}</div>
      <div>{console.log(watch("air_condition") && watch("electricity"))}</div> */}
    </>
  );
}

export default CreateRoomForm;
