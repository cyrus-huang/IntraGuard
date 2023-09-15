import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow } from "../../utils/helpers";
import { FaThumbtack } from "react-icons/fa6";

const StyledRecordingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function RecordingDataBox({ recording }) {
  const {
    created_at,
    start_time,
    end_time,
    comments,
    repairing,
    fixed,
    personnel: { name: person_name, pid, phone, photo },
    rooms: { name: room_name },
  } = recording;

  return (
    <StyledRecordingDataBox>
      <Header>
        <div>
          <FaThumbtack />
          <p>
            {repairing.toUpperCase()} problem in Room <span>{room_name}</span>
          </p>
        </div>

        <p>
          {format(new Date(start_time), "HH:mm, MMM dd yyyy")} (
          {isToday(new Date(start_time))
            ? "Today"
            : formatDistanceFromNow(start_time)}
          ) &mdash; {format(new Date(end_time), "HH:mm, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          <Flag src={photo} alt={`Avatar of ${person_name}`} />
          <p>{person_name}</p>
          <span>&bull;</span>
          <p>Phone {phone}</p>
          <span>&bull;</span>
          <p>Work Number {pid}</p>
        </Guest>

        {comments && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Comments"
          >
            {comments}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Problem Fixed?">
          {fixed ? "Yes" : "No"}
        </DataItem>
      </Section>

      <Footer>
        <p>
          Task created at {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </Footer>
    </StyledRecordingDataBox>
  );
}

export default RecordingDataBox;
