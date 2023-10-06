import TaskListContainer from "../components/TaskListContainer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col justify-center font-mono lg:w-1/2">
        <h1 className="text-center text-xl md:text-2xl lg:text-4xl font-bold mb-3">Todo app</h1>
        <p className="text-center mb-4">Apprendre les design patterns via une todo app</p>
        <div className="space-y-4">
          <TaskListContainer />
        </div>
      </section>
    </main>
  )
}