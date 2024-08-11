import dynamic from 'next/dynamic';

// Dynamically import TodoList with { ssr: false } to disable server-side rendering
const TodoList = dynamic(() => import('@/components/TodoList'), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <TodoList />
      <p className="text-sm text-[#9394a5] dark:text-[#4d5067] mt-[8vh] md:mt-10 text-center md:mr-10">
        Drag and drop to reorder list
      </p>
    </main>
  );
}
