import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreatePerson } from "./useCreatePerson";
import { useEditPerson } from "./useEditPerson";

function CreatePersonForm({ personToEdit = {}, onClose }) {
  const { id: oldId, ...oldValues } = personToEdit;
  const isEdit = Boolean(oldId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEdit ? oldValues : {},
  });
  const { errors } = formState;

  const { createPerson, isCreating } = useCreatePerson();
  const { editPerson, isEditing } = useEditPerson();

  const isChanging = isCreating || isEditing;

  function onSubmit(data) {
    //check if image is uploaded
    const photo = typeof data.photo === "string" ? data.photo : data.photo[0];
    if (isEdit)
      editPerson(
        { newPerson: { ...data, photo }, id: oldId },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createPerson(
        { ...data, photo: photo },
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
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isChanging}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="ID" error={errors?.pid?.message}>
        <Input
          type="number"
          id="pid"
          disabled={isChanging}
          {...register("pid", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="phone" error={errors?.phone?.message}>
        <Input
          type="number"
          id="phone"
          disabled={isChanging}
          {...register("phone", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Available" error={errors?.available?.message}>
        <Input
          type="checkbox"
          id="available"
          disabled={isChanging}
          {...register("available", {
            // required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Personnel avatar" error={errors?.photo?.message}>
        <FileInput
          id="photo"
          accept="image/*"
          {...register("photo", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isChanging}>
          {isEdit ? "Edit personnel" : "Create new personnel"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreatePersonForm;
