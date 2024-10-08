import dynamic from 'next/dynamic';

const TodoList = dynamic(() => import('@/components/TodoList'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <TodoList />
      <p className="text-sm text-[#9394a5] dark:text-[#4d5067] mt-[11vh] md:mt-10 text-center">
        Drag and drop to reorder list
      </p>
    </main>
  );
}
