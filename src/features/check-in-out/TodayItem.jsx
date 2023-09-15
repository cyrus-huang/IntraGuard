import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 10rem 15rem 1fr 10rem 3rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Room = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, personnel, rooms } = activity;

  return (
    <StyledTodayItem>
      {status === "scheduled" && <Tag type="green">Scheduled</Tag>}
      {status === "in-progress" && <Tag type="blue">In Progress</Tag>}

      <Room>Machine Room {rooms.name}</Room>
      <div>{personnel.name} </div>

      {status === "scheduled" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/register/${id}`}
        >
          Check in
        </Button>
      )}

      {status === "in-progress" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/register/${id}`}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
