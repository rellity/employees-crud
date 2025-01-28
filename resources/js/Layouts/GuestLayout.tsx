import { Link } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">

            <Link href="/">
                <div className='items-center justify-center'>
                    <BookOpen className="h-20 w-20 mx-auto" />
                    <p>
                        Employees' Dashboard
                    </p>
                </div>
            </Link>


            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
