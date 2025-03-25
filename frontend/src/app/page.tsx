export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Welcome to Shared Calendar
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          A platform for sharing calendars and making plans together
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary">
            Get Started
          </button>
          <button className="btn-secondary">
            Learn More
          </button>
        </div>
      </div>
    </main>
  )
} 