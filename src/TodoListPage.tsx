import { useState } from "react";
import { useAI, useGetTodoList, useTodoListMutation } from "./services/todos";
import { BaseLayout } from "./components/Layout";
import { InputAI } from "./components/InputAI";
import { TodoListUI } from "./components/TodoList";
import { styled } from "styled-components";


const Section = styled.section`
  width: 100%;
`;

const TodoListPage = () => {
  const [listInput, setListInput] = useState("");
  
  const { data, error, isLoading } = useGetTodoList();
  const { addTodoList, deleteTodoList } = useTodoListMutation();
  const { addListWithAI } = useAI();

  const handleAddTodoList = () => {
    setListInput("");
    addTodoList({ title: listInput });
  };

  return (
    <BaseLayout isLoading={isLoading} error={error ?? undefined}>
      <h2>Todo List</h2>
      <Section>
        <InputAI
          value={listInput}
          onChange={setListInput}
          onSubmitAdd={handleAddTodoList}
          onSubmitAI={() => addListWithAI(listInput)}
          placeHolder="Enter todo list title.."
        />
      </Section>
      <Section>
        {data && (
          <TodoListUI deleteTodoList={deleteTodoList} data={data} />
        )}
      </Section>
    </BaseLayout>
  );
};

export default TodoListPage;