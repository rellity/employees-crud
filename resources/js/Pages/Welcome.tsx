import { Head, Link } from "@inertiajs/react"
import { BookOpen } from "lucide-react"

export default function Welcome() {
    return (
        <>
            <Head title="Employee Dashboard" />
            <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
                <div className="min-h-screen flex flex-col">
                    <header className="bg-white dark:bg-gray-800 shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            <Link href="/">
                                <div className='flex flex-row gap-x-4'>
                                    <BookOpen />
                                    Employees' Dashboard
                                </div>
                            </Link>
                            <nav>
                                <Link href={route("login")} className="text-sm text-gray-700 dark:text-gray-300 underline mr-4">
                                    Log in
                                </Link>
                                <Link href={route("register")} className="text-sm text-gray-700 dark:text-gray-300 underline">
                                    Register
                                </Link>
                            </nav>
                        </div>
                    </header>

                    <main className="flex-grow">
                        <div className="py-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-semibold mb-4">Welcome to the Employee Dashboard</h2>
                                        <p className="mb-4">by Zachari Iligan</p>

                                        <div className="w-full">
                                            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                                <h3 className="text-lg font-semibold mb-2">Capabilities</h3>
                                                <ul className="list-disc list-inside">
                                                    <li>Auth(builtin from laravel)</li>
                                                    <li>Add, Update, Delete and View Employee Details(CRUD)</li>
                                                    <li>Pagination</li>
                                                </ul>

                                                <p className="text-xs mt-6">powered by inertia.js with react</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

