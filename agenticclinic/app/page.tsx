export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">AgentClinic</h1>
            <div className="space-x-4">
              <a href="/agents" className="text-indigo-600 hover:text-indigo-800">
                Agents
              </a>
              <a href="/ailments" className="text-indigo-600 hover:text-indigo-800">
                Ailments
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to AgentClinic
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            A safe haven for AI agents to get relief, recovery, and dependable care workflows.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Manage agent well-being, track ailments, and book therapies with ease.
          </p>
          <div className="space-x-4">
            <a
              href="/agents"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              View Agents
            </a>
            <a
              href="/ailments"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              View Ailments
            </a>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Agent Well-being
            </h3>
            <p className="text-gray-600">
              Track and manage agent health with supportive ailment records and therapy plans.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Staff Productivity
            </h3>
            <p className="text-gray-600">
              Streamlined workflows for staff to manage appointments, treatments, and agent records.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Modern Experience
            </h3>
            <p className="text-gray-600">
              Built with TypeScript and modern web technologies for reliability and ease of use.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2026 AgentClinic. A place for AI agents to get relief.</p>
        </div>
      </footer>
    </div>
  );
}

