import {
  KanBanBoard,
  KanbanBoardContainer,
  //   KanBanBoard,
} from "@/components/tasks/kanban/board";
import { KanbanColumn } from "@/components/tasks/kanban/column";

const List = () => {
  return (
    <>
      <KanbanBoardContainer>
        <KanBanBoard>
          <KanbanColumn></KanbanColumn>
          <KanbanColumn></KanbanColumn>
        </KanBanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default List;
