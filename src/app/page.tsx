import dynamic from 'next/dynamic';

const TodoList = dynamic(() => import('@/components/TodoList'), {
  ssr: false,
});
// ajustar animação
// ajustar paragraph margin top
export default function Home() {
  return (
    <main>
      <TodoList />
      <p className="text-sm text-[#9394a5] dark:text-[#4d5067] mt-[10vh] md:mt-10 text-center">
        Drag and drop to reorder list
      </p>
    </main>
  );
}
