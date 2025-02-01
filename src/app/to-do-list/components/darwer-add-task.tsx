import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, List } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTodoSchema } from '../schemas';
import { useCreateTodoList } from '../api/user-create-todo-list';

const DrawerAddTask = ({ opened, close, tasks }) => {
  const { mutate, isPending } = useCreateTodoList();

  const form = useForm<z.infer<typeof createTodoSchema>>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      name: '',
    },
  });

  // values: z.infer<typeof createTodoSchema>
  const onSubmit = () => {
    mutate(
      { form: { name: '測試 to do' } },
      {
        onSuccess: ({ data }) => {
          console.log('成功');
        },
      }
    );
  };

  return (
    <Drawer opened={opened} onClose={close} title="Authentication">
      <Button onClick={onSubmit}>新增</Button>
      {tasks.map((todo) => (
        <List>
          <List.Item>{todo.name}</List.Item>
        </List>
      ))}
    </Drawer>
  );
};

export default DrawerAddTask;
