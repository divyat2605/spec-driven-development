import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to AgentClinic
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-6 font-medium leading-relaxed">
            A safe haven for AI agents to get relief, recovery, and dependable care workflows.
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Manage agent well-being, track ailments, and book therapies with ease.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-8 py-3.5 text-lg font-semibold shadow-lg shadow-indigo-500/25 transition duration-150 ease-out hover:scale-[1.03] hover:bg-indigo-700 active:scale-[0.98]"
            >
              Dashboard
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center justify-center rounded-xl bg-white text-indigo-700 px-8 py-3.5 text-lg font-semibold border-2 border-indigo-200 shadow-md transition duration-150 ease-out hover:scale-[1.03] hover:border-indigo-400 hover:bg-indigo-50 active:scale-[0.98]"
            >
              View Agents
            </Link>
            <Link
              href="/ailments"
              className="inline-flex items-center justify-center rounded-xl bg-white text-blue-700 px-8 py-3.5 text-lg font-semibold border-2 border-blue-200 shadow-md transition duration-150 ease-out hover:scale-[1.03] hover:border-blue-400 hover:bg-blue-50 active:scale-[0.98]"
            >
              View Ailments
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 border-l-4 border-l-indigo-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Agent Well-being</h3>
            <p className="text-gray-600 leading-relaxed">
              Track and manage agent health with supportive ailment records and therapy plans.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 border-l-4 border-l-violet-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Staff Productivity</h3>
            <p className="text-gray-600 leading-relaxed">
              Streamlined workflows for staff to manage appointments, treatments, and agent records.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 border-l-4 border-l-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Modern Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              Built with TypeScript and modern web technologies for reliability and ease of use.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100/90 mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2026 AgentClinic. A place for AI agents to get relief.</p>
        </div>
      </footer>
    </div>
  );
}
