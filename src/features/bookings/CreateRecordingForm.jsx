import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateRecording } from "./useCreateRecording";
import { useEditRecording } from "./useEditRecording";
import styled from "styled-components";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const SelectStyled = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateRecordingForm({
  recordingToEdit = {},
  rooms = {},
  personnel = {},
  onClose,
}) {
  // console.log(rooms);
  // console.log(personnel);

  const { id: oldId, ...oldValues } = recordingToEdit;
  const isEdit = Boolean(oldId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? oldValues : {},
  });
  const { errors } = formState;

  const { createRecording, isCreating } = useCreateRecording();
  const { editRecording, isEditing } = useEditRecording();

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const isChanging = isCreating || isEditing;

  function onSubmit(data) {
    if (isEdit)
      editRecording(
        {
          newRecording: { ...data, start_time: startTime, end_time: endTime },
          id: oldId,
        },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createRecording(
        { ...data, start_time: startTime, end_time: endTime },
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
        <FormRow label="Room" error={errors?.room_id?.message}>
          <SelectStyled
            {...register("room_id", {
              required: "This field is required",
            })}
          >
            <option value="">--</option>
            {rooms.map(
              (room) =>
                (!room.running || !room.overall) && (
                  <option value={room.id} key={room.id}>
                    {room.name}
                  </option>
                )
            )}
          </SelectStyled>
        </FormRow>

        <FormRow label="Personnel" error={errors?.person_id?.message}>
          <SelectStyled
            {...register("person_id", {
              required: "This field is required",
            })}
          >
            <option value="">--</option>
            {personnel.map(
              (person) =>
                person.available && (
                  <option value={person.id} key={person.id}>
                    {person.name}
                  </option>
                )
            )}
          </SelectStyled>
        </FormRow>

        <FormRow label="Start Time" error={errors?.start_time?.message}>
          <ReactDatePicker
            showTimeSelect
            dateFormat="Pp"
            selected={startTime}
            onChange={(time) => setStartTime(time)}
          />
          {/* ReactDatePicker doesn't allow direct register, since it doesn't contain any value itself, so we directly use onSubmit to register result */}
        </FormRow>
        <FormRow label="End Time" error={errors?.end_time?.message}>
          <ReactDatePicker
            showTimeSelect
            dateFormat="Pp"
            selected={endTime}
            onChange={(time) => setEndTime(time)}
          />
          {/* ReactDatePicker doesn't allow direct register, since it doesn't contain any value itself, so we directly use onSubmit to register result */}
        </FormRow>

        <FormRow label="Status" error={errors?.status?.message}>
          <SelectStyled
            {...register("status", {
              required: "This field is required",
            })}
          >
            <option value="">--</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </SelectStyled>
        </FormRow>

        <FormRow label="Repairing Target" error={errors?.repairing?.message}>
          <SelectStyled
            {...register("repairing", {
              required: "This field is required",
            })}
          >
            <option value="">--</option>
            <option value="air_condition">Air Condition</option>
            <option value="electricity">Electricity</option>
            <option value="fire_control">Fire Control</option>
            <option value="environment">Environment</option>
            <option value="security">Security</option>
            <option value="wiring">Wiring</option>
            <option value="ups">UPS</option>
            <option value="running">Computers</option>
          </SelectStyled>
        </FormRow>

        <FormRow label="Carry-on Item" error={errors?.item?.message}>
          <Input
            type="text"
            id="item"
            disabled={isChanging}
            {...register("item", {
              // required: "This field is required",
            })}
          />
        </FormRow>
        <FormRow label="Comments" error={errors?.comments?.message}>
          <Input
            type="text"
            id="comments"
            disabled={isChanging}
            {...register("comments", {
              // required: "This field is required",
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
            {isEdit ? "Edit personnel" : "Create new personnel"}
          </Button>
        </FormRow>
      </Form>

      <div>{console.log(getValues("status"))}</div>
      {/* <div>{console.log("Start Time " + getValues("start_time"))}</div> */}
      <div>{console.log("Real Start Time " + startTime)}</div>
    </>
  );
}

export default CreateRecordingForm;
